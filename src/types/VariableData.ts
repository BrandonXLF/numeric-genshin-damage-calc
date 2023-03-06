import StatData from "./StatData";

export type VariableInfo = {
	name: string;
	value: number;
};

type VariableData = Record<keyof StatData | 'baseMultiplier' | 'transformativeLevelMultiplier' | `MULTI_${string}`, VariableInfo>;

export default VariableData;