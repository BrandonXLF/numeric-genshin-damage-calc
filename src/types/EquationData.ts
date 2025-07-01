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
	
	// Base damage
	baseDamage: EquationInfo;
	flatDamageBasic: EquationInfo;
	finalBaseDamage: EquationInfo;
	
	// EM Bonuses
	transformativeEMBonus: EquationInfo;
	amplifyingEMBonus: EquationInfo;
	flatDamageReactionEMBonus: EquationInfo;
	
	// Amplifying reactions
	amplifyingMul: EquationInfo;
	amplifiedDamage: EquationInfo;
	secondaryAmplifiedDamage: EquationInfo;
	
	// Additive reactions
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
	generalDamage: EquationInfo;
	
	// CRIT
	realCritRate: EquationInfo;
	critBonus: EquationInfo;
	critHit: EquationInfo;
	avgDamage: EquationInfo;
};

export default EquationData;