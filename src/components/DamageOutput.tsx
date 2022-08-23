import RecordEntry from "../types/RecordEntry";
import '../css/DamageOutput.css';
import CalculationPopup from "./CalculationPopup";
import DifferenceOutput from "./DifferenceOutput";

export default function DamageOutput(props: {
	value: number;
	initial?: number;
	calcs?: Record<string, RecordEntry[]>;
}) {
	return <>
		<div className="mini-col">{props.calcs && <> <CalculationPopup calcs={props.calcs} /></>}</div>
		<div className="output">
			<output>{parseFloat(props.value.toFixed(2)).toString()}</output>
			{props.initial && <> <DifferenceOutput initial={props.initial} value={props.value} /></>}
		</div>
	</>
}