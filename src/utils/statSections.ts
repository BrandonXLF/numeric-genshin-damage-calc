import StatSection, { StatSections } from "../types/StatSection";

const statSections: StatSection[] = [
	{
		name: 'Character',
		value: StatSections.Character
	},
	{
		name: 'Talent',
		sub: true,
		value: StatSections.CharacterTalent
	},
	{
		name: 'Stats',
		sub: true,
		value: StatSections.CharacterStats
	},
	{
		name: 'Enemy',
		value: StatSections.Enemy
	}
];

export default statSections;