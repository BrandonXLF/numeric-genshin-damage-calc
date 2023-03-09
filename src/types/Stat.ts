import { ReactElement } from "react";
import attributes from "../utils/attributes";
import DamageGroups from "./DamageGroups";
import DisplayedProp from "./DisplayedProp";
import StatData from "./StatData";
import { StatSections } from "./StatSection";

type Stat = DisplayedProp<StatData> & {
	attr?: typeof attributes[keyof typeof attributes];
	default: number;
	type: StatTypes;
	section: StatSections;
	groups?: DamageGroups;
	/**
	 * True if the stat is a series of multipliers that are multiplied with in-game attributes (ATK etc.)
	*/
	usesAttrs?: boolean;
	icon: ReactElement;
};

export enum StatTypes {
	Number,
	Percent
}

export default Stat;