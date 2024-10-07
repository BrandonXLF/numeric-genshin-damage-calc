import DamageGroup from "./DamageGroups";
import EquationData from "./EquationData";
import ValueData from "./ValueData";

export type Reaction = {
	name: string;
	var?: number;
	color?: string;
};

type ReactionType = {
	name: string;
	canCrit: boolean;
	equation: keyof EquationData;
	flatDamage?: keyof EquationData | keyof ValueData;
	groups: DamageGroup;
	reactions: Reaction[];
};

export default ReactionType;