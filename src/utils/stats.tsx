import DamageGroup from "../types/DamageGroups";
import Stat, { StatType } from "../types/Stat";
import { StatSection } from "../types/StatSectionDefinition";
import StatIcon from "../svgs/StatIcon";

const stats: Stat[] = [
	{
		name: 'Character Level',
		prop: 'characterLevel',
		default: 1,
		type: StatType.Number,
		section: StatSection.Character,
		groups: DamageGroup.Level | DamageGroup.BonusAndDef,
		icon: <StatIcon base="character" />,
		map: 'char',
		mapNumber: 4001
	},
	{
		name: 'Talent DMG',
		desc: 'The percent multiplier of the talent that scales with the selected stat',
		prop: 'talent',
		usesAttrs: true,
		default: 100,
		type: StatType.Percent,
		section: StatSection.CharacterTalent,
		groups: DamageGroup.Talent,
		icon: <StatIcon base="percent" />
	},
	{
		name: 'Base Multiplier',
		desc: 'Multiplier that applies to the base/talent multipliers, increased by Xingqui\'s C4, Yoimiya\'s skill, and Ineffa\'s passive for example',
		prop: 'baseDamageMultiplier',
		default: 100,
		type: StatType.Percent,
		section: StatSection.CharacterTalent,
		groups: DamageGroup.All,
		icon: <StatIcon base="percent" indicator="percent" />
	},
	{
		name: 'Talent DMG Bonus',
		desc: 'Damage increases that are added to the talent damage by other talents, e.g. Zhongli\'s A4, and Kokomi\'s burst',
		prop: 'talentDamageBonus',
		usesAttrs: true,
		default: 0,
		type: StatType.Percent,
		section: StatSection.CharacterTalent,
		groups: DamageGroup.Talent,
		icon: <StatIcon base="damage" indicator="increase" />
	},
	{
		name: 'Flat DMG Bonus',
		desc: 'Flat damage increases that are added to the talent damage, e.g. Yunjin\'s skill',
		prop: 'flatDamage',
		default: 0,
		type: StatType.Number,
		section: StatSection.CharacterTalent,
		groups: DamageGroup.Talent,
		icon: <StatIcon base="damage" indicator="increase" />
	},
	{
		name: 'Base ATK',
		desc: 'ATK from character and weapon flat stat only',
		prop: 'baseTalentScale',
		attr: 'ATK',
		default: 500,
		type: StatType.Number,
		section: StatSection.CharacterStats,
		icon: <StatIcon base="damage" />,
		map: 'fight',
		mapNumber: 4
	},
	{
		name: 'Bonus ATK',
		desc: 'The green number next to the base ATK, includes in-game ATK percent, add extra flat ATK, like from Bennett\'s ult, here',
		prop: 'bonusTalentScale',
		attr: 'ATK',
		default: 500,
		type: StatType.Number,
		section: StatSection.CharacterStats,
		icon: <StatIcon base="damage" indicator="increase" />,
		map: 'fight',
		mapNumber: 5
	},
	{
		name: 'Extra ATK %',
		desc: 'Extra ATK percent, in-game ATK percent is integrated into Bonus ATK',
		prop: 'additionalBonusTalentScale',
		attr: 'ATK',
		default: 0,
		type: StatType.Percent,
		section: StatSection.CharacterStats,
		icon: <StatIcon base="damage" indicator="increase" />,
		map: 'fight',
		mapNumber: 6
	},
	{
		name: 'Base DEF',
		desc: 'DEF from character base stat only',
		prop: 'baseDEF',
		attr: 'DEF',
		default: 500,
		type: StatType.Number,
		section: StatSection.CharacterStats,
		icon: <StatIcon base="def" />,
		map: 'fight',
		mapNumber: 7
	},
	{
		name: 'Bonus DEF',
		desc: 'The green number next to the base DEF, includes in-game DEF percent, add extra flat DEF, like from Gorou\'s skill, here',
		prop: 'bonusDEF',
		attr: 'DEF',
		default: 500,
		type: StatType.Number,
		section: StatSection.CharacterStats,
		icon: <StatIcon base="def" indicator="increase" />,
		map: 'fight',
		mapNumber: 8
	},
	{
		name: 'Extra DEF %',
		desc: 'Extra DEF percent, in-game DEF percent is integrated into Bonus DEF',
		prop: 'additionalBonusDEF',
		attr: 'DEF',
		default: 0,
		type: StatType.Percent,
		section: StatSection.CharacterStats,
		icon: <StatIcon base="def" indicator="increase" />,
		map: 'fight',
		mapNumber: 9
	},
	{
		name: 'Base HP',
		desc: 'HP from character base stat only',
		prop: 'baseHP',
		attr: 'HP',
		default: 500,
		type: StatType.Number,
		section: StatSection.CharacterStats,
		icon: <StatIcon base="hp" />,
		map: 'fight',
		mapNumber: 1
	},
	{
		name: 'Bonus HP',
		desc: 'The green number next to the base DEF, includes in-game DEF percent, add extra flat HP here',
		prop: 'bonusHP',
		attr: 'HP',
		default: 500,
		type: StatType.Number,
		section: StatSection.CharacterStats,
		icon: <StatIcon base="hp" indicator="increase" />,
		map: 'fight',
		mapNumber: 2
	},
	{
		name: 'Extra HP %',
		desc: 'Extra HP percent, in-game HP percent is integrated into Bonus HP',
		prop: 'additionalBonusHP',
		attr: 'HP',
		default: 0,
		type: StatType.Percent,
		section: StatSection.CharacterStats,
		icon: <StatIcon base="hp" indicator="increase" />,
		map: 'fight',
		mapNumber: 3
	},
	{
		name: 'Elemental Mastery',
		desc: 'Used to calculate reaction DMG bonus and talent if applicable',
		prop: 'em',
		attr: 'EM',
		default: 0,
		type: StatType.Number,
		section: StatSection.CharacterStats,
		groups: DamageGroup.Reaction | DamageGroup.SecondaryReaction,
		icon: <StatIcon base="em" />,
		map: 'fight',
		mapNumber: 28
	},
	{
		name: 'DMG Bonus',
		desc: 'All damage bonuses added together, e.g. Goblet of Eonothem\'s main stat and Rust bow\'s passive',
		prop: 'damageBonus',
		default: 0,
		type: StatType.Percent,
		section: StatSection.CharacterStats,
		groups: DamageGroup.BonusAndDef,
		icon: <StatIcon base="damage" indicator="increase" />,
		map: 'fight',
		mapNumber: {
			Physical: 30,
			Pyro: 40,
			Electro: 41,
			Hydro: 42,
			Dendro: 43,
			Anemo: 44,
			Geo: 45,
			Cyro: 46
		}
	},
	{
		name: 'Reaction Bonus',
		desc: 'All reaction damage bonuses added together besides the reaction bonus from EM, e.g. Crimson Witch 4-piece and Nilou\'s 4th ascension passive',
		prop: 'reactionBonus',
		default: 0,
		type: StatType.Percent,
		section: StatSection.CharacterStats,
		groups: DamageGroup.Reaction,
		icon: <StatIcon base="damage" indicator="increase" />
	},
	{
		name: '2nd Rxn Bonus',
		desc: 'All reaction damage bonuses added together besides the reaction bonus from EM for the secondary reaction, e.g. Crimson Witch 4-piece and Nilou\'s 4th ascension passive',
		prop: 'secondaryReactionBonus',
		default: 0,
		type: StatType.Percent,
		section: StatSection.CharacterStats,
		groups: DamageGroup.SecondaryReaction,
		icon: <StatIcon base="damage" indicator="increase" />
	},
	{
		name: 'CRIT Rate',
		prop: 'critRate',
		default: 5,
		type: StatType.Percent,
		section: StatSection.CharacterStats,
		groups: DamageGroup.Crit,
		icon: <StatIcon base="critRate" />,
		map: 'fight',
		mapNumber: 20
	},
	{
		name: 'CRIT DMG',
		prop: 'critDamage',
		default: 50,
		type: StatType.Percent,
		section: StatSection.CharacterStats,
		groups: DamageGroup.Crit,
		icon: <StatIcon base="critDmg" />,
		map: 'fight',
		mapNumber: 22
	},
	{
		name: 'Enemy Level',
		prop: 'enemyLevel',
		default: 1,
		type: StatType.Number,
		section: StatSection.Enemy,
		groups: DamageGroup.BonusAndDef,
		icon: <StatIcon base="enemy" />
	},
	{
		name: 'DEF Decrease',
		desc: 'Defense decreasing effects, e.g. Razor\'s C4 or Klee\'s C2, use the word "decrease"',
		prop: 'defenseDecrease',
		default: 0,
		type: StatType.Percent,
		section: StatSection.Enemy,
		groups: DamageGroup.BonusAndDef,
		icon: <StatIcon base="shield" mask="enemySmall" indicator="decrease" />
	},
	{
		name: 'DEF Ignore',
		desc: 'Defense ignore effects, e.g. Raiden\'s C2 and Yae Miko\'s C6, use the word "ignore"',
		prop: 'defenseIgnore',
		default: 0,
		type: StatType.Percent,
		section: StatSection.Enemy,
		groups: DamageGroup.BonusAndDef,
		icon: <StatIcon base="shield" mask="enemySmall" indicator="decrease" />
	},
	{
		name: 'Base RES',
		desc: <span>The resistance the enemy has for the element of the attack before any reductions, see <a href="https://genshin-impact.fandom.com/wiki/Resistance#Enemy_Resistances" target="genshin-wiki">the wiki</a></span>,
		prop: 'resistance',
		default: 10,
		type: StatType.Percent,
		section: StatSection.Enemy,
		groups: DamageGroup.All,
		icon: <StatIcon base="shield" mask="enemySmall" />
	},
	{
		name: 'RES Decrease',
		desc: 'The total resistance reduction for the element of the attack, e.g. Superconduct and Viridescent Venerer',
		prop: 'resistanceReduction',
		default: 0,
		type: StatType.Percent,
		section: StatSection.Enemy,
		groups:  DamageGroup.All,
		icon: <StatIcon base="shield" mask="enemySmall" indicator="decrease" />,
		map: 'fight',
		mapNumber: {
			Physical: 29,
			Pyro: 50,
			Electro: 51,
			Hydro: 52,
			Dendro: 53,
			Anemo: 54,
			Geo: 55,
			Cyro: 56
		}
	},
	{
		name: 'Bow CA Air Time',
		desc: 'For bow charge attacks, after 0.7 seconds of traveling, every additional 0.05 seconds decreases damage by 10% until 90%',
		prop: 'bowAimedTravelTime',
		default: 0,
		type: StatType.Seconds,
		section: StatSection.Enemy,
		groups: DamageGroup.Talent,
		icon: <StatIcon base="time" />,
	}
];

export const attrStats = stats.filter(stat => stat.usesAttrs);

export default stats;