import DamageGroups from "../types/DamageGroups";
import Stat, { StatTypes } from "../types/Stat";
import { StatSections } from "../types/StatSection";
import StatIcon from "../svgs/StatIcon";

const stats: Stat[] = [
	{
		name: 'Character Level',
		prop: 'characterLevel',
		default: 1,
		type: StatTypes.Number,
		section: StatSections.Character,
		groups: DamageGroups.General | DamageGroups.Reaction,
		icon: <StatIcon base="character" />
	},
	{
		name: 'Talent Scaling',
		desc: 'The percent multiplier of the talent that scales with the selected stat',
		prop: 'talent',
		usesAttrs: true,
		default: 100,
		type: StatTypes.Percent,
		section: StatSections.CharacterTalent,
		groups: DamageGroups.General,
		icon: <StatIcon base="percent" />
	},
	{
		name: 'Talent Multiplier',
		desc: 'Multiplier that applies to the talent multipliers, increased by Xingqui\'s C4 and Yoimiya\'s skill for example',
		prop: 'baseDamageMultiplier',
		default: 100,
		type: StatTypes.Percent,
		section: StatSections.CharacterTalent,
		groups: DamageGroups.General,
		icon: <StatIcon base="percent" indicator="percent" />
	},
	{
		name: 'Talent DMG Bonus',
		desc: 'Damage increases that are added to the talent damage by other talents, e.g. Zhongli\'s A4, and Kokomi\'s burst',
		prop: 'talentDamageBonus',
		usesAttrs: true,
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.CharacterTalent,
		groups: DamageGroups.General,
		icon: <StatIcon base="damage" indicator="increase" />
	},
	{
		name: 'Flat DMG Bonus',
		desc: 'Flat damage increases that are added to the talent damage, e.g. Yunjin\'s skill',
		prop: 'flatDamage',
		default: 0,
		type: StatTypes.Number,
		section: StatSections.CharacterTalent,
		groups: DamageGroups.General,
		icon: <StatIcon base="damage" indicator="increase" />
	},
	{
		name: 'Base ATK',
		desc: 'ATK from character and weapon flat stat only',
		prop: 'baseTalentScale',
		attr: 'ATK',
		default: 500,
		type: StatTypes.Number,
		section: StatSections.CharacterStats,
		icon: <StatIcon base="damage" />
	},
	{
		name: 'Bonus ATK',
		desc: 'The green number next to the base ATK, includes in-game ATK percent, add extra flat ATK, like from Bennett\'s ult, here',
		prop: 'bonusTalentScale',
		attr: 'ATK',
		default: 500,
		type: StatTypes.Number,
		section: StatSections.CharacterStats,
		icon: <StatIcon base="damage" indicator="increase" />
	},
	{
		name: 'Extra ATK %',
		desc: 'Extra ATK percent, in-game ATK percent is integrated into Bonus ATK',
		prop: 'additionalBonusTalentScale',
		attr: 'ATK',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.CharacterStats,
		icon: <StatIcon base="damage" indicator="increase" />
	},
	{
		name: 'Base DEF',
		desc: 'DEF from character base stat only',
		prop: 'baseDEF',
		attr: 'DEF',
		default: 500,
		type: StatTypes.Number,
		section: StatSections.CharacterStats,
		icon: <StatIcon base="def" />
	},
	{
		name: 'Bonus DEF',
		desc: 'The green number next to the base DEF, includes in-game DEF percent, add extra flat DEF, like from Gorou\'s skill, here',
		prop: 'bonusDEF',
		attr: 'DEF',
		default: 500,
		type: StatTypes.Number,
		section: StatSections.CharacterStats,
		icon: <StatIcon base="def" indicator="increase" />
	},
	{
		name: 'Extra DEF %',
		desc: 'Extra DEF percent, in-game DEF percent is integrated into Bonus DEF',
		prop: 'additionalBonusDEF',
		attr: 'DEF',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.CharacterStats,
		icon: <StatIcon base="def" indicator="increase" />
	},
	{
		name: 'Base HP',
		desc: 'HP from character base stat only',
		prop: 'baseHP',
		attr: 'HP',
		default: 500,
		type: StatTypes.Number,
		section: StatSections.CharacterStats,
		icon: <StatIcon base="hp" />
	},
	{
		name: 'Bonus HP',
		desc: 'The green number next to the base DEF, includes in-game DEF percent, add extra flat HP here',
		prop: 'bonusHP',
		attr: 'HP',
		default: 500,
		type: StatTypes.Number,
		section: StatSections.CharacterStats,
		icon: <StatIcon base="hp" indicator="increase" />
	},
	{
		name: 'Extra HP %',
		desc: 'Extra HP percent, in-game HP percent is integrated into Bonus HP',
		prop: 'additionalBonusHP',
		attr: 'HP',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.CharacterStats,
		icon: <StatIcon base="hp" indicator="increase" />
	},
	{
		name: 'Elemental Mastery',
		desc: 'Used to calculate reaction DMG bonus and talent if applicable',
		prop: 'em',
		attr: 'EM',
		default: 0,
		type: StatTypes.Number,
		section: StatSections.CharacterStats,
		groups: DamageGroups.Reaction,
		icon: <StatIcon base="em" />
	},
	{
		name: 'DMG Bonus',
		desc: 'All damage bonuses added together, e.g. Goblet of Eonothem\'s main stat and Rust bow\'s passive',
		prop: 'damageBonus',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.CharacterStats,
		groups: DamageGroups.General,
		icon: <StatIcon base="damage" indicator="increase" />
	},
	{
		name: 'Reaction Bonus',
		desc: 'All reaction damage bonuses added together besides the reaction bonus from EM, e.g. Crimson Witch 4-piece and Dragon\'s Bane\'s passive',
		prop: 'reactionBonus',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.CharacterStats,
		groups: DamageGroups.Reaction,
		icon: <StatIcon base="damage" indicator="increase" />
	},
	{
		name: 'CRIT Rate',
		prop: 'critRate',
		default: 5,
		type: StatTypes.Percent,
		section: StatSections.CharacterStats,
		groups: DamageGroups.General,
		icon: <StatIcon base="critRate" />
	},
	{
		name: 'CRIT DMG',
		prop: 'critDamage',
		default: 50,
		type: StatTypes.Percent,
		section: StatSections.CharacterStats,
		groups: DamageGroups.General,
		icon: <StatIcon base="critDmg" />
	},
	{
		name: 'Enemy Level',
		prop: 'enemyLevel',
		default: 1,
		type: StatTypes.Number,
		section: StatSections.Enemy,
		groups: DamageGroups.General,
		icon: <StatIcon base="enemy" />
	},
	{
		name: 'DEF Decrease',
		desc: 'Defense decreasing effects, e.g. Razor\'s C4 or Klee\'s C2, use the word "decrease"',
		prop: 'defenseDecrease',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.Enemy,
		groups: DamageGroups.General,
		icon: <StatIcon base="shield" mask="enemySmall" indicator="decrease" />
	},
	{
		name: 'DEF Ignore',
		desc: 'Defense ignore effects, e.g. Raiden\'s C2 and Yae Miko\'s C6, use the word "ignore"',
		prop: 'defenseIgnore',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.Enemy,
		groups: DamageGroups.General,
		icon: <StatIcon base="shield" mask="enemySmall" indicator="decrease" />
	},
	{
		name: 'Base RES',
		desc: <span>The resistance the enemy has for the element of the attack before any reductions, see <a href="https://genshin-impact.fandom.com/wiki/Resistance#Enemy_Resistances" target="genshin-wiki">the wiki</a></span>,
		prop: 'resistance',
		default: 10,
		type: StatTypes.Percent,
		section: StatSections.Enemy,
		groups: DamageGroups.General | DamageGroups.Reaction,
		icon: <StatIcon base="shield" mask="enemySmall" />
	},
	{
		name: 'RES Reduction',
		desc: 'The total resistance reduction for the element of the attack, e.g. Superconduct and Viridescent Venerer',
		prop: 'resistanceReduction',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.Enemy,
		groups:  DamageGroups.General | DamageGroups.Reaction,
		icon: <StatIcon base="shield" mask="enemySmall" indicator="decrease" />
	}
];

export const attrStats = stats.filter(stat => stat.usesAttrs);

export default stats;