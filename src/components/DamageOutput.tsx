import CalculationPopup from "./CalculationPopup";
import DifferenceOutput from "./DifferenceOutput";
import Damage from "../types/Damage";
import '../less/DamageOutput.less';
import displayDamage from "../utils/displayDamage";
import Column from "../utils/Column";

export default function DamageOutput(props: Readonly<{
	column: Column;
	prop: keyof Damage;
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