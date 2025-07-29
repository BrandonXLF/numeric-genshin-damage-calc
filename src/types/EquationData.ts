export type EquationInfo = {
	name: string;
	/**
	 * @remark
	 * INLINE_x attempts to inline the expression named x
	 * 
	 * @remark
	 * SECONDARY_x makes secondary reaction substitutions while processing x
	 */
	expr: string | (() => string);
};

type EquationData = {
	// Stats
	atk: EquationInfo;
	def: EquationInfo;
	hp: EquationInfo;
	
	// Final base damage
	baseDamage: EquationInfo;
	flatDamageBasic: EquationInfo;
	finalBaseDamage: EquationInfo;
	
	// Reaction
	emBonus: EquationInfo;
	amplifyingMul: EquationInfo;

	// Amplified
	amplifiedDamage: EquationInfo;
	secondaryAmplifiedDamage: EquationInfo;
	
	// Additive
	flatDamageReactionBonus: EquationInfo;
	additiveDamage: EquationInfo;
	secondaryAdditiveDamage: EquationInfo;
	
	// Damage bonus
	bonusDamage: EquationInfo;
	
	// Enemy factors
	enemyDefenseFactor: EquationInfo;
	characterDefenseFactor: EquationInfo;
	enemyDefenseMul: EquationInfo;
	enemyResistance: EquationInfo;
	enemyResistanceMul: EquationInfo;
	travelPenalty: EquationInfo;
	travelMultiplier: EquationInfo;
	generalDamage: EquationInfo;
	
	// CRIT
	realCritRate: EquationInfo;
	critBonus: EquationInfo;
	critHit: EquationInfo;
	avgDamage: EquationInfo;
};

export default EquationData;