import elements from "../utils/elements";
import DamageGroup from "./DamageGroups";
import EquationData from "./EquationData";
import ValueData from "./ValueData";

export const enum EMBonusType {
	NONE,
	AMPLIFYING,
	ADDITIVE,
	TRANSFORMATIVE
};

export const enum RxnMode {
	NONE,
	MULTIPLICATIVE,
	ADDITIVE
}

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
	/**
	 * Formula for base damage. If not provided, talent damage will be used.
	 */
	baseDamage: keyof EquationData | keyof ValueData;
	/**
	 * Where reaction damage is added.
	 */
	rxnMode: RxnMode;
	/**
	 * The EM bonus type used for this damage.
	 */
	emBonus: EMBonusType;
	/**
	 * True if the damage ignores DMG bonus, enemy DEF, and is a separate damage number.
	 */
	isTransformative: boolean;
	/**
	 * True if the damage can crit.
	 */
	canCrit: boolean;
	baseGroups: DamageGroup;
	reactions: Map<number, Reaction>;
	desc: string;
};

export default ReactionType;