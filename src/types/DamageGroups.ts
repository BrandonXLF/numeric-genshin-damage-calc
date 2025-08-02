const enum DamageGroup {
	None = 0,
	Talent = 1 << 0,
	Level = 1 << 1,
	Reaction = 1 << 2,
	SecondaryReaction = 1 << 3,
	Transformative = 1 << 4,
	NonTransformative = 1 << 5,
	Crit = 1 << 6,
	TransformativeCrit = 1 << 7,
	All = (1 << 8) - 1,
}

export default DamageGroup;