import { OperationOutput } from "./EquationOutput";

export type EquationInfo = {
	name: string;
	expr: () => OperationOutput;
};

type EquationData = {
	talentScale: EquationInfo,
	baseDamage: EquationInfo,
	enemyResistance: EquationInfo,
	enemyResistanceMul: EquationInfo,
	enemyDefenseFactor: EquationInfo,
	characterDefenseFactor: EquationInfo,
	enemyDefenseMul: EquationInfo,
	generalDamage: EquationInfo,
	transformativeEMBonus: EquationInfo,
	baseTransformativeDamage: EquationInfo,
	transformativeReaction: EquationInfo,
	amplifyingEMBonus: EquationInfo,
	amplifyingMul: EquationInfo,
	amplifyingReaction: EquationInfo,
	realCritRate: EquationInfo,
	critHit: EquationInfo
	avgDamage: EquationInfo
};

export default EquationData;