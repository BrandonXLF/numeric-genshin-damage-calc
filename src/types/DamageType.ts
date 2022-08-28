import DamageGroups from "./DamageGroups";
import EquationData from "./EquationData";
import VariableData from "./VariableData";

type DamageType = {
	name: string;
	canCrit: boolean;
	equation: keyof EquationData;
	flatDamage?: keyof EquationData | keyof VariableData;
	baseMultiplier?: number;
	groups: DamageGroups;
};

export default DamageType;