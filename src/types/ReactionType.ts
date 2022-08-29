import DamageGroups from "./DamageGroups";
import EquationData from "./EquationData";
import VariableData from "./VariableData";

type ReactionType = {
	name: string;
	canCrit: boolean;
	equation: keyof EquationData;
	flatDamage?: keyof EquationData | keyof VariableData;
	groups: DamageGroups;
	reactions: [string, number?][];
};

export default ReactionType;