import CalculationPopup from "./CalculationPopup";
import DifferenceOutput from "./DifferenceOutput";
import Damage from "../types/Damage";
import '../less/DamageOutput.less';
import displayDamage from "../utils/displayDamage";

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
		<output>{displayDamage(props.value)}</output>
		{' '}
		<DifferenceOutput initial={props.initial} value={props.value} />
	</div>
}