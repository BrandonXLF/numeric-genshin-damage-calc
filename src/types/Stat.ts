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
	dependents?: Partial<Record<DamageGroups, (keyof StatData)[]>>;
	icon: ReactElement;
	/**
	 * True if the stat is a series of multipliers that are multiplied with in-game attributes (ATK etc.)
	*/
	attrs?: boolean;
};

export enum StatTypes {
	Number,
	Percent
}

export default Stat;