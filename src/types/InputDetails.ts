import StatValue from "../utils/StatValue";
import StatData from "./StatData";

type InputDetails = {
	reactionType: number;
	reaction: number
	label: string
	statData: StatData;
};

export type StoredInputDetails = {
	reactionType?: number;
	reaction?: number
	label?: string
	shown?: boolean
	statData?: Partial<Record<keyof StatData, StatValue | string>>;
};

export default InputDetails;