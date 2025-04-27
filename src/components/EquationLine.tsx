import { EquationOutput } from "../types/VariableOutput";
import '../less/EquationLine.less';

export default function EquationLine(props: Readonly<{
	equation: EquationOutput
}>) {
	return <div className="calc">
		{props.equation.annotated.map((entry, i) =>
			<span key={i} className={`calc-${entry.type}`}>{entry.value}</span>
		)}
		{Object.entries(props.equation.children).map(([key, row]) =>
			<EquationLine key={key} equation={row} />
		)}
	</div>
}