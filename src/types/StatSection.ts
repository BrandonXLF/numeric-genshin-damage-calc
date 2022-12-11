type StatSection = {
	name: string;
	sub?: boolean;
	value: StatSections;
};

export enum StatSections {
	Character,
	CharacterTalent,
	CharacterStats,
	Enemy
};

export default StatSection;