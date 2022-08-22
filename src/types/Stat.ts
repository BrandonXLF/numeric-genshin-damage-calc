import { ReactElement } from "react";
import DamageGroup from "./DamageGroup";
import StatData from "./StatData";

type Stat = {
	name: string;
	label?: ReactElement;
	desc?: string | ReactElement;
	attr: keyof StatData;
	default: number;
	type: StatTypes;
	section: StatSections;
	groups: DamageGroup;
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