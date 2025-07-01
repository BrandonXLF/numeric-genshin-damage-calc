type StatSectionDefinition = {
	name: string;
	sub?: boolean;
	value: StatSection;
};

export const enum StatSection {
	Character,
	CharacterTalent,
	CharacterStats,
	Enemy
};

export default StatSectionDefinition;