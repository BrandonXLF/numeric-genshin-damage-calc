import Attack from "../utils/Attack";
import Column from "../utils/Column";
import ColumnList from "../utils/ColumnList";
import elements from "../utils/elements";
import ImportedCharacter from "./ImportedCharacter";

interface ColumnState {
	shown: ColumnList;
	closed: ColumnList;
}

export type ColumnStateAction = {
	type: 'add',
	columns: Column[]
} | {
	type: 'addEmpty'
} | {
	type: 'duplicate',
	colId: number
} | {
	type: 'remove',
	colId: number
} | {
	type: 'load',
	colId: number
} | {
	type: 'unload',
	colId: number
} | {
	type: 'import',
	build: ImportedCharacter,
	element: typeof elements[number] | ''
} | {
	type: 'setActiveAttack',
	colId: number,
	atkId: number,
} | {
	type: 'addAttackFromBase',
	colId: number,
	attack: Attack,
} | {
	type: 'removeAttack',
	colId: number,
	atkId: number
} | {
	type: 'modifyAttack',
	colId: number,
	atkId: number,
	modifier: (column: Attack) => void
} | {
	type: 'modifyAttacks',
	colId: number,
	modifier: (column: Attack[]) => void
};

export default ColumnState;