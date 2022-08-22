
import Damage from "../types/Damage";
import DamageGroup from "../types/DamageGroup";
import DamageType from "../types/DamageType";
import EquationData from "../types/EquationData";
import EquationOutput, { OperationInput, OperationOutput } from "../types/EquationOutput";
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
	
	// https://library.keqingmains.com/combat-mechanics/damage/damage-formula
	private equations: EquationData =  {
		talentScale: {
			name: 'Talent Scale',
			expr: () => this.add(this.mul('baseTalentScale', this.add(1, 'additionalBonusTalentScale')), 'bonusTalentScale')
		},
		baseDamage: {
			name: 'Base DMG',
			expr: () => this.add(this.mul('talent', 'talentScale', 'baseDamageMultiplier'), 'flatDamage')
		},
		enemyResistance: {
			name: 'Enemy RES',
			expr: () => this.sub('resistance', 'resistanceReduction')
		},
		enemyResistanceMul: {
			name: 'Enemy RES Multiplier',
			expr: () => {
				let enemyResistance = this.variable('enemyResistance').value;
				
				if (enemyResistance < 0) {
					return this.sub(1, this.div('enemyResistance', 2))
				}

				if (enemyResistance < 0.75) {
					return this.sub(1, 'enemyResistance')
				}

				return this.div(1, this.add(this.mul(4, 'enemyResistance'), 1))
			}
		},
		enemyDefenseFactor: {
			name: 'Enemy DEF Enemy Factor',
			expr: () => this.mul(this.add('enemyLevel', 100), this.sub(1, 'defenseDecrease'), this.sub(1, 'defenseIgnore'))
		},
		characterDefenseFactor: {
			name: 'Enemy DEF Char Factor',
			expr: () => this.add('characterLevel', 100)
		},
		enemyDefenseMul: {
			name: 'Enemy DEF Multiplier',
			expr: () => this.div('characterDefenseFactor', this.add('characterDefenseFactor', 'enemyDefenseFactor'))
		},
		generalDamage: {
			name: 'General DMG',
			expr: () => this.mul('baseDamage', this.add(1, 'damageBonus'), 'enemyDefenseMul', 'enemyResistanceMul')
		},
		transformativeEMBonus: {
			name: 'EM Bonus',
			expr: () => this.div(this.mul(16, 'em'), this.add(2000, 'em'))
		},
		baseTransformativeDamage: {
			name: 'Base Reaction DMG',
			expr: () => this.mul('baseMultiplier', 'transformativeLevelMultiplier')
		},
		transformativeReaction: {
			name: 'DMG',
			expr: () => this.mul('baseTransformativeDamage', this.add(1, 'transformativeEMBonus', 'reactionBonus'), 'enemyResistanceMul')
		},
		amplifyingEMBonus: {
			name: 'EM Bonus',
			expr: () => this.div(this.mul(2.78, 'em'), this.add(1400, 'em'))
		},
		amplifyingMul: {
			name: 'Reaction Multiplier',
			expr: () => this.mul('baseMultiplier', this.add(1, 'amplifyingEMBonus', 'reactionBonus'))
		},
		amplifyingReaction: {
			name: 'Non CRIT',
			expr: () => this.mul('generalDamage', 'amplifyingMul')
		},
		realCritRate: {
			name: 'Real CRIT Rate',
			expr: () => this.max(0, this.min('critRate', 1))
		},
		critHit: {
			name: 'CRIT Hit',
			expr: () => this.mul(this.mainEquation, this.add(1, 'critDamage'))
		},
		avgDamage: {
			name: 'Avg DMG',
			expr: () => this.mul(this.mainEquation, this.add(1, this.mul('realCritRate', 'critDamage'))),
		}
	}
	
	private mainEquation;
	private variables;
	private damageType;
	
	constructor(
		private statData: StatData,
		damageType: number
	) {
		this.damageType = DamageCalculator.damageTypes[damageType];
		this.mainEquation = this.damageType.equation;

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
	
	private resolve(value: OperationInput): OperationOutput {
		if (typeof value === 'object') {
			return value.shouldEnclose
				? {
					...value,
					equation: [
						this.record('(', RecordEntryTypes.Symbols),
						...value.equation,
						this.record(')', RecordEntryTypes.Symbols)
					]
				}
				: value;
		}
		
		if (typeof value === 'string') {
			return this.variable(value);
		}
		
		return {
			value: value,
			equation: [
				this.recordNumber(value)
			],
			prevEquations: {}
		};
	}
	
	private createOperation(
		func: (x: number, y: number) => number,
		separator: string,
		wrap?: [string, string]
	) {
		return (...values: OperationInput[]) => {
			let prevEquations: Record<string, RecordEntry[]> = {};
		
			let resolvedValues = values.map(value => {
				let resolved = this.resolve(value);
				
				Object.assign(prevEquations, resolved.prevEquations);
				
				return {
					value: resolved.value,
					equation: resolved.equation,
				}
			});
			
			let combinedValues = resolvedValues.reduce((prev, cur) => ({
				value: func(prev.value, cur.value),
				equation: [
					...prev.equation,
					this.record(separator, RecordEntryTypes.Symbols),
					...cur.equation
				]
			}));
			
			if (wrap) {
				combinedValues.equation.unshift(this.record(wrap[0], RecordEntryTypes.Symbols))
				combinedValues.equation.push(this.record(wrap[1], RecordEntryTypes.Symbols));
			}
			
			return {
				shouldEnclose: !wrap,
				prevEquations: prevEquations,
				...combinedValues
			};
		}
	}
	
	private mul = this.createOperation((x, y) => x * y, ' * ');
	private div = this.createOperation((x, y) => x / y, ' / ');
	private add = this.createOperation((x, y) => x + y, ' + ');
	private sub = this.createOperation((x, y) => x - y, ' - ');
	private max = this.createOperation(Math.max, ', ', ['max(', ')']);
	private min = this.createOperation(Math.min, ', ', ['min(', ')']);
	
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
	
	private variable(left: keyof VariableData | keyof EquationData): OperationOutput {
		let val: number,
			name: string,
			prev: Record<string, RecordEntry[]>;
		
		if (left in this.variables) {
			val = this.variables[left as keyof VariableData].value;
			name = this.variables[left as keyof VariableData].name;
			prev = {};
		} else {
			let equationOutput = this.equation(left as keyof EquationData);
			
			val = equationOutput.value;
			name = this.equations[left as keyof EquationData].name;
			prev = equationOutput.equations;
		}
		
		return {
			value: val,
			equation: [
				this.record(`${name} `, RecordEntryTypes.Note),
				this.recordNumber(val)
			],
			prevEquations: prev
		}
	}
	
	equation(left: keyof EquationData): EquationOutput {
		let res = this.equations[left].expr();
		
		if (!(left in res.prevEquations)) {
			res.prevEquations[left] = [
				this.record(`${this.equations[left].name} `, RecordEntryTypes.Note),
				this.recordNumber(res.value),
				this.record(' = ', RecordEntryTypes.Symbols),
				...res.equation
			];
		}
		
		return {
			value: res.value,
			equations: res.prevEquations
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