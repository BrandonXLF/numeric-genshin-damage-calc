import StatSectionDefinition, { StatSection } from "../types/StatSectionDefinition";

const statSections: StatSectionDefinition[] = [
	{
		name: 'Character',
		value: StatSection.Character
	},
	{
		name: 'Talent',
		sub: true,
		value: StatSection.CharacterTalent
	},
	{
		name: 'Stats',
		sub: true,
		value: StatSection.CharacterStats
	},
	{
		name: 'Enemy',
		value: StatSection.Enemy
	}
];

export default statSections;