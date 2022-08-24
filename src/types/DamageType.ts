import DamageGroups from "./DamageGroups";
import EquationData from "./EquationData";

type DamageType = {
	name: string;
	canCrit: boolean;
	equation: keyof EquationData;
	baseMultiplier?: number;
	groups: DamageGroups;
};

export default DamageType;