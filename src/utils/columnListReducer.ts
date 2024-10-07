import Attack from "./Attack";
import ImportedCharacter from "../types/ImportedCharacter";
import Column from "./Column";
import ColumnList from "./ColumnList";
import elements from "./elements";

export interface ColumnState {
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

export default function columnListReducer(oldState: ColumnState, action: ColumnStateAction) {
	const state = {...oldState};

	switch (action.type) {
		case 'add':
			state.shown = state.shown.clone().add(...action.columns);
			break;
		case 'addEmpty':
			state.shown = state.shown.clone().addEmpty();
			break;
		case 'duplicate':
			state.shown = state.shown.clone().duplicate(action.colId);
			break;
		case 'remove':
			[state.shown,] = state.shown.clone().remove(action.colId, true);
			break;
		case 'load':
			state.shown = state.shown.clone();
			state.closed = state.closed.clone().transfer(action.colId, state.shown);
			break;
		case 'unload':
			state.closed = state.closed.clone();
			state.shown = state.shown.clone().transfer(action.colId, state.closed, true);
			break;
		case 'import':
			state.shown = state.shown.clone().import(action.build, action.element);
			break;
		case 'addAttackFromBase':
			state.shown = state.shown.clone().addAttackFromBase(action.colId, action.attack);
			break;
		case 'removeAttack':
			state.shown = state.shown.clone().removeAttack(action.colId, action.atkId);
			break;
		case 'setActiveAttack':
			state.shown = state.shown.clone().setActiveAttack(action.colId, action.atkId);
			break;
		case 'modifyAttack':
			state.shown = state.shown.clone().transformAttack(action.colId, action.atkId, action.modifier);
			break;
		case 'modifyAttacks':
			state.shown = state.shown.clone().transformAttacks(action.colId, action.modifier);
	}

	return state;
}