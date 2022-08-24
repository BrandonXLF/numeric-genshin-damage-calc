import DamageGroup from "../types/DamageGroup";
import Stat, { StatSections, StatTypes } from "../types/Stat";

const stats: Stat[] = [
	{
		name: 'Character Level',
		desc: 'The character\'s level',
		attr: 'characterLevel',
		default: 1,
		type: StatTypes.Number,
		section: StatSections.Character,
		groups: DamageGroup.Amplifying | DamageGroup.Transformative | DamageGroup.NoReaction
	},
	{
		name: 'Talent Multiplier',
		desc: 'The multiplier of the talent',
		attr: 'talent',
		default: 100,
		type: StatTypes.Percent,
		section: StatSections.Character,
		groups: DamageGroup.Amplifying | DamageGroup.NoReaction
	},
	{
		name: 'Base Talent Attr',
		label: <span>Base <em>Talent Attr</em></span>,
		desc: 'The attribute the talent scales off of, e.g. base attack or base HP, from character and weapon flat stat only',
		attr: 'baseTalentScale',
		default: 500,
		type: StatTypes.Number,
		section: StatSections.Character,
		groups: DamageGroup.Amplifying | DamageGroup.NoReaction
	},
	{
		name: 'Extra Bonus Talent Attr',
		label: <span>Extra <em>Talent Attr %</em></span>,
		desc: <span>Extra ATK percent, HP percent, etc., in-game ATK percent etc. is integrated into Bonus <em>Talent Scale</em></span>,
		attr: 'additionalBonusTalentScale',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.Character,
		groups: DamageGroup.Amplifying | DamageGroup.NoReaction
	},
	{
		name: 'Flat Bonus Talent Attr',
		label: <span>Bonus <em>Talent Attr</em></span>,
		desc: 'The green number next to the attribute the talent scales with in game, add extra flat attack etc. e.g. from Bennett\'s ult here',
		attr: 'bonusTalentScale',
		default: 500,
		type: StatTypes.Number,
		section: StatSections.Character,
		groups: DamageGroup.Amplifying | DamageGroup.NoReaction
	},
	{
		name: 'Elemental Mastery',
		attr: 'em',
		default: 0,
		type: StatTypes.Number,
		section: StatSections.Character,
		groups: DamageGroup.Amplifying | DamageGroup.Transformative
	},
	{
		name: 'CRIT Rate',
		attr: 'critRate',
		default: 5,
		type: StatTypes.Percent,
		section: StatSections.Character,
		groups: DamageGroup.Amplifying | DamageGroup.NoReaction
	},
	{
		name: 'CRIT DMG',
		attr: 'critDamage',
		default: 50,
		type: StatTypes.Percent,
		section: StatSections.Character,
		groups: DamageGroup.Amplifying | DamageGroup.NoReaction
	},
	{
		name: 'DMG Bonus',
		desc: 'All damage bonuses added together',
		attr: 'damageBonus',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.Character,
		groups: DamageGroup.Amplifying | DamageGroup.NoReaction
	},
	{
		name: 'Reaction Bonus',
		desc: 'All reaction bonuses added together, e.g. Crimson Witch 4-piece and Dragon\'s Bane\'s passive',
		attr: 'reactionBonus',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.Character,
		groups: DamageGroup.Amplifying | DamageGroup.Transformative
	},
	{
		name: 'Flat DMG',
		desc: 'Flat damage increases, e.g. Yunjin\'s skill, Zhongli\'s A4, and Kokomi\'s burst',
		attr: 'flatDamage',
		default: 0,
		type: StatTypes.Number,
		section: StatSections.Character,
		groups: DamageGroup.Amplifying | DamageGroup.NoReaction
	},
	{
		name: 'Base DMG Scale',
		desc: 'Special multiplier that applies to base damage, increased by Xingqui\'s C4 and Yoimiya\'s skill for example',
		attr: 'baseDamageMultiplier',
		default: 100,
		type: StatTypes.Percent,
		section: StatSections.Character,
		groups: DamageGroup.Amplifying | DamageGroup.NoReaction
	},
	{
		name: 'Enemy Level',
		desc: 'The enemy\'s level',
		attr: 'enemyLevel',
		default: 1,
		type: StatTypes.Number,
		section: StatSections.Enemy,
		groups: DamageGroup.Amplifying | DamageGroup.NoReaction
	},
	{
		name: 'DEF Decrease',
		desc: 'Defense decreasing effects such as Razor\'s C4 or Klee\'s C2, use the word "decrease"',
		attr: 'defenseDecrease',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.Enemy,
		groups: DamageGroup.Amplifying | DamageGroup.NoReaction
	},
	{
		name: 'DEF Ignore',
		desc: 'Defense ignore  effects such as Raiden\'s C2 and Yae Miko\'s C6, use the word "ignore"',
		attr: 'defenseIgnore',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.Enemy,
		groups: DamageGroup.Amplifying | DamageGroup.NoReaction
	},
	{
		name: 'Base RES',
		desc: <span>The resistance the enemy has for the element of the attack before any reductions, see <a href="https://genshin-impact.fandom.com/wiki/Resistance#Enemy_Resistances">the wiki</a></span>,
		attr: 'resistance',
		default: 10,
		type: StatTypes.Percent,
		section: StatSections.Enemy,
		groups: DamageGroup.Amplifying | DamageGroup.Transformative | DamageGroup.NoReaction
	},
	{
		name: 'RES Reduction',
		desc: 'The total resistance reduction for the element of the attack, e.g. Superconduct and Viridescent Venerer',
		attr: 'resistanceReduction',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.Enemy,
		groups: DamageGroup.Amplifying | DamageGroup.Transformative | DamageGroup.NoReaction
	}
];

export default stats;