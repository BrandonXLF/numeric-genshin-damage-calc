import elements from "../utils/elements";
import DamageGroup from "./DamageGroups";
import EquationData from "./EquationData";
import ValueData from "./ValueData";

export type Reaction = {
	name: string;
	multiplier?: number;
	color: string;
	element: typeof elements[number] | 'Varies';
};

type ReactionType = {
	name: string;
	canCrit: boolean;
	equation: keyof EquationData;
	flatDamage?: keyof EquationData | keyof ValueData;
	groups: DamageGroup;
	reactions: Map<number, Reaction>;
	desc: string;
};

export default ReactionType;