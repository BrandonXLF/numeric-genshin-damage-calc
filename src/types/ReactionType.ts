import elements from "../utils/elements";

export const enum BaseDamage {
	Talent = 1,
	Level
};

export const enum RxnMode {
	None,
	Multiplicative,
	Additive
};

export const enum EMBonusType {
	None,
	Amplifying,
	Additive,
	Transformative,
	Lunar
};

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
	 * Base formula type for base damage.
	 */
	baseDamage: BaseDamage;
	/**
	 * Base formula type for additive damage.
	 */
	additiveBaseDamage?: BaseDamage;
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
	reactions: Map<number, Reaction>;
	desc: string;
} & ({
	rxnMode: RxnMode.Additive;
	additiveBaseDamage: BaseDamage;
} | {
	rxnMode: Exclude<RxnMode, RxnMode.Additive>;
	additiveBaseDamage?: never;
});

export default ReactionType;