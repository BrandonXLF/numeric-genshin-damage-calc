import DamageGroups from "../types/DamageGroups";
import Stat, { StatTypes } from "../types/Stat";
import { StatSections } from "../types/StatSection";
import StatIcon from "../components/StatIcon";

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
		name: 'ATK/HP/DEF Multiplier',
		desc: 'The percent multiplier of the talent that scales with ATK/HP/DEF',
		prop: 'talent',
		default: 100,
		type: StatTypes.Percent,
		section: StatSections.CharacterTalent,
		groups: DamageGroups.General,
		icon: <StatIcon base="stats" indicator="percent" />
	},
	{
		name: 'EM Multiplier',
		desc: 'THe percent multiplier of the talent that scales with EM if applicable',
		prop: 'talentEM',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.CharacterTalent,
		groups: DamageGroups.General,
		icon: <StatIcon base="em" indicator="percent" />
	},
	{
		name: 'Talent DMG Multiplier',
		desc: 'Multiplier that applies to the talent multipliers, increased by Xingqui\'s C4 and Yoimiya\'s skill for example',
		prop: 'baseDamageMultiplier',
		default: 100,
		type: StatTypes.Percent,
		section: StatSections.CharacterTalent,
		groups: DamageGroups.General,
		icon: <StatIcon base="percent" indicator="percent" />
	},
	{
		name: 'Flat DMG Increase',
		desc: 'Flat damage increases that are added to the talent damage, e.g. Yunjin\'s skill, Zhongli\'s A4, and Kokomi\'s burst',
		prop: 'flatDamage',
		default: 0,
		type: StatTypes.Number,
		section: StatSections.CharacterTalent,
		groups: DamageGroups.General,
		icon: <StatIcon base="damage" indicator="increase" />
	},
	{
		name: 'Base ATK/HP/DEF',
		desc: 'The stat the talent scales off of, e.g. base ATK or base HP, from character and weapon flat stat only',
		prop: 'baseTalentScale',
		default: 500,
		type: StatTypes.Number,
		section: StatSections.CharacterStats,
		groups: DamageGroups.General,
		icon: <StatIcon base="stats" />
	},
	{
		name: 'Bonus ATK/HP/DEF',
		desc: 'The green number next to the stat the talent scales off of, includes in-game ATK percent etc., add extra flat ATK etc. like from Bennett\'s ult here',
		prop: 'bonusTalentScale',
		default: 500,
		type: StatTypes.Number,
		section: StatSections.CharacterStats,
		groups: DamageGroups.General,
		icon: <StatIcon base="stats" indicator="increase" />
	},
	{
		name: 'Extra ATK/HP/DEF%',
		desc: 'Extra ATK percent, HP percent, etc., in-game ATK percent etc. is integrated into Bonus ATK/HP/DEF',
		prop: 'additionalBonusTalentScale',
		default: 0,
		type: StatTypes.Percent,
		section: StatSections.CharacterStats,
		groups: DamageGroups.General,
		icon: <StatIcon base="stats" indicator="increase" />
	},
	{
		name: 'Elemental Mastery',
		desc: 'Used to calculate damage caused by Talent EM Multiplier and the Reaction Bonus, not needed otherwise',
		prop: 'em',
		default: 0,
		type: StatTypes.Number,
		section: StatSections.CharacterStats,
		groups: DamageGroups.General | DamageGroups.Reaction,
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
		// icon: <EnemyShredIcon />
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
		desc: <span>The resistance the enemy has for the element of the attack before any reductions, see <a href="https://genshin-impact.fandom.com/wiki/Resistance#Enemy_Resistances">the wiki</a></span>,
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

export default stats;