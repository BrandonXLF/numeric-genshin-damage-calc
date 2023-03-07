import Stat, { StatTypes } from "../types/Stat";
import FormInput from "./FormInput";
import MathIndicator from "./MathIndicator";
import SelectOption from '../types/SelectOption';

export default function StatInput(props: {
	stat: Stat;
	value: string;
	onChange: (val: string) => void;
	disabled?: boolean;
	unit?: string;
	unitOptions?: SelectOption[];
	onUnitChange?: (val: string) => void;
}) {
	const percent = props.stat.type === StatTypes.Percent;
	
	return <FormInput
		value={props.value}
		onChange={props.onChange}
		disabled={props.disabled}
		frontIcon={!props.disabled && <MathIndicator />}
		backIcon={!props.disabled && percent && <div>%</div>}
		frontIconLabel="Equation"
		backIconLabel="Percent"
		unit={props.unit}
		unitOptions={props.unitOptions}
		onUnitChange={props.onUnitChange}
	/>;
}