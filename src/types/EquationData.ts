export type EquationInfo = {
	name: string;
	expr: string | (() => string);
};

type EquationData = {
	talentScale: EquationInfo;
	baseDamage: EquationInfo;
	baseDamageFlatDamageReaction: EquationInfo;
	enemyResistance: EquationInfo;
	enemyResistanceMul: EquationInfo;
	enemyDefenseFactor: EquationInfo;
	characterDefenseFactor: EquationInfo;
	enemyDefenseMul: EquationInfo;
	generalDamage: EquationInfo;
	flatDamageReaction: EquationInfo;
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
	talentDamage: EquationInfo;
	flatDamageReactionBonus: EquationInfo;
};

export default EquationData;