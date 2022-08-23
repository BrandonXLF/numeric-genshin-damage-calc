import { evaluate } from "mathjs";
import { StatTypes } from "../types/Stat";

export default class StatValue {
	constructor(
		public number: string,
		private type: StatTypes
	) {}

	get value() {
		let value;
		
		try {
			value = evaluate(this.number);
		} catch {
			return NaN;
		}
		
		return this.type === StatTypes.Percent ? value / 100 : value;
	}
	
	toJSON() {
		return this.number;
	}
}