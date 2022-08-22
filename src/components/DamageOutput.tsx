import RecordEntry from "../types/RecordEntry";
import '../css/DamageOutput.css';
import CalculationPopup from "./CalculationPopup";

export default function DamageOutput(props: {
	value: number;
	calcs?: Record<string, RecordEntry[]>;
}) {
	return <div className="output">
		<output style={{verticalAlign: 'middle'}}>{parseFloat(props.value.toFixed(2)).toString()}</output>
		{props.calcs && <> <CalculationPopup calcs={props.calcs} /></>}
	</div>;
}