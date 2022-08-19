import { ReactElement } from "react";
import DamageGroup from "./DamageGroup";

type Stat = {
	name: string;
	label?: ReactElement;
	desc?: string | ReactElement;
	attr: string;
	default: number;
	type: StatTypes;
	groups: DamageGroup;
};

export type CharacterStatProp = 'level' | 'talent' | 'baseTalentScale' | 'bonusTalentScale' | 'additionalBonusTalentScale' | 'em' | 'critRate' | 'critDamage' | 'damageBonus' | 'reactionBonus' | 'flatDamage' | 'baseDamageMultiplier';
export type CharacterStat = Stat & { attr: CharacterStatProp; }

export type EnemyStatProp = 'level' | 'defenseDecrease' | 'defenseIgnore' | 'resistance' | 'resistanceReduction';
export type EnemyStat = Stat & { attr: EnemyStatProp; }

export enum StatTypes {
	Number,
	Percent
}

export default Stat;