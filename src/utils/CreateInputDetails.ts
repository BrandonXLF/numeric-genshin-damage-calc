import InputDetails from "../types/InputDetails";
import { EnemyData, CharacterData } from "../types/StatData";
import Stats from "./Stats";
import StatValue from "./StatValue";

export default function createInputDetails(base?: InputDetails): InputDetails {
	if (base) {
		return {
			damageType: base.damageType,
			characterData: {...base.characterData},
			enemyData: {...base.enemyData}
		};
	}

	let out = {
		damageType: 0,
		characterData: {} as CharacterData,
		enemyData: {} as EnemyData
	};
	
	Stats.characterStats.forEach(stat => {
		out.characterData[stat.attr] = new StatValue(stat.default, stat.type);
	});
	
	Stats.enemyStats.forEach(stat => {
		out.enemyData[stat.attr] = new StatValue(stat.default, stat.type);
	});
	
	return out;
}