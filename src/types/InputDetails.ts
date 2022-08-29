import StatValue from "../utils/StatValue";
import StatData from "./StatData";

type InputDetails = {
	reactionType: number;
	reaction: number
	statData: StatData;
};

export type StoredInputDetails = {
	reactionType?: number;
	reaction?: number
	statData?: {
		[P in keyof StatData]?: string | StatValue;
	}
};

export default InputDetails;