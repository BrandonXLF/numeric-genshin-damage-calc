import Damage from "../types/Damage";
import DamageGroups from "../types/DamageGroups";
import ReactionType from "../types/ReactionType";
import EquationData from "../types/EquationData";
import VariableOutput, { ComponentOutput, EquationRecord } from "../types/VariableOutput";
import RecordEntry, { RecordEntryTypes } from "../types/RecordEntry";
import StatData from "../types/StatData";
import VariableData from "../types/VariableData";
import evaluateExpression from "./evalulateExpression";
import stats from "./stats";
import transformativeLevelMultipliers from "./transformativeLevelMultipliers";

export default class DamageCalculator {
	static reactionTypes: ReactionType[] = [
		{
			name: 'No Reaction',
			canCrit: true,
			equation: 'generalDamage',
			groups: DamageGroups.General,
			reactions: [
				['No Reaction']
			]
		},
		{
			name: 'Amplifying',
			canCrit: true,
			equation: 'amplifyingReaction',
			groups: DamageGroups.Reaction | DamageGroups.General,
			reactions: [
				['Melt (Pyro on Cyro)', 2],
				['Melt (Cyro on Pyro)', 1.5],
				['Vaporize (Pyro on Hydro)', 1.5],
				['Vaporize (Hydro on Pyro)', 2]
			]
		},
		{
			name: 'Transformative',
			canCrit: false,
			equation: 'transformativeReaction',
			groups: DamageGroups.Reaction,
			reactions: [
				['Burgeon', 3],
				['Hyperbloom', 3],
				['Overloaded', 2],
				['Bloom', 2],
				['Shattered', 1.5],
				['Electro-Charged', 1.2],
				['Swirl', 0.6],
				['Superconduct', 0.5],
				['Burning', 0.25]
			]
		},
		{
			name: 'Additive',
			canCrit: true,
			equation: 'generalDamage',
			flatDamage: 'flatDamageAdded',
			groups: DamageGroups.General | DamageGroups.Reaction,
			reactions: [
				['Spread', 1.25],
				['Aggravate', 1.15]
			]
		}
	];
	
	private reactionType = DamageCalculator.reactionTypes[this.reactionTypeIndex];
	private reaction = this.reactionType.reactions[this.reactionIndex];
	private mainEquation = this.reactionType.equation;
	private flatDamage = this.reactionType.flatDamage || 'flatDamage';

	private variables = {
		baseMultiplier: {
			name: 'Reaction Multiplier',
			value: this.reaction[1] || 1
		},
		transformativeLevelMultiplier: {
			name: 'Level Multiplier',
			value: transformativeLevelMultipliers[this.statData.characterLevel.value] ?? NaN
		}
	} as VariableData;
	
	// https://library.keqingmains.com/combat-mechanics/damage/damage-formula
	private equations: EquationData = {
		talentScale: {
			name: 'ATK/HP/DEF',
			expr: '(baseTalentScale * (1 + additionalBonusTalentScale)) + bonusTalentScale'
		},
		baseDamage: {
			name: 'Base DMG',
			expr: () => {
				if (this.variable('talentEM').value) {
					return '((talentScale * talent) + (em * talentEM)) * baseDamageMultiplier'
				}
				
				return 'talentScale * talent * baseDamageMultiplier'
			}
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
					return '1 - enemyResistance / 2'
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
		trueTransformativeReation: {
			name: 'True DMG',
			expr: `baseTransformativeDamage * (1 + transformativeEMBonus + reactionBonus)`
		},
		transformativeReaction: {
			name: 'Transformative DMG',
			expr: `trueTransformativeReation * enemyResistanceMul`
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
			name: 'Flat DMG',
			expr: 'flatDamage + flatDamageReactionBonus'
		},
		flatDamageReactionEMBonus: {
			name: 'EM Bonus',
			expr: '(5 * em) / (1200 + em)'
		},
		flatDamageReactionBonus: {
			name: 'Reaction DMG Bonus',
			expr: 'baseTransformativeDamage * (1 + flatDamageReactionEMBonus + reactionBonus)'
		},
		realCritRate: {
			name: 'Real CRIT Rate',
			expr: 'max(0, min(critRate, 1))'
		},
		critBonus: {
			name: 'Effective CRIT Bonus',
			expr: 'max(0, min(critRate, 1)) * critDamage'
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
		stats.forEach(stat => this.variables[stat.attr] = {
			name: stat.name,
			value: this.statData[stat.attr].value
		});
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
	private variable(name: string): VariableOutput | null
	private variable(name: string): VariableOutput | null {
		if (name in this.variables) {
			return {
				value: this.variables[name as keyof VariableData].value,
				name: this.variables[name as keyof VariableData].name
			}
		}
		
		if (name in this.equations) {
			return this.equation(name as keyof EquationData);
		}
		
		return null;
	}
	
	processComponent(component: string): ComponentOutput {
		let variable;
		
		if (/^[A-Za-z]+$/.test(component) && (variable = this.variable(component))) {
			return {
				mathComponent: variable.value.toString(),
				equationComponent: [
					this.record(`${variable.name} `, RecordEntryTypes.Note),
					this.recordNumber(variable.value)
				],
				record: variable.record
			}
		}
		
		return {
			mathComponent: component,
			equationComponent: [
				this.record(component, /^\d+$/.test(component) ? RecordEntryTypes.Number : RecordEntryTypes.Symbols)
			]
		};
	}
	
	equation(name: keyof EquationData): VariableOutput {
		let equationInfo = this.equations[name];
		let exprOrFunc = equationInfo.expr;
		let expr = typeof exprOrFunc === 'function' ? exprOrFunc() : exprOrFunc;
		let equation: RecordEntry[] = [];
		let parameters: Record<string, EquationRecord> = {};
		
		expr = expr.split(/([A-Za-z]+|\d+)+/g).map(component => {
			let res = this.processComponent(component);
			
			equation.push(...res.equationComponent);
			
			if (res.record) {
				parameters[component] = res.record;
			}
			
			return res.mathComponent;
		}).join('');
		
		let value = evaluateExpression(expr);
		
		equation.unshift(
			this.record(`${equationInfo.name} `, RecordEntryTypes.Note),
			this.recordNumber(value),
			this.record(' = ', RecordEntryTypes.Symbols)
		);
		
		return {
			value: value,
			name: equationInfo.name,
			record: {
				equation: equation,
				parameters: parameters
			}
		};
	}
	
	calculateDamage(): Damage {
		if (this.reactionType.canCrit) {
			return {
				nonCrit: this.equation(this.reactionType.equation),
				crit: this.equation('critHit'),
				avgDmg: this.equation('avgDamage')
			};
		}
		
		return {
			avgDmg: this.equation(this.reactionType.equation)
		};
	}
}