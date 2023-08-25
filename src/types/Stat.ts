import attributes from "../utils/attributes";
import elements from "../utils/elements";
import DamageGroups from "./DamageGroups";
import DisplayedProp from "./DisplayedProp";
import StatData from "./StatData";
import { StatSections } from "./StatSection";

type MapInfo =
	| {
		map: 'char';
		mapNumber: number;
	}
	| {
		map: 'fight';
		mapNumber: number | Record<typeof elements[number], number>;
	};

type Stat = DisplayedProp<StatData> & (MapInfo | {}) & {
	attr?: typeof attributes[number];
	default: number;
	type: StatTypes;
	section: StatSections;
	groups?: DamageGroups;
	/**
	 * True if the stat is a series of multipliers that are multiplied with in-game attributes (ATK etc.)
	*/
	usesAttrs?: boolean;
	icon: React.ReactNode;
};

export enum StatTypes {
	Number,
	Percent
}

export default Stat;