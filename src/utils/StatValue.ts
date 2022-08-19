import { StatTypes } from "../types/Stat";

export default class StatValue {
	constructor(
		public number: number,
		private type: StatTypes
	) {}

	get value() {
		return this.type === StatTypes.Percent ? this.number / 100 : this.number;
	}
	
	toJSON() {
		return this.number;
	}
}