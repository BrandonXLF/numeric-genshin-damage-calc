import StatData from "./StatData";

export type ValueInfo = {
	name: string;
	value: number;
};

type ValueData = Record<keyof StatData | 'baseMultiplier' | 'transformativeLevelMultiplier', ValueInfo>;

export default ValueData;