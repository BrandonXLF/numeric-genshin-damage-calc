import DamageCalculator from "../utils/DamageCalculator";
import DamageGroup from "./DamageGroup";

type DamageType = {
	name: string;
	canCrit: boolean;
	calc: (calculator: DamageCalculator) => number;
	group: DamageGroup;
};

export default DamageType;