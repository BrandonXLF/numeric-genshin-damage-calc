import attributes from "../utils/attributes";
import elements from "../utils/elements";
import DamageGroup from "./DamageGroups";
import DisplayedProp from "./DisplayedProp";
import StatData from "./StatData";
import { StatSection } from "./StatSectionDefinition";

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
	type: StatType;
	section: StatSection;
	groups?: DamageGroup;
	/**
	 * True if the stat is a series of multipliers that are multiplied with in-game attributes (ATK etc.)
	*/
	usesAttrs?: boolean;
	icon: React.ReactNode;
};

export enum StatType {
	Number,
	Percent
}

export default Stat;