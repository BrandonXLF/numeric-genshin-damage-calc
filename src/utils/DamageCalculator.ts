import Damage from "../types/Damage";
import DamageGroups from "../types/DamageGroups";
import ReactionType from "../types/ReactionType";
import EquationData, { EquationInfo } from "../types/EquationData";
import VariableOutput, { ComponentOutput, EquationRecord } from "../types/VariableOutput";
import RecordEntry, { RecordEntryTypes } from "../types/RecordEntry";
import StatData from "../types/StatData";
import VariableData from "../types/VariableData";
import evaluateExpression from "./evalulateExpression";
import stats from "./stats";
import transformativeLevelMultipliers from "./transformativeLevelMultipliers";
import Stat from "../types/Stat";
import attributes, { getAttrStat } from "./attributes";

export default class DamageCalculator {
	static reactionTypes: ReactionType[] = [
		{
			name: 'No Reaction',
			canCrit: true,
			equation: 'generalDamage',
			groups: DamageGroups.General,
			reactions: [
				{ name: 'No Reaction' }
			]
		},
		{
			name: 'Amplifying',
			canCrit: true,
			equation: 'amplifyingReaction',
			groups: DamageGroups.Reaction | DamageGroups.General,
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
			groups: DamageGroups.Reaction,
			reactions: [
				{ name: 'Burgeon', var: 3, color: '#ff9b00' },
				{ name: 'Hyperbloom', var: 3, color: '#e19bff' },
				{ name: 'Overloaded', var: 2, color: '#ff809b' },
				{ name: 'Bloom', var: 2, color: '#00ea53' },
				{ name: 'Shattered', var: 1.5 },
				{ name: 'Electro-Charged', var: 1.2, color: '#e19bff' },
				{ name: 'Swirl', var: 0.6, color: '#66ffcc' },
				{ name: 'Superconduct', var: 0.5, color: '#b4b4ff' },
				{ name: 'Burning', var: 0.25, color: '#ff9b00' }
			]
		},
		{
			name: 'Additive',
			canCrit: true,
			equation: 'generalDamage',
			flatDamage: 'flatDamageAdded',
			groups: DamageGroups.General | DamageGroups.Reaction,
			reactions: [
				{ name: 'Spread', var: 1.25, color: '#00ea53' },
				{ name: 'Aggravate', var: 1.15, color: '#e19bff' }
			]
		}
	];
	
	private reactionType = DamageCalculator.reactionTypes[this.reactionTypeIndex];
	private reaction = this.reactionType.reactions[this.reactionIndex];
	private mainEquation = this.reactionType.equation;
	private flatDamage = this.reactionType.flatDamage || 'flatDamageBasic';

	private variables = {
		baseMultiplier: {
			name: 'Reaction Multiplier',
			value: this.reaction.var || 1
		},
		transformativeLevelMultiplier: {
			name: 'Level Multiplier',
			value: transformativeLevelMultipliers[this.statData.characterLevel.value] ?? NaN
		}
	} as VariableData;
	
	// https://library.keqingmains.com/combat-mechanics/damage/damage-formula
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
			expr: 'MULTI_INLINE_talent * baseDamageMultiplier'
		},
		flatDamageBasic: {
			name: 'Additive DMG Bonus',
			expr: 'MULTI_talentDamageBonus + flatDamage'
		},
		trueDamage: {
			name: 'True DMG',
			expr: `(baseDamage + ${this.flatDamage}) * (1 + damageBonus)`
		},
		enemyResistance: {
			name: 'Enemy RES',
			expr: 'resistance - resistanceReduction'
		},
		enemyResistanceMul: {
			name: 'Enemy RES Multiplier',
			expr: () => {
				let enemyResistance = this.variable('enemyResistance').value;
				
				if (enemyResistance < 0) {
					return '1 - (enemyResistance / 2)'
				}

				if (enemyResistance < 0.75) {
					return '1 - enemyResistance'
				}

				return '1 / (1 + (4 * enemyResistance))';
			},
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
			name: 'True DMG',
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
			expr: 'flatDamage + MULTI_talentDamageBonus + flatDamageReactionBonus'
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
			name: 'Real CRIT Rate',
			expr: 'max(0, min(critRate, 1))'
		},
		critBonus: {
			name: 'Effective CRIT Bonus',
			expr: 'realCritRate * critDamage'
		},
		critHit: {
			name: 'CRIT Hit',
			expr: `${this.mainEquation} * (1 + critDamage)`
		},
		avgDamage: {
			name: 'Average DMG',
			expr: `${this.mainEquation} * (1 + critBonus)`
		}
	};
	
	constructor(
		private statData: StatData,
		private reactionTypeIndex: number,
		private reactionIndex: number
	) {
		stats.forEach(stat => {
			if ('attrs' in stat)
				return this.populateAttrStat(stat);

			this.variables[stat.prop] = {
				name: stat.name,
				value: this.statData[stat.prop]?.value || NaN
			};
		});
	}

	private populateAttrStat(stat: Stat) {
		let arr: string[] = [];

		attributes.forEach(attr => {
			const subStat = getAttrStat(stat.prop, attr);
			const value = this.statData[subStat]?.value;
			
			if (!value) return;
			
			this.variables[subStat] = {
				name: `${attr} ${stat.name}`,
				value: value
			}
			
			arr.push(`${attr.toLowerCase()} * ${subStat}`);
		});
		
		const parentKey = `MULTI_${stat.prop}` as `MULTI_${string}`;
		
		if (!arr.length) {
			this.variables[parentKey] = {
				name: stat.name,
				value: 0
			};
			
			return;
		}
		
		this.equations[parentKey] = {
			name: stat.name,
			expr: `${arr.length > 1 ? '(' : ''}${arr.join(') + (')}${arr.length > 1 ? ')' : ''}`
		};
	}
	
	private record(value: string, type: RecordEntryTypes) {
		return {
			value: value,
			type: type
		};
	}
	
	private recordNumber(value: number) {
		return {
			value: parseFloat(value.toFixed(4)).toString(),
			type: RecordEntryTypes.Number
		};
	}
	
	private variable(name: keyof VariableData | keyof EquationData): VariableOutput
	private variable(name: string): VariableOutput | undefined
	private variable(name: string): VariableOutput | undefined {
		if (name in this.variables)
			return this.variables[name as keyof VariableData];
		
		if (name in this.equations)
			return this.equation(name as keyof EquationData);
	}
	
	processComponent(component: string): ComponentOutput {
		let variable;
		
		if (/^[A-Za-z_]+$/.test(component) && (variable = this.variable(component)))
			return {
				mathComponent: variable.value.toString(),
				equationComponent: [
					this.record(`${variable.name} `, RecordEntryTypes.Note),
					this.recordNumber(variable.value)
				],
				record: variable.record
			};
		
		return {
			mathComponent: component,
			equationComponent: [
				this.record(component.replace(/\*/g, '\u00D7'), /^\d+$/.test(component) ? RecordEntryTypes.Number : RecordEntryTypes.Symbols)
			]
		};
	}
	
	expression(equationInfo: EquationInfo) {
		let exprOrFunc = equationInfo.expr; 
		
		return typeof exprOrFunc === 'function' ? exprOrFunc() : exprOrFunc;
	}
	
	equation(name: keyof EquationData): VariableOutput {
		let equationInfo = this.equations[name];
		let expr = this.expression(equationInfo!);
		let equation: RecordEntry[] = [];
		let parameters: Record<string, EquationRecord> = {};
		
		expr = expr.replace(/MULTI_(INLINE_|)([A-Za-z]+)/g, (str, inline, name) => {
			const key = 'MULTI_' + name as keyof EquationData
			
			if (inline && key in this.equations) {
				let expr = this.expression(this.equations[key]!);
				
				return `${expr.includes('+') ? '(' : ''}${expr}${expr.includes('+') ? ')' : ''}`;
			}
			
			return key;
		});
		
		expr = expr.split(/([A-Za-z_]+|\d+)+/g).map(component => {
			let res = this.processComponent(component);
			
			equation.push(...res.equationComponent);
			
			if (res.record)
				parameters[component] = res.record;
			
			return res.mathComponent;
		}).join('');
		
		let value = evaluateExpression(expr);
		
		equation.unshift(
			this.record(`${equationInfo!.name} `, RecordEntryTypes.Note),
			this.recordNumber(value),
			this.record(' = ', RecordEntryTypes.Symbols)
		);
		
		return {
			value: value,
			name: equationInfo!.name,
			record: {
				equation: equation,
				parameters: parameters
			}
		};
	}
	
	calculateDamage(): Damage {
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
