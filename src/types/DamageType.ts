import DamageGroup from "./DamageGroup";
import EquationData from "./EquationData";

type DamageType = {
	name: string;
	canCrit: boolean;
	equation: keyof EquationData;
	baseMultiplier?: number;
	group: DamageGroup;
};

export default DamageType;