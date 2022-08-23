import RecordEntry from "./RecordEntry";

export type VariableOutput = {
	value: number;
	name: string;
	equations: Record<string, RecordEntry[]>;
};

export type ComponentOutput = {
	value: string;
	equationComponent: RecordEntry[];
	equations: Record<string, RecordEntry[]>;
};

type EquationOutput = {
	value: number;
	equations: Record<string, RecordEntry[]>;
};

export default EquationOutput;