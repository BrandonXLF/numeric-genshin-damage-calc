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
	atk: EquationInfo;
	def: EquationInfo;
	hp: EquationInfo;
	baseDamage: EquationInfo;
	flatDamageBasic: EquationInfo;
	enemyResistance: EquationInfo;
	enemyResistanceMul: EquationInfo;
	enemyDefenseFactor: EquationInfo;
	characterDefenseFactor: EquationInfo;
	enemyDefenseMul: EquationInfo;
	generalDamage: EquationInfo;
	transformativeEMBonus: EquationInfo;
	baseTransformativeDamage: EquationInfo;
	transformativeReaction: EquationInfo;
	amplifyingEMBonus: EquationInfo;
	amplifyingMul: EquationInfo;
	amplifyingReaction: EquationInfo;
	realCritRate: EquationInfo;
	critHit: EquationInfo;
	avgDamage: EquationInfo;
	flatDamageReactionEMBonus: EquationInfo;
	trueDamage: EquationInfo;
	flatDamageReactionBonus: EquationInfo;
	critBonus: EquationInfo;
	flatDamageAdded: EquationInfo;
	trueTransformativeReaction: EquationInfo;
	amplifiedTransformativeReaction: EquationInfo;
	trueComponentizedTransformativeReaction: EquationInfo;
	trueComponentizedAdditiveDamage: EquationInfo;
	trueAddedToTransformativeReaction: EquationInfo;
	addedToTransformativeReaction: EquationInfo;
};

export default EquationData;