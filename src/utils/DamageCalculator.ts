import Damage from "../types/Damage";
import DamageGroup from "../types/DamageGroups";
import ReactionType, { Reaction } from "../types/ReactionType";
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

export default class DamageCalculator {
	static readonly reactionTypes: ReactionType[] = [
		{
			name: 'No Reaction',
			canCrit: true,
			equation: 'generalDamage',
			groups: DamageGroup.General,
			reactions: [
				{ name: 'No Reaction' }
			]
		},
		{
			name: 'Amplifying',
			canCrit: true,
			equation: 'amplifyingReaction',
			groups: DamageGroup.Reaction | DamageGroup.General,
			reactions: [
				{ name: 'Pyro Melt', var: 2, color: '#ffcc66' },
				{ name: 'Cyro Melt', var: 1.5, color: '#99ffff' },
				{ name: 'Pyro Vaporize', var: 1.5, color: '#ffcc66' },
				{ name: 'Hydro Vaporize', var: 2, color: '#33ccff' }
			]
		},
		{
			name: 'Transformative',
			canCrit: false,
			equation: 'transformativeReaction',
			groups: DamageGroup.Reaction,
			reactions: [
				{ name: 'Burgeon', var: 3, color: '#ff9b00' },
				{ name: 'Hyperbloom', var: 3, color: '#e19bff' },
				{ name: 'Shatter', var: 3 },
				{ name: 'Overloaded', var: 2.75, color: '#ff809b' },
				{ name: 'Bloom', var: 2, color: '#00ea53' },
				{ name: 'Electro-Charged', var: 2, color: '#e19bff' },
				{ name: 'Superconduct', var: 1.5, color: '#b4b4ff' },
				{ name: 'Swirl', var: 0.6, color: '#66ffcc' },
				{ name: 'Burning', var: 0.25, color: '#ff9b00' }
			]
		},
		{
			name: 'Additive',
			canCrit: true,
			equation: 'generalDamage',
			flatDamage: 'flatDamageAdded',
			groups: DamageGroup.General | DamageGroup.Reaction,
			reactions: [
				{ name: 'Spread', var: 1.25, color: '#00ea53' },
				{ name: 'Aggravate', var: 1.15, color: '#e19bff' }
			]
		}
	];
	
	private reactionType?: ReactionType;
	private reaction?: Reaction;
	private mainEquation?: keyof EquationData;
	private flatDamage?: keyof EquationData | keyof ValueData;
	private values?: ValueData;
	
	/**
	 * @see {@link https://library.keqingmains.com/combat-mechanics/damage/damage-formula KQM Damage Formula} for formula
	 */
	private equations: EquationData = {
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
		baseDamage: {
			name: 'Talent DMG',
			expr: 'INLINE_talent * baseDamageMultiplier'
		},
		flatDamageBasic: {
			name: 'Additive DMG Bonus',
			expr: 'talentDamageBonus + flatDamage'
		},
		trueDamage: {
			name: 'Outgoing DMG',
			expr: () => `(baseDamage + ${this.flatDamage}) * (1 + damageBonus)`
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
		generalDamage: {
			name: 'General DMG',
			expr: 'trueDamage * enemyDefenseMul * enemyResistanceMul'
		},
		transformativeEMBonus: {
			name: 'EM Bonus',
			expr: '(16 * em) / (2000 + em)'
		},
		baseTransformativeDamage: {
			name: 'Base Reaction DMG',
			expr: `baseMultiplier * transformativeLevelMultiplier`
		},
		trueTransformativeReaction: {
			name: 'Outgoing DMG',
			expr: `baseTransformativeDamage * (1 + transformativeEMBonus + reactionBonus)`
		},
		transformativeReaction: {
			name: 'Transformative DMG',
			expr: `trueTransformativeReaction * enemyResistanceMul`
		},
		amplifyingEMBonus: {
			name: 'EM Bonus',
			expr: '(2.78 * em) / (1400 + em)'
		},
		amplifyingMul: {
			name: 'Reaction Multiplier',
			expr: `baseMultiplier * (1 + amplifyingEMBonus + reactionBonus)`
		},
		amplifyingReaction: {
			name: 'Amplified DMG',
			expr: 'generalDamage * amplifyingMul'
		},
		flatDamageAdded: {
			name: 'Additive DMG Bonus',
			expr: 'flatDamage + talentDamageBonus + flatDamageReactionBonus'
		},
		flatDamageReactionEMBonus: {
			name: 'EM Bonus',
			expr: '(5 * em) / (1200 + em)'
		},
		flatDamageReactionBonus: {
			name: 'Reaction DMG',
			expr: 'baseTransformativeDamage * (1 + flatDamageReactionEMBonus + reactionBonus)'
		},
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
			expr: () => `${this.mainEquation} * (1 + critDamage)`
		},
		avgDamage: {
			name: 'Average DMG',
			expr: () => `${this.mainEquation} * critBonus`
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
			value: Math.round(value * 1e4) / 1e4,
			type: RecordEntryType.Value
		};
	}
	
	private variable(name: keyof ValueData | keyof EquationData): VariableOutput
	private variable(name: string): VariableOutput | undefined
	private variable(name: string) {
		if (name in this.values!)
			return this.value(name as keyof ValueData);
		
		if (name in this.equations)
			return this.equation(name as keyof EquationData);
	}
	
	private value(name: keyof ValueData): VariableOutput {
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
		const equation: RecordEntry[] = [];
		const children: EquationOutput['children'] = {};
		
		const mathExpr = expr.split(/([A-Za-z_]+|\d+)+/g).map(component => {
			let res = this.processComponent(component);
			
			equation.push(...res.label);
			
			if ('equation' in res)
				children[component] = res;
			
			return res.value;
		}).join('');
		
		const value = evaluateExpression(mathExpr);
		
		const label = [
			this.record(`${equationInfo.name} `, RecordEntryType.Note),
			this.recordNumber(value)
		];
		
		equation.unshift(
			...label,
			this.record(' = ', RecordEntryType.Mathematical)
		);
		
		return { label, value, equation, children };
	}
	
	/**
	 * Main function. Calculate the damage for the current state of {@link attack}.
	 */
	calculateDamage(): Damage {
		this.reactionType = DamageCalculator.reactionTypes[this.attack.reactionType];
		this.reaction = this.reactionType.reactions[this.attack.reaction];
		this.mainEquation = this.reactionType.equation;
		this.flatDamage = this.reactionType.flatDamage ?? 'flatDamageBasic';

		this.values = {
			baseMultiplier: {
				name: 'Reaction Multiplier',
				value: this.reaction.var ?? 1
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

		if (this.reactionType.canCrit)
			return {
				nonCrit: this.equation(this.reactionType.equation),
				crit: this.equation('critHit'),
				avgDmg: this.equation('avgDamage')
			};
		
		return {
			avgDmg: this.equation(this.reactionType.equation)
		};
	}
}
