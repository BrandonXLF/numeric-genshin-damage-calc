const enum DamageGroup {
	Talent = 1 << 0,
	Level = 1 << 1,
	Reaction = 1 << 2,
	SecondaryReaction = 1 << 3,
	BonusAndDef = 1 << 4,
	Crit = 1 << 5,
	All = Talent | Level | Reaction | SecondaryReaction | BonusAndDef | Crit,
}

export default DamageGroup;