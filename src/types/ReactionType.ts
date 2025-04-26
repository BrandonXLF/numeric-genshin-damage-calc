import elements from "../utils/elements";
import DamageGroup from "./DamageGroups";
import EquationData from "./EquationData";
import ValueData from "./ValueData";

export type Reaction = {
	name: string;
	secondaryName?: string;
	multiplier?: number;
	color: string;
	element: typeof elements[number] | 'Varies';
	canApply?: boolean;
};

type ReactionType = {
	name: string;
	secondaryName?: string;
	canCrit: boolean;
	equation: keyof EquationData;
	secondaryAmplifyingEquation?: keyof EquationData;
	secondaryAdditiveEquation?: keyof EquationData;
	flatDamage?: keyof EquationData | keyof ValueData;
	baseGroups: DamageGroup;
	reactions: Map<number, Reaction>;
	desc: string;
};

export default ReactionType;