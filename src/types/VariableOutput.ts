import RecordEntry from "./RecordEntry";

export type EquationOutput = {
	value: number;
	label: RecordEntry[];
	equation: RecordEntry[];
	children: Record<string, EquationOutput>;
}

type VariableOutput = {
	value: number;
	label: RecordEntry[];
} | EquationOutput;

export default VariableOutput;