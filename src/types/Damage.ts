import EquationOutput from "./EquationOutput";

type Damage = {
	nonCrit?: EquationOutput;
	crit?: EquationOutput;
	avgDmg: EquationOutput;
};

export default Damage;