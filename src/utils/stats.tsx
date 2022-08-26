import DamageGroups from "../types/DamageGroups";
import Stat, { StatSections, StatTypes } from "../types/Stat";

const stats: Stat[] = [
	{
		name: 'Character Level',
		attr: 'characterLevel',
		default: 1,
		type: StatTypes.Number,
		section: StatSections.Character,
		groups: DamageGroups.General | DamageGroups.Reaction
	},
	{
		name: 'Talent Multiplier',
		desc: 'The percent multiplier of the talent',
		attr: 'talent',
		default: 100,
		type: StatTypes.Percent,
		section: StatSections.Character,
		groups: DamageGroups.General
	},
	{
		name: 'Base [Stat]',
		desc: 'The stat the talent scales off of, e.g. base ATK or base HP, from character and weapon flat stat only',
		attr: 'baseTalentScale',
		default: 500,
		type: StatTypes.Number,
		section: StatSections.Character,
		groups: DamageGroups.General
	},
	{
		name: 'Extra [Stat] %',
		desc: 'Extra ATK percent, HP percent, etc., in-game ATK percent etc. is integrated into Bonus [Talent Scale]',
		attr: 'additionalBonusTalentScale',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.Character,
		groups: DamageGroups.General
	},
	{
		name: 'Bonus [Stat]',
		desc: 'The green number next to the stat the talent scales off of, includes in-game ATK percent etc.,  add extra flat ATK etc. like from Bennett\'s ult here',
		attr: 'bonusTalentScale',
		default: 500,
		type: StatTypes.Number,
		section: StatSections.Character,
		groups: DamageGroups.General
	},
	{
		name: 'Talent DMG Scale',
		desc: 'Special multiplier that applies to talent damage, increased by Xingqui\'s C4 and Yoimiya\'s skill for example',
		attr: 'baseDamageMultiplier',
		default: 100,
		type: StatTypes.Percent,
		section: StatSections.Character,
		groups: DamageGroups.General
	},
	{
		name: 'Flat DMG Bonus',
		desc: 'Flat damage increases that are added to the talent damage, e.g. Yunjin\'s skill, Zhongli\'s A4, and Kokomi\'s burst',
		attr: 'flatDamage',
		default: 0,
		type: StatTypes.Number,
		section: StatSections.Character,
		groups: DamageGroups.General
	},
	{
		name: 'DMG Bonus',
		desc: 'All damage bonuses added together, e.g. Goblet of Eonothem\'s main stat and Rust bow\'s passive',
		attr: 'damageBonus',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.Character,
		groups: DamageGroups.General
	},
	{
		name: 'Elemental Mastery',
		attr: 'em',
		default: 0,
		type: StatTypes.Number,
		section: StatSections.Character,
		groups: DamageGroups.Reaction
	},
	{
		name: 'Reaction Bonus',
		desc: 'All reaction damage bonuses added together besides the reaction bonus from EM, e.g. Crimson Witch 4-piece and Dragon\'s Bane\'s passive',
		attr: 'reactionBonus',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.Character,
		groups: DamageGroups.Reaction
	},
	{
		name: 'CRIT Rate',
		attr: 'critRate',
		default: 5,
		type: StatTypes.Percent,
		section: StatSections.Character,
		groups: DamageGroups.General
	},
	{
		name: 'CRIT DMG',
		attr: 'critDamage',
		default: 50,
		type: StatTypes.Percent,
		section: StatSections.Character,
		groups: DamageGroups.General
	},
	{
		name: 'Enemy Level',
		attr: 'enemyLevel',
		default: 1,
		type: StatTypes.Number,
		section: StatSections.Enemy,
		groups: DamageGroups.General
	},
	{
		name: 'DEF Decrease',
		desc: 'Defense decreasing effects, e.g. Razor\'s C4 or Klee\'s C2, use the word "decrease"',
		attr: 'defenseDecrease',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.Enemy,
		groups: DamageGroups.General
	},
	{
		name: 'DEF Ignore',
		desc: 'Defense ignore effects, e.g. Raiden\'s C2 and Yae Miko\'s C6, use the word "ignore"',
		attr: 'defenseIgnore',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.Enemy,
		groups: DamageGroups.General
	},
	{
		name: 'Base RES',
		desc: <span>The resistance the enemy has for the element of the attack before any reductions, see <a href="https://genshin-impact.fandom.com/wiki/Resistance#Enemy_Resistances">the wiki</a></span>,
		attr: 'resistance',
		default: 10,
		type: StatTypes.Percent,
		section: StatSections.Enemy,
		groups: DamageGroups.General | DamageGroups.Reaction
	},
	{
		name: 'RES Reduction',
		desc: 'The total resistance reduction for the element of the attack, e.g. Superconduct and Viridescent Venerer',
		attr: 'resistanceReduction',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.Enemy,
		groups:  DamageGroups.General | DamageGroups.Reaction
	}
];

export default stats;