
import { evaluate } from "mathjs";
import Damage from "../types/Damage";
import DamageGroup from "../types/DamageGroup";
import DamageType from "../types/DamageType";
import EquationData from "../types/EquationData";
import EquationOutput, { ComponentOutput, VariableOutput } from "../types/EquationOutput";
import RecordEntry, { RecordEntryTypes } from "../types/RecordEntry";
import StatData from "../types/StatData";
import VariableData from "../types/VariableData";
import stats from "./Stats";
import transformativeLevelMultipliers from "./TransformativeLevelMultipliers";

export default class DamageCalculator {
	static damageTypes: DamageType[] = [
		{
			name: 'No Reaction',
			canCrit: true,
			equation: 'generalDamage',
			group: DamageGroup.NoReaction
		},
		{
			name: 'Melt (Pyro on Cyro)',
			canCrit: true,
			equation: 'amplifyingReaction',
			baseMultiplier: 2,
			group: DamageGroup.Amplifying
		},
		{
			name: 'Melt (Cyro on Pyro)',
			canCrit: true,
			equation: 'amplifyingReaction',
			baseMultiplier: 1.5,
			group: DamageGroup.Amplifying
		},
		{
			name: 'Vaporize (Pyro on Hydro)',
			canCrit: true,
			equation: 'amplifyingReaction',
			baseMultiplier: 1.5,
			group: DamageGroup.Amplifying
		},
		{
			name: 'Vaporize (Hydro on Pyro)',
			canCrit: true,
			equation: 'amplifyingReaction',
			baseMultiplier: 2,
			group: DamageGroup.Amplifying
		},
		{
			name: 'Overloaded',
			canCrit: false,
			equation: 'transformativeReaction',
			baseMultiplier: 2,
			group: DamageGroup.Transformative
		},
		{
			name: 'Shattered',
			canCrit: false,
			equation: 'transformativeReaction',
			baseMultiplier: 1.5,
			group: DamageGroup.Transformative
		},
		{
			name: 'Electro-Charged',
			canCrit: false,
			equation: 'transformativeReaction',
			baseMultiplier: 1.2,
			group: DamageGroup.Transformative
		},
		{
			name: 'Swirl',
			canCrit: false,
			equation: 'transformativeReaction',
			baseMultiplier: 0.6,
			group: DamageGroup.Transformative
		},
		{
			name: 'Superconduct',
			canCrit: false,
			equation: 'transformativeReaction',
			baseMultiplier: 0.5,
			group: DamageGroup.Transformative
		}
	];
	
	private damageType = DamageCalculator.damageTypes[this.damageTypeNumber];
	private mainEquation = this.damageType.equation;
	private variables;
	
	// https://library.keqingmains.com/combat-mechanics/damage/damage-formula
	private equations: EquationData = {
		talentScale: {
			name: 'Talent Scale',
			expr: '(baseTalentScale * (1 + additionalBonusTalentScale)) + bonusTalentScale'
		},
		baseDamage: {
			name: 'Base DMG',
			expr: '(talent * talentScale * baseDamageMultiplier) + flatDamage'
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

				return '1 / (4 * enemyResistance + 1)';
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
			expr: 'baseDamage * (1 + damageBonus) * enemyDefenseMul * enemyResistanceMul'
		},
		transformativeEMBonus: {
			name: 'EM Bonus',
			expr: '(16 * em) / (2000 + em)'
		},
		baseTransformativeDamage: {
			name: 'Base Reaction DMG',
			expr: `baseMultiplier * transformativeLevelMultiplier`
		},
		transformativeReaction: {
			name: 'Transformative Reaction DMG',
			expr: `baseTransformativeDamage * (1 + transformativeEMBonus + reactionBonus) * enemyResistanceMul`
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
			name: 'Non CRIT',
			expr: 'generalDamage * amplifyingMul'
		},
		realCritRate: {
			name: 'Real CRIT Rate',
			expr: 'max(0, min(critRate, 1))'
		},
		critHit: {
			name: 'CRIT Hit',
			expr: `${this.mainEquation} * (1 + critDamage)`
		},
		avgDamage: {
			name: 'Avg DMG',
			expr: `${this.mainEquation} * (1 + realCritRate * critDamage)`
		}
	};
	
	constructor(
		private statData: StatData,
		private damageTypeNumber: number
	) {
		this.variables = {
			baseMultiplier: {
				name: 'Reaction Multiplier',
				value: this.damageType.baseMultiplier || 1
			},
			transformativeLevelMultiplier: {
				name: 'Level Multiplier',
				value: transformativeLevelMultipliers[this.statData.characterLevel.value]
			}
		} as VariableData;
		
		stats.forEach(stat => {
			this.variables[stat.attr] = {
				name: stat.name,
				value: this.statData[stat.attr].value
			};
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
				name: this.variables[name as keyof VariableData].name,
				equations: {}
			}
		}
		
		if (name in this.equations) {
			let equationOutput = this.equation(name as keyof EquationData);

			return {
				value: equationOutput.value,
				name: this.equations[name as keyof EquationData].name,
				equations: equationOutput.equations
			}
		}
		
		return null;
	}
	
	processComponent(component: string): ComponentOutput {
		let variable;
		
		if (/^[A-Za-z]+$/.test(component) && (variable = this.variable(component))) {
			return {
				value: variable.value.toString(),
				equationComponent: [
					this.record(`${variable.name} `, RecordEntryTypes.Note),
					this.recordNumber(variable.value)
				],
				equations: variable.equations
			}
		}
		
		return {
			value: component,
			equationComponent: [
				this.record(component, /^\d+$/.test(component) ? RecordEntryTypes.Number : RecordEntryTypes.Symbols)
			],
			equations: {}
		};
	}
	
	equation(name: keyof EquationData): EquationOutput {
		let exprOrFunc = this.equations[name].expr;
		let expr = typeof exprOrFunc === 'function' ? exprOrFunc() : exprOrFunc;
		let equation: RecordEntry[] = [];
		let prevEquations: Record<string, RecordEntry[]> = {};
		
		expr = expr.split(/([A-Za-z]+|\d+)+/g).map(component => {
			let res = this.processComponent(component);
			
			equation.push(...res.equationComponent);
			Object.assign(prevEquations, res.equations);
			
			return res.value;
		}).join('');
		
		let value = evaluate(expr);
		
		if (!(name in prevEquations)) {
			prevEquations[name] = [
				this.record(`${this.equations[name].name} `, RecordEntryTypes.Note),
				this.recordNumber(value),
				this.record(' = ', RecordEntryTypes.Symbols),
				...equation
			];
		}
		
		return {
			value: value,
			equations: prevEquations
		};
	}
	
	calculateDamage(): Damage {
		if (this.damageType.canCrit) {
			return {
				nonCrit: this.equation(this.damageType.equation),
				crit: this.equation('critHit'),
				avgDmg: this.equation('avgDamage')
			};
		}
		
		return {
			avgDmg: this.equation(this.damageType.equation)
		};
	}
}