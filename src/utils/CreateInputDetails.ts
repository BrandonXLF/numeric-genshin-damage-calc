import InputDetails, { StoredInputDetails } from "../types/InputDetails";
import { CharacterStat, EnemyStat } from "../types/Stat";
import StatData, { EnemyData, CharacterData } from "../types/StatData";
import Stats from "./Stats";
import StatValue from "./StatValue";

function populateData(data: StatData, baseData: { [prop: string]: number | StatValue; } | undefined, stats: CharacterStat[] | EnemyStat[]) {
	stats.forEach(stat => {
		let value = baseData?.[stat.attr];
		
		data[stat.attr] = new StatValue(
			typeof value === 'number' ? value : value?.number ?? stat.default,
			stat.type
		);
	});
}

export default function createInputDetails(base?: StoredInputDetails): InputDetails {
	if (!base) {
		base = {
			damageType: undefined,
			characterData: {},
			enemyData: {}
		};
	}

	let out: InputDetails = {
		damageType: base?.damageType ?? 0,
		characterData: {} as CharacterData,
		enemyData: {} as EnemyData
	};
	
	populateData(out.characterData, base.characterData, Stats.characterStats);
	populateData(out.enemyData, base.enemyData, Stats.enemyStats);
	
	return out;
}