import DamageGroup from "./DamageGroups";
import EquationData from "./EquationData";
import ValueData from "./ValueData";

export type Reaction = {
	name: string;
	multiplier?: number;
	color?: string;
};

type ReactionType = {
	name: string;
	canCrit: boolean;
	equation: keyof EquationData;
	flatDamage?: keyof EquationData | keyof ValueData;
	groups: DamageGroup;
	reactions: Map<number, Reaction>;
};

export default ReactionType;