import { ReactElement } from "react";
import DamageGroups from "./DamageGroups";
import StatData from "./StatData";
import { StatSections } from "./StatSection";

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

export default Stat;