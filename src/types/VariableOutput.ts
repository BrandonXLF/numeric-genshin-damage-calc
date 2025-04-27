import RecordEntry from "./RecordEntry";

export type EquationOutput = {
	value: number;
	label: RecordEntry[];
	annotated: RecordEntry[];
	children: Record<string, EquationOutput>;
	fullRawExpr: string;
}

type VariableOutput = {
	value: number;
	label: RecordEntry[];
} | EquationOutput;

export default VariableOutput;