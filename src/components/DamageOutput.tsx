import CalculationPopup from "./CalculationPopup";
import DifferenceOutput from "./DifferenceOutput";
import { EquationOutput } from "../types/VariableOutput";
import '../less/DamageOutput.less';

export default function DamageOutput(props: {
	equation: EquationOutput;
	initial?: number;
}) {
	return <div className="damage-output">
		<CalculationPopup equation={props.equation} />
		<> </>
		<output>{Math.round(props.equation.value * 1e2) / 1e2}</output>
		<> </>
		<DifferenceOutput initial={props.initial} value={props.equation.value} />
	</div>
}