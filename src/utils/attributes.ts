import StatData from "../types/StatData";

const attributes = ['ATK', 'HP', 'DEF', 'EM'] as const;

export function getAttrStat(prop: keyof StatData, attr: typeof attributes[keyof typeof attributes]) {
	return prop + (attr === 'ATK' ? '' : attr) as keyof StatData;
}

export default attributes;