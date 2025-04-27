import EquationOutput from "../utils/EquationOutput";

export default interface DamageData {
	nonCrit?: EquationOutput;
	crit?: EquationOutput;
	avgDmg: EquationOutput;
};
