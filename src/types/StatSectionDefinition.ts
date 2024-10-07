type StatSectionDefinition = {
	name: string;
	sub?: boolean;
	value: StatSection;
};

export enum StatSection {
	Character,
	CharacterTalent,
	CharacterStats,
	Enemy
};

export default StatSectionDefinition;