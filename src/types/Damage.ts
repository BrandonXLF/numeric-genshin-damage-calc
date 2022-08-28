import EquationOutput from "./VariableOutput";

type Damage = {
	nonCrit?: EquationOutput;
	crit?: EquationOutput;
	avgDmg: EquationOutput;
};

export default Damage;