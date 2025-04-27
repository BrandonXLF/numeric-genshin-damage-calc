import CalculationPopup from "./CalculationPopup";
import DifferenceOutput from "./DifferenceOutput";
import '../less/DamageOutput.less';
import displayDamage from "../utils/displayDamage";
import Column from "../utils/Column";
import DamageData from "../types/DamageData";

export default function DamageOutput(props: Readonly<{
	column: Column;
	prop: keyof DamageData;
	value:  number;
	error?: boolean;
	initial?: number;
}>) {
	return <div className="damage-output">
		<CalculationPopup column={props.column} prop={props.prop} error={props.error} />
		{' '}
		<output>{props.error ? 'ERROR' : displayDamage(props.value)}</output>
		{' '}
		<DifferenceOutput initial={props.initial} value={props.value} />
	</div>
}