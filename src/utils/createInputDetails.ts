import InputDetails, { StoredInputDetails } from "../types/InputDetails";
import StatData from "../types/StatData";
import stats from "./stats";
import StatValue from "./StatValue";

export default function createInputDetails(base?: StoredInputDetails): InputDetails {
	if (!base) {
		base = {
			reaction: undefined,
			reactionType: undefined,
			statData: {}
		};
	}

	let out: InputDetails = {
		reaction: base?.reaction ?? 0,
		reactionType: base?.reactionType ?? 0,
		statData: {} as StatData
	};
	
	stats.forEach(stat => {
		let value = base?.statData?.[stat.attr];
		
		out.statData[stat.attr] = new StatValue(
			typeof value === 'string' ? value : value?.number ?? stat.default.toString(),
			stat.type
		);
	});
	
	return out;
}