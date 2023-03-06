export type EquationInfo = {
	name: string;
	expr: string | (() => string);
};

type EquationData = {
	atk: EquationInfo;
	def: EquationInfo;
	hp: EquationInfo;
	baseDamage: EquationInfo;
	totalTalentDamageBonus: EquationInfo;
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
};

export default EquationData;