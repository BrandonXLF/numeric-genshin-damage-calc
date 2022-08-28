import RecordEntry from "./RecordEntry";

export type EquationRecord = {
	equation: RecordEntry[];
	parameters?: Record<string, EquationRecord>;
}

export type ComponentOutput = {
	mathComponent: string;
	equationComponent: RecordEntry[];
	record?: EquationRecord;
};

type VariableOutput = {
	value: number;
	name: string;
	record?: EquationRecord;
};

export default VariableOutput;