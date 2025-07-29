import Stat, { StatType } from "../types/Stat";
import FormInput from "./FormInput";
import MathIndicator from "./MathIndicator";
import SelectOption from '../types/SelectOption';

const backIcons: Partial<Record<StatType, React.ReactNode>> = {
	[StatType.Percent]: <div>%</div>,
	[StatType.Seconds]: <div>secs</div>
};

const backIconLabels: Partial<Record<StatType, string>> = {
	[StatType.Percent]: 'Percent',
	[StatType.Seconds]: 'Seconds'
};	

export default function StatInput(props: Readonly<{
	stat: Stat;
	value: string;
	onChange: (val: string) => void;
	disabled?: boolean;
	unit?: string;
	unitOptions?: SelectOption[];
	onUnitChange?: (val: string) => void;
}>) {
	return <FormInput
		value={props.value}
		onChange={props.onChange}
		disabled={props.disabled}
		expandIcon={<MathIndicator />}
		backIcon={backIcons[props.stat.type]}
		expandIconLabel="Equation, Click to Expand"
		backIconLabel={backIconLabels[props.stat.type]}
		unit={props.unit}
		unitOptions={props.unitOptions}
		onUnitChange={props.onUnitChange}
	/>;
}