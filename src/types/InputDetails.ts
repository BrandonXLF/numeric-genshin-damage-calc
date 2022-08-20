import StatValue from "../utils/StatValue";
import { EnemyData, CharacterData } from "./StatData";

type InputDetails = {
	damageType: number;
	characterData: CharacterData,
	enemyData: EnemyData
};

export type StoredInputDetails = {
	damageType?: number;
	characterData?: {
		[prop: string]: number | StatValue;
	},
	enemyData?: {
		[prop: string]: number | StatValue;
	},
};

export default InputDetails;