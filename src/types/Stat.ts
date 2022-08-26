import { ReactElement } from "react";
import DamageGroups from "./DamageGroups";
import StatData from "./StatData";

type Stat = {
	name: string;
	desc?: string | ReactElement;
	attr: keyof StatData;
	default: number;
	type: StatTypes;
	section: StatSections;
	groups: DamageGroups;
};

export enum StatTypes {
	Number,
	Percent
}

export enum StatSections {
	Character,
	Enemy
}

export default Stat;