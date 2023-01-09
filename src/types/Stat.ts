import { ReactElement } from "react";
import DamageGroups from "./DamageGroups";
import DisplayedProp from "./DisplayedProp";
import StatData from "./StatData";
import { StatSections } from "./StatSection";

type Stat = DisplayedProp<StatData> & {
	default: number;
	type: StatTypes;
	section: StatSections;
	groups: DamageGroups;
	icon: ReactElement;
};

export enum StatTypes {
	Number,
	Percent
}

export default Stat;