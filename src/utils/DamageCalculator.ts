import Damage from "./Damage";
import EquationData, { EquationInfo } from "../types/EquationData";
import VariableOutput, { EquationOutput } from "../types/VariableOutput";
import RecordEntry, { RecordEntryType } from "../types/RecordEntry";
import ValueData from "../types/ValueData";
import evaluateExpression from "./evalulateExpression";
import stats from "./stats";
import transformativeLevelMultipliers from "./transformativeLevelMultipliers";
import Stat, { StatType } from "../types/Stat";
import attributes, { getAttrStat } from "./attributes";
import MathComponent from "../types/MathComponent";
import Attack from "./Attack";
import reactionTypes from "./reactionTypes";
import roundDecimals from "./roundDecimals";
import ReactionType from "../types/ReactionType";

export default class DamageCalculator {
	/**
	 * Value keys to use for secondary reactions.
	 */
	private static readonly secondaryMappings: { [P in keyof ValueData]?: keyof ValueData } = {
		baseMultiplier: 'secondaryMultiplier',
		reactionBonus: 'secondaryReactionBonus'
	};

	private values?: ValueData;
	private useSecondary?: boolean;
	private baseDamage?: string;
	private rxDamageTypes?: (keyof EquationData)[];
	private isTransformative?: boolean;
	private inlineEMBonus?: string;
	private secondaryEMBonus?: string;

	getNextRxDmg(): keyof EquationData | undefined{
		return this.rxDamageTypes?.pop();
	}
	
	/**
	 * @see {@link https://library.keqingmains.com/combat-mechanics/damage/damage-formula KQM Damage Formula} for formula.
	 */
	private equations: EquationData = {
		// Stats
		atk: {
			name: 'ATK',
			expr: '(baseTalentScale * (1 + additionalBonusTalentScale)) + bonusTalentScale'
		},
		def: {
			name: 'DEF',
			expr: '(baseDEF * (1 + additionalBonusDEF)) + bonusDEF'
		},
		hp: {
			name: 'HP',
			expr: '(baseHP * (1 + additionalBonusHP)) + bonusHP'
		},

		// Final base damage
		baseDamage: {
			name: 'Base DMG',
			expr: () => `${this.baseDamage ?? 'talent'} * baseDamageMultiplier`
		},
		flatDamageBasic: {
			name: 'Additive DMG Bonus',
			expr: 'talentDamageBonus + flatDamage'
		},
		finalBaseDamage: {
			name: 'Final Base DMG',
			expr: 'baseDamage + flatDamageBasic'
		},

		// Amplified
		transformativeEMBonus: {
			name: 'EM Bonus',
			expr: '(16 * em) / (2000 + em)'
		},
		amplifyingEMBonus: {
			name: 'EM Bonus',
			expr: '(2.78 * em) / (1400 + em)'
		},
		amplifyingMul: {
			name: 'Reaction Multiplier',
			expr: () => `baseMultiplier * (1 + ${this.useSecondary ? this.secondaryEMBonus : this.inlineEMBonus} + reactionBonus)`
		},
		amplifiedDamage: {
			name: 'Reaction DMG',
			expr: () => `${this.getNextRxDmg()} * amplifyingMul`
		},
		secondaryAmplifiedDamage: {
			name: 'Secondary Reaction DMG',
			expr: () => `${this.getNextRxDmg()} * SECONDARY_amplifyingMul`
		},

		// Additive
		flatDamageReactionEMBonus: {
			name: 'EM Bonus',
			expr: '(5 * em) / (1200 + em)'
		},
		flatDamageReactionBonus: {
			name: 'Additive Reaction DMG',
			expr: 'transformativeLevelMultiplier * baseMultiplier * (1 + flatDamageReactionEMBonus + reactionBonus)'
		},
		additiveDamage: {
			name: 'Reaction DMG',
			expr: () => `${this.getNextRxDmg()} + flatDamageReactionBonus`
		},
		secondaryAdditiveDamage: {
			name: 'Secondary Reaction DMG',
			expr: () => `${this.getNextRxDmg()} + SECONDARY_flatDamageReactionBonus`
		},

		// Damage bonus
		bonusDamage: {
			name: 'Outgoing DMG',
			expr: () => `${this.getNextRxDmg()} * (1 + damageBonus)`
		},

		// Enemy factors
		enemyDefenseFactor: {
			name: 'Enemy DEF Enemy Factor',
			expr: '(enemyLevel + 100) * (1 - defenseDecrease) * (1 - defenseIgnore)'
		},
		characterDefenseFactor: {
			name: 'Enemy DEF Char Factor',
			expr: 'characterLevel + 100'
		},
		enemyDefenseMul: {
			name: 'Enemy DEF Multiplier',
			expr: 'characterDefenseFactor / (characterDefenseFactor + enemyDefenseFactor)'
		},
		enemyResistance: {
			name: 'Enemy RES',
			expr: 'resistance - resistanceReduction'
		},
		enemyResistanceMul: {
			name: 'Enemy RES Multiplier',
			expr: () => {
				let enemyResistance = this.variable('enemyResistance').value;
				
				if (enemyResistance < 0)
					return '1 - (enemyResistance / 2)';

				if (enemyResistance < 0.75)
					return '1 - enemyResistance';

				return '1 / (1 + (4 * enemyResistance))';
			}
		},
		generalDamage: {
			name: 'General DMG',
			expr: () => `${this.isTransformative ? this.getNextRxDmg() : 'bonusDamage * enemyDefenseMul'} * enemyResistanceMul`
		},

		// CRIT
		realCritRate: {
			name: 'Actual CRIT Rate',
			expr: 'max(0, min(critRate, 1))'
		},
		critBonus: {
			name: 'Crit Multiplier',
			expr: '1 + (realCritRate * critDamage)'
		},
		critHit: {
			name: 'CRIT Hit',
			expr: () => `generalDamage * (1 + critDamage)`
		},
		avgDamage: {
			name: 'Average DMG',
			expr: () => `generalDamage * critBonus`
		}
	};
	
	constructor(private readonly attack: Attack) {}

	private populateAttrStat(stat: Stat) {
		let subEquations: (keyof EquationData)[] = [];

		attributes.forEach(attr => {
			const attrStat = getAttrStat(stat.prop, attr);
			const value = this.attack.getStatAsNumber(attrStat, stat.type);
			const varName = `${stat.prop}${attr}Scaling` as keyof ValueData;
			const eqName = `${stat.prop}${attr}` as keyof EquationData;
			
			if (!value) return;
			
			this.values![varName] = {
				name: `${attr} ${stat.name} Scaling`,
				value: value
			};

			this.equations[eqName] = {
				name: `${attr} ${stat.name}`,
				expr: `${attr.toLowerCase()} * ${varName}`
			};
			
			subEquations.push(eqName);
		});
		
		if (!subEquations.length) {
			this.values![stat.prop] = {
				name: stat.name,
				value: 0
			};
			
			return;
		}
		
		this.equations[stat.prop as keyof EquationData] = {
			name: stat.name,
			expr: subEquations.length > 1 ? subEquations.join(' + ') : this.equations[subEquations[0]].expr
		};
	}
	
	private record(value: string, type: RecordEntryType): RecordEntry {
		return {
			value: value,
			type: type
		};
	}
	
	private recordNumber(value: number): RecordEntry {
		return {
			value: roundDecimals(value, 4),
			type: RecordEntryType.Value
		};
	}
	
	private variable(name: keyof ValueData | keyof EquationData): VariableOutput
	private variable(name: string): VariableOutput | undefined
	private variable(name: string) {
		let unsetSecondary = false;

		if (name.startsWith('SECONDARY_')) {
			this.useSecondary = true;
			unsetSecondary = true;
			name = name.substring(10);
		}

		let output: VariableOutput | undefined;

		if (name in this.values!)
			output = this.value(name as keyof ValueData);
		
		if (name in this.equations)
			output = this.equation(name as keyof EquationData);

		if (unsetSecondary) {
			this.useSecondary = false;
		}

		return output;
	}
	
	private value(name: keyof ValueData): VariableOutput {
		if (this.useSecondary && name in DamageCalculator.secondaryMappings) {
			name = DamageCalculator.secondaryMappings[name]!;
		}

		const valueInfo = this.values![name];
		
		return {
			label: [
				this.record(`${valueInfo.name} `, RecordEntryType.Note),
				this.recordNumber(valueInfo.value)
			],
			value: valueInfo.value
		};
	}
	
	private processComponent(component: string): VariableOutput | MathComponent {
		return this.variable(component) || {
			value: component,
			label: [
				this.record(component.replace(/\*/g, '\u00D7'), RecordEntryType.Mathematical)
			]
		};
	}
	
	private expression(equationInfo: EquationInfo): string {
		const exprOrFunc = equationInfo.expr; 
		const expr = typeof exprOrFunc === 'function' ? exprOrFunc() : exprOrFunc;
		
		return expr.replace(/INLINE_([A-Za-z_]+)/g, (_, inlineName: (keyof EquationData | keyof ValueData)) => {
			if (!(inlineName in this.equations)) 
				return inlineName;
			
			const inlineExpr = this.expression(this.equations[inlineName as keyof EquationData]);
			const hasAddition = inlineExpr.includes('+') || inlineExpr.includes('-');
			
			return `${hasAddition ? '(' : ''}${inlineExpr}${hasAddition ? ')' : ''}`;
		});
	}
	
	private equation(name: keyof EquationData): EquationOutput {
		const equationInfo = this.equations[name];
		const expr = this.expression(equationInfo);
		const annotated: RecordEntry[] = [];
		const children: EquationOutput['children'] = {};
		
		let fullRawExpr = '';
		const mathExpr = expr.split(/([A-Za-z_]+|\d+)+/g).map(component => {
			let res = this.processComponent(component);
			
			annotated.push(...res.label);
			
			if ('annotated' in res) {
				children[component] = res;
				fullRawExpr += `(${res.fullRawExpr})`;
			} else {
				fullRawExpr += res.value;
			}
			
			return res.value;
		}).join('');
		
		const value = evaluateExpression(mathExpr);
		
		const label = [
			this.record(`${equationInfo.name} `, RecordEntryType.Note),
			this.recordNumber(value)
		];
		
		annotated.unshift(
			...label,
			this.record(' = ', RecordEntryType.Mathematical)
		);
		
		return { label, value, annotated, children, fullRawExpr };
	}
	
	private topEquation(reactionType: ReactionType, name: keyof EquationData = 'generalDamage'): EquationOutput {
		this.rxDamageTypes = [
			reactionType.isTransformative ? 'baseDamage' : 'finalBaseDamage'
		];

		if (reactionType.rxMode === 'amplifying')
			this.rxDamageTypes.push('amplifiedDamage');

		if (this.attack.secondaryType === 1)
			this.rxDamageTypes.push('secondaryAmplifiedDamage');

		if (reactionType.rxMode === 'additive')
			this.rxDamageTypes.push('additiveDamage');

		if (this.attack.secondaryType === 3)
			this.rxDamageTypes.push('secondaryAdditiveDamage');
	
		return this.equation(name);
	}
	
	/**
	 * Main function. Calculate the damage for the current state of {@link attack}.
	 */
	calculateDamage(): Damage {
		const reactionType = reactionTypes.get(this.attack.reactionType)!;
		const reaction = reactionType.reactions.get(this.attack.reaction)!;
		const secondaryType = reactionTypes.get(this.attack.secondaryType);
		const secondary = secondaryType?.reactions.get(this.attack.secondary);

		this.baseDamage = reactionType.baseDamage;
		this.isTransformative = reactionType.isTransformative;
		this.inlineEMBonus = reactionType.inlineEMBonus;
		this.secondaryEMBonus = secondaryType?.inlineEMBonus;

		this.values = {
			baseMultiplier: {
				name: 'Reaction Multiplier',
				value: reaction.multiplier ?? 1
			},
			secondaryMultiplier: {
				name: 'Secondary Multiplier',
				value: secondary?.multiplier ?? 1
			},
			transformativeLevelMultiplier: {
				name: 'Level Multiplier',
				value: transformativeLevelMultipliers[this.attack.getStatAsNumber('characterLevel', StatType.Number)] ?? NaN
			}
		} as ValueData;

		stats.forEach(stat => {
			if ('usesAttrs' in stat)
				return this.populateAttrStat(stat);

			this.values![stat.prop] = {
				name: stat.name,
				value: this.attack.getStatAsNumber(stat.prop, stat.type)
			};
		});
	
		if (reactionType.canCrit)
			return new Damage(
				this.topEquation(reactionType, 'avgDamage'),
				this.topEquation(reactionType, 'critHit'),
				this.topEquation(reactionType, 'generalDamage')
			);

		return new Damage(this.topEquation(reactionType, 'generalDamage'));
	}
}
