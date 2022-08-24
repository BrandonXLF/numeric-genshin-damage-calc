import { StatTypes } from "../types/Stat";
import evaluateExpression from "./evalulateExpression";

export default class StatValue {
	constructor(
		public number: string,
		private type: StatTypes
	) {}

	get value() {
		let value = evaluateExpression(this.number);
		
		return this.type === StatTypes.Percent ? value / 100 : value;
	}
	
	toJSON() {
		return this.number;
	}
}