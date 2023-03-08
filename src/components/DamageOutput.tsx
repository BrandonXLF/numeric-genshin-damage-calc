import CalculationPopup from "./CalculationPopup";
import DifferenceOutput from "./DifferenceOutput";
import { EquationRecord } from "../types/VariableOutput";
import '../less/DamageOutput.less';

export default function DamageOutput(props: {
	value: number;
	initial?: number;
	calcs?: EquationRecord;
}) {
	return <div className="damage-output">
		{props.calcs && <><CalculationPopup calcs={props.calcs} /> </>}
		<output>{parseFloat(props.value.toFixed(2)).toString()}</output>
		<> </><DifferenceOutput initial={props.initial} value={props.value} />
	</div>
}