import EquationData from "./EquationData";
import RecordEntry from "./RecordEntry";
import VariableData from "./VariableData";

export type OperationOutput = {
	value: number;
	equation: RecordEntry[];
	prevEquations: Record<string, RecordEntry[]>;
	shouldEnclose?: boolean;
};

export type OperationInput = OperationOutput | number | keyof VariableData | keyof EquationData;

type EquationOutput = {
	value: number;
	equations: Record<string, RecordEntry[]>;
};

export default EquationOutput;