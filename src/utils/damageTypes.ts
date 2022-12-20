import Damage from "../types/Damage";
import DisplayedProp from "../types/DisplayedProp";

const damageTypes: DisplayedProp<Damage>[] = [
	{
		name: "CRIT Hit",
		prop: "crit"
	},
	{
		name: "Non-CRIT Hit",
		prop: "nonCrit"
	},
	{
		name: "Average DMG",
		desc: "The average DMG done between crit and non-crit hits. This exact number will not be done in-game.",
		prop: "avgDmg"
	}
];

export default damageTypes;