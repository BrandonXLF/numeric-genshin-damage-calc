import { EquationRecord } from "../types/VariableOutput";
import '../css/EquationLine.css';

export default function EquationLine(props: {
	record: EquationRecord
}) {
	return <div className="calc">
		{props.record.equation.map((entry, i) =>
			<span key={i} className={`calc-${entry.type}`}>{entry.value}</span>
		)}
		{Object.entries(props.record.parameters || {}).map(([key, row]) =>
			<EquationLine key={key} record={row} />
		)}
	</div>
}