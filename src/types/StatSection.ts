type StatSection = {
	name: string;
	value: StatSections;
};

export enum StatSections {
	Character,
	Enemy
};

export default StatSection;