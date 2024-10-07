import Stat, { StatType } from "../types/Stat";
import FormInput from "./FormInput";
import MathIndicator from "./MathIndicator";
import SelectOption from '../types/SelectOption';

export default function StatInput(props: Readonly<{
	stat: Stat;
	value: string;
	onChange: (val: string) => void;
	disabled?: boolean;
	unit?: string;
	unitOptions?: SelectOption[];
	onUnitChange?: (val: string) => void;
}>) {
	const percent = props.stat.type === StatType.Percent;
	
	return <FormInput
		value={props.value}
		onChange={props.onChange}
		disabled={props.disabled}
		expandIcon={<MathIndicator />}
		backIcon={percent && <div>%</div>}
		expandIconLabel="Equation, Click to Expand"
		backIconLabel="Percent"
		unit={props.unit}
		unitOptions={props.unitOptions}
		onUnitChange={props.onUnitChange}
	/>;
}