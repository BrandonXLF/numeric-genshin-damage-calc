import StatData from "./StatData";

export type VariableInfo = {
	name: string;
	value: number;
};

type VariableData = Record<keyof StatData | 'baseMultiplier' | 'transformativeLevelMultiplier', VariableInfo>;

export default VariableData;