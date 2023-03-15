import { EquationOutput } from "../types/VariableOutput";
import '../less/EquationLine.less';

export default function EquationLine(props: {
	equation: EquationOutput
}) {
	return <div className="calc">
		{props.equation.equation.map((entry, i) =>
			<span key={i} className={`calc-${entry.type}`}>{entry.value}</span>
		)}
		{Object.entries(props.equation.children).map(([key, row]) =>
			<EquationLine key={key} equation={row} />
		)}
	</div>
}