import DamageGroups from "./DamageGroups";
import EquationData from "./EquationData";
import ValueData from "./ValueData";

type ReactionType = {
	name: string;
	canCrit: boolean;
	equation: keyof EquationData;
	flatDamage?: keyof EquationData | keyof ValueData;
	groups: DamageGroups;
	reactions: {
		name: string;
		var?: number;
		color?: string;
	}[];
};

export default ReactionType;