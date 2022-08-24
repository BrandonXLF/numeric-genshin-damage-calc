import StatValue from "../utils/StatValue";
import StatData from "./StatData";

type InputDetails = {
	damageType: number;
	statData: StatData;
};

export type StoredInputDetails = {
	damageType?: number;
	statData?: {
		[P in keyof StatData]?: string | StatValue;
	}
};

export default InputDetails;