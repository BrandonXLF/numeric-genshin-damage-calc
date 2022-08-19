import StatValue from "../utils/StatValue";

type StatData = {
	[stat: string]: StatValue;
}

export type CharacterData = {
	baseTalentScale: StatValue;
	additionalBonusTalentScale: StatValue;
	bonusTalentScale: StatValue;
	talent: StatValue;
	talentScale: StatValue;
	baseDamageMultiplier: StatValue;
	flatDamage: StatValue;
	damageBonus: StatValue;
	em: StatValue;
	level: StatValue;
	reactionBonus: StatValue;
	critDamage: StatValue;
	critRate: StatValue;
};

export type EnemyData = {
	level: StatValue;
	defenseIgnore: StatValue;
	defenseDecrease: StatValue;
	resistanceReduction: StatValue;
	resistance: StatValue;
};

export default StatData;
