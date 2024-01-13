import CalculationPopup from "./CalculationPopup";
import DifferenceOutput from "./DifferenceOutput";
import Damage from "../types/Damage";
import '../less/DamageOutput.less';

export default function DamageOutput(props: Readonly<{
	damages: Damage[];
	current: number;
	prop: keyof Damage;
	value:  number;
	initial?: number;
}>) {
	return <div className="damage-output">
		<CalculationPopup damages={props.damages} current={props.current} prop={props.prop} />
		{' '}
		<output>{Math.round(props.value * 100) / 100}</output>
		{' '}
		<DifferenceOutput initial={props.initial} value={props.value} />
	</div>
}