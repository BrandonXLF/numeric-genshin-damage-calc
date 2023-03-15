import StatData from "./StatData";

export type VariableInfo = {
	name: string;
	value: number;
};

type ValueData = Record<keyof StatData | 'baseMultiplier' | 'transformativeLevelMultiplier', VariableInfo>;

export default ValueData;