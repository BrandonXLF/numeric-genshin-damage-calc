type StatSectionDefinition = {
	name: string;
	sub?: boolean;
	value: StatSection;
};

export const enum StatSection {
	Character,
	CharacterBase,
	CharacterStats,
	Enemy
};

export default StatSectionDefinition;