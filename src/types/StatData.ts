import StatValue from "../utils/StatValue";

type StatData = {
	baseTalentScale: StatValue;
	additionalBonusTalentScale: StatValue;
	bonusTalentScale: StatValue;
	talent: StatValue;
	talentScale: StatValue;
	baseDamageMultiplier: StatValue;
	flatDamage: StatValue;
	damageBonus: StatValue;
	em: StatValue;
	characterLevel: StatValue;
	reactionBonus: StatValue;
	critDamage: StatValue;
	critRate: StatValue;
	enemyLevel: StatValue;
	defenseIgnore: StatValue;
	defenseDecrease: StatValue;
	resistanceReduction: StatValue;
	resistance: StatValue;
};

export default StatData;
