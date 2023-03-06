import InputDetails, { StoredInputDetails } from "../types/InputDetails";
import StatData from "../types/StatData";
import attributes, { getAttrStat } from "./attributes";
import stats from "./stats";
import StatValue from "./StatValue";

export default function createInputDetails(base: StoredInputDetails = {}): InputDetails {
	let out: InputDetails = {
		reaction: base?.reaction ?? 0,
		reactionType: base?.reactionType ?? 0,
		label: base?.label ?? '',
		statData: {} as StatData
	};
	
	stats.forEach(stat => {
		if (stat.attrs) {
			let anyFound = false;
			
			attributes.forEach(attr => {
				const prop = getAttrStat(stat.prop, attr);
				const value = base?.statData?.[prop];
				
				if (!value) return;
			
				out.statData[prop] = new StatValue(typeof value === 'string' ? value : value.number, stat.type);
				anyFound = true;
			});
			
			if (anyFound)
				return;
				
			console.log('F', stat.prop)
		}
		
		const value = base?.statData?.[stat.prop];
		
		out.statData[stat.prop] = new StatValue(
			typeof value === 'string' ? value : value?.number ?? stat.default.toString(),
			stat.type
		);
	});
	
	return out;
}