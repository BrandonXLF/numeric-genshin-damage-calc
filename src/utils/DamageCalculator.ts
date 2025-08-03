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
import ReactionType, { BaseDamage, EMBonusType, RxnMode } from "../types/ReactionType";

export default class DamageCalculator {
	/**
	 * Value keys to use for secondary reactions.
	 */
	private static readonly secondaryMappings: { [P in keyof ValueData]?: keyof ValueData } = {
		baseMultiplier: 'secondaryMultiplier',
		reactionBonus: 'secondaryReactionBonus'
	};

	private static readonly baseDamageKeys: Record<BaseDamage, keyof EquationData | keyof ValueData> = {
		[BaseDamage.Talent]: 'talent',
		[BaseDamage.Level]: 'transformativeLevelMultiplier'
	};

	private static readonly emBonusEquations: Record<EMBonusType, string> = {
		[EMBonusType.None]: '0',
		[EMBonusType.Amplifying]: '(2.78 * em) / (1400 + em)',
		[EMBonusType.Additive]: '(5 * em) / (1200 + em)',
		[EMBonusType.Transformative]: '(16 * em) / (2000 + em)',
		[EMBonusType.Lunar]: '(6 * em) / (2000 + em)'
	};

	private values?: ValueData;
	private useSecondary?: boolean;
	private rxnDamageTypes?: (keyof EquationData)[];
	private reactionType!: ReactionType;
	private secondaryType!: ReactionType;

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
			expr: () => `${DamageCalculator.baseDamageKeys[this.reactionType.baseDamage]} * baseDamageMultiplier`
		},
		flatDamageBasic: {
			name: 'Additive DMG Bonus',
			expr: 'talentDamageBonus + flatDamage'
		},
		finalBaseDamage: {
			name: 'Final Base DMG',
			expr: 'baseDamage + flatDamageBasic'
		},

		// Reaction
		emBonus: {
			name: 'EM Bonus',
			expr: () => {
				const emBonusType = this.currentReactionType.emBonus ?? EMBonusType.None;
				return DamageCalculator.emBonusEquations[emBonusType];
			}
		},
		reactionBonusMultiplier: {
			name: 'Bonus Multiplier',
			expr: '1 + emBonus + reactionBonus',
		},
		amplifyingMul: {
			name: 'Reaction Multiplier',
			expr: () => `baseMultiplier * reactionBonusMultiplier`
		},

		// Amplified
		amplifiedDamage: {
			name: 'Reaction DMG',
			expr: () => `${this.getNextRxDmg()} * amplifyingMul`
		},
		secondaryAmplifiedDamage: {
			name: 'Secondary Reaction DMG',
			expr: () => `${this.getNextRxDmg()} * SECONDARY_amplifyingMul`
		},

		// Extra transformative damage
		extraTransformativeDamage: {
			name: 'Final Reaction DMG',
			expr: () => `${this.getNextRxDmg()} + extraRxnDMG`
		},

		// Additive
		flatDamageReactionBonus: {
			name: 'Additive Reaction DMG',
			expr: () => {
				const baseDamage = this.currentReactionType.additiveBaseDamage!;
				return `${DamageCalculator.baseDamageKeys[baseDamage]} * amplifyingMul`;
			}
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
		travelPenalty: {
			name: 'Air Time Penalty',
			expr: () => {
				const airTime = this.variable('bowAimedTravelTime').value;

				if (airTime <= 0.7)
					return '0';

				return 'min(0.9, floor((bowAimedTravelTime - 0.7) * 20) / 10)';
			}
		},
		travelMultiplier: {
			name: 'Air Time Multiplier',
			expr: '1 - travelPenalty'
		},
		generalDamage: {
			name: 'General DMG',
			expr: () => `${this.reactionType.isTransformative ? this.getNextRxDmg() : 'bonusDamage * enemyDefenseMul'} * enemyResistanceMul${this.variable('bowAimedTravelTime').value > 0 ? ' * travelMultiplier' : ''}`
		},

		// CRIT
		realCritRate: {
			name: 'Actual CRIT Rate',
			expr: 'max(0, min(CRIT_critRate, 1))'
		},
		critBonus: {
			name: 'Crit Multiplier',
			expr: '1 + (realCritRate * CRIT_critDamage)'
		},
		critHit: {
			name: 'CRIT Hit',
			expr: 'generalDamage * (1 + CRIT_critDamage)'
		},
		avgDamage: {
			name: 'Average DMG',
			expr: 'generalDamage * critBonus'
		}
	};
	
	constructor(private readonly attack: Attack) {}

	private get currentReactionType(): ReactionType {
		return this.useSecondary ? this.secondaryType : this.reactionType;
	}

	private getNextRxDmg(): keyof EquationData | undefined {
		return this.rxnDamageTypes?.pop();
	}

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
		} else if (name.startsWith('CRIT_')) {
			name = name.substring(5);

			if (this.currentReactionType.transformativeCrit) {
				name = name + 'Transformative';
			}
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

	private topEquation(name: keyof EquationData = 'generalDamage'): EquationOutput {
		this.rxnDamageTypes = [
			this.reactionType.isTransformative ? 'baseDamage' : 'finalBaseDamage'
		];

		if (this.reactionType.rxnMode === RxnMode.Multiplicative)
			this.rxnDamageTypes.push('amplifiedDamage');

		if (this.secondaryType.rxnMode === RxnMode.Multiplicative && !this.secondaryType.isTransformative)
			this.rxnDamageTypes.push('secondaryAmplifiedDamage');

		if (this.reactionType.isTransformative)
			this.rxnDamageTypes.push('extraTransformativeDamage');

		if (this.reactionType.rxnMode === RxnMode.Additive)
			this.rxnDamageTypes.push('additiveDamage');

		if (this.secondaryType.rxnMode === RxnMode.Additive && !this.secondaryType.isTransformative)
			this.rxnDamageTypes.push('secondaryAdditiveDamage');
	
		return this.equation(name);
	}

	private showCrit() {
		return !this.reactionType.transformativeCrit || (
				this.attack.getStatAsNumber('critRateTransformative', StatType.Percent) > 0 ||
				this.attack.getStatAsNumber('critDamageTransformative', StatType.Percent) > 0
			);
	}
	
	/**
	 * Main function. Calculate the damage for the current state of {@link attack}.
	 */
	calculateDamage(): Damage {
		this.reactionType = reactionTypes.get(this.attack.reactionType) ?? reactionTypes.get(0)!;
		const reaction = this.reactionType.reactions.get(this.attack.reaction) ?? this.reactionType.reactions.get(0)!;
		
		this.secondaryType = reactionTypes.get(this.attack.secondaryType) ?? reactionTypes.get(0)!;
		const secondary = this.secondaryType.reactions.get(this.attack.secondary) ?? this.secondaryType.reactions.get(0)!;

		this.values = {
			baseMultiplier: {
				name: 'Base Multiplier',
				value: reaction.multiplier ?? 1
			},
			secondaryMultiplier: {
				name: 'Secondary Multiplier',
				value: secondary.multiplier ?? 1
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
	
		if (this.showCrit())
			return new Damage(
				this.topEquation('avgDamage'),
				this.topEquation('critHit'),
				this.topEquation('generalDamage')
			);

		return new Damage(this.topEquation('generalDamage'));
	}
}
