import StatData from "../types/StatData";

const attributes = ['ATK', 'DEF', 'HP', 'EM'] as const;

/**
 * Get the name of the property for the stat that corresponds to the given type.
 * @param prop The base stat's property.
 * @param attr The attribute.
 * @returns The name of the property.
 */
export function getAttrStat(prop: keyof StatData, attr: typeof attributes[keyof typeof attributes]) {
	return prop + (attr === 'ATK' ? '' : attr) as keyof StatData;
}

export default attributes;