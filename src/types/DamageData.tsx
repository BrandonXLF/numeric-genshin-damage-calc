import { EquationOutput } from "./VariableOutput";

export default interface DamageData {
	nonCrit?: EquationOutput;
	crit?: EquationOutput;
	avgDmg: EquationOutput;
};
