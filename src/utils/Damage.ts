import DamageData from "../types/DamageData";
import { EquationOutput } from "../types/VariableOutput";

export default class Damage implements DamageData {
	constructor(
		public readonly avgDmg: EquationOutput,
		public readonly crit?: EquationOutput,
		public readonly nonCrit?: EquationOutput
	) {}
	
	getWithDefault(prop: keyof DamageData): EquationOutput {
		return this[prop] ?? this.avgDmg;
	}
};
