import StatValue from "../utils/StatValue";
import StatData from "./StatData";

type Attack = {
	reactionType: number;
	reaction: number;
	label: string;
	statData: StatData;
	unmodified: boolean;
};

export type StoredAttack = {
	reactionType?: number;
	reaction?: number;
	label?: string;
	shown?: boolean;
	group?: number;
	statData?: Partial<Record<keyof StatData, StatValue | string>>;
	unmodified?: boolean;
};

export default Attack;