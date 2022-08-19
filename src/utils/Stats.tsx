import DamageGroup from "../types/DamageGroup";
import { CharacterStat, EnemyStat, StatTypes } from "../types/Stat";

export default class Stats {
	static characterStats: CharacterStat[] = [
		{
			name: 'Level',
			desc: 'The character\'s level',
			attr: 'level',
			default: 1,
			type: StatTypes.Number,
			groups: DamageGroup.Amplifying | DamageGroup.Transformative | DamageGroup.NoReaction
		},
		{
			name: 'Talent',
			desc: 'The scaling of the talent',
			attr: 'talent',
			default: 100,
			type: StatTypes.Percent,
			groups: DamageGroup.Amplifying | DamageGroup.NoReaction
		},
		{
			name: 'Base Talent Scale',
			label: <span>Base <em>Talent Scale</em></span>,
			desc: 'The thing the talent scales off of, e.g. base attack or base HP, from character and weapon flat stat only',
			attr: 'baseTalentScale',
			default: 500,
			type: StatTypes.Number,
			groups: DamageGroup.Amplifying | DamageGroup.NoReaction
		},
		{
			name: 'Bonus Talent Scale',
			label: <span>Bonus <em>Talent Scale</em></span>,
			desc: 'The green number next to the talent scale in game, add extra flat attack etc. e.g. from Bennett\'s ult here',
			attr: 'bonusTalentScale',
			default: 500,
			type: StatTypes.Number,
			groups: DamageGroup.Amplifying | DamageGroup.NoReaction
		},
		{
			name: 'Extra Talent Scale',
			label: <span>Extra <em>Talent Scale</em></span>,
			desc: 'Extra attack percent, hp percent, etc., in-game attack percent etc. is integrated into Bonus Talent Scale',
			attr: 'additionalBonusTalentScale',
			default: 0,
			type: StatTypes.Percent,
			groups: DamageGroup.Amplifying | DamageGroup.NoReaction
		},
		{
			name: 'Elemental Mastery',
			attr: 'em',
			default: 0,
			type: StatTypes.Number,
			groups: DamageGroup.Amplifying | DamageGroup.Transformative
		},
		{
			name: 'Crit Rate',
			attr: 'critRate',
			default: 5,
			type: StatTypes.Percent,
			groups: DamageGroup.Amplifying | DamageGroup.NoReaction
		},
		{
			name: 'Crit Damage',
			attr: 'critDamage',
			default: 50,
			type: StatTypes.Percent,
			groups: DamageGroup.Amplifying | DamageGroup.NoReaction
		},
		{
			name: 'Damage Bonus',
			desc: 'All damage bonuses added together',
			attr: 'damageBonus',
			default: 0,
			type: StatTypes.Percent,
			groups: DamageGroup.Amplifying | DamageGroup.NoReaction
		},
		{
			name: 'Reaction Bonus',
			desc: 'All reaction bonuses added together, e.g. Crimson Witch 4-piece and Dragon\'s Bane\'s passive',
			attr: 'reactionBonus',
			default: 0,
			type: StatTypes.Percent,
			groups: DamageGroup.Amplifying | DamageGroup.Transformative
		},
		{
			name: 'Flat Damage',
			desc: 'Flat damage increases, e.g. Yunjin\'s skill, Zhongli\'s A4, and Kokomi\'s burst',
			attr: 'flatDamage',
			default: 0,
			type: StatTypes.Number,
			groups: DamageGroup.Amplifying | DamageGroup.NoReaction
		},
		{
			name: 'Base Damage Scale',
			desc: 'Special multiplier that applies to base damage, increased by Xingqui\'s C4 and Yoimiya\'s skill for example',
			attr: 'baseDamageMultiplier',
			default: 100,
			type: StatTypes.Percent,
			groups: DamageGroup.Amplifying | DamageGroup.NoReaction
		}
	];

	static enemyStats: EnemyStat[] = [
		{
			name: 'Level',
			desc: 'The enemy\'s level',
			attr: 'level',
			default: 1,
			type: StatTypes.Number,
			groups: DamageGroup.Amplifying | DamageGroup.NoReaction
		},
		{
			name: 'Defense Decrease',
			desc: 'Defense decreasing effects such as Razor\'s C4 or Klee\'s C2, use the word "decrease"',
			attr: 'defenseDecrease',
			default: 0,
			type: StatTypes.Percent,
			groups: DamageGroup.Amplifying | DamageGroup.NoReaction
		},
		{
			name: 'Defense Ignore',
			desc: 'Defense ignore  effects such as Raiden\'s C2 and Yae Miko\'s C6, use the word "ignore"',
			attr: 'defenseIgnore',
			default: 0,
			type: StatTypes.Percent,
			groups: DamageGroup.Amplifying | DamageGroup.NoReaction
		},
		{
			name: 'Resistance',
			desc: <span>The resistance the enemy has for the element of the attack before any reductions, see <a href="https://genshin-impact.fandom.com/wiki/Resistance#Enemy_Resistances">the wiki</a></span>,
			attr: 'resistance',
			default: 10,
			type: StatTypes.Percent,
			groups: DamageGroup.Amplifying | DamageGroup.Transformative | DamageGroup.NoReaction
		},
		{
			name: 'Resistance Reduction',
			desc: 'The total resistance reduction for the element of the attack, e.g. Superconduct and Viridescent Venerer',
			attr: 'resistanceReduction',
			default: 0,
			type: StatTypes.Percent,
			groups: DamageGroup.Amplifying | DamageGroup.Transformative | DamageGroup.NoReaction
		}
	];
}