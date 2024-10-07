import Attack from "../types/Attack";
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
	column: Column
} | {
	type: 'remove',
	column: Column
} | {
	type: 'load',
	column: Column
} | {
	type: 'unload',
	column: Column
} | {
	type: 'import',
	build: ImportedCharacter,
	element: typeof elements[number] | ''
} | {
	type: 'setActiveAttack',
	column: Column,
	attack: Attack
} | {
	type: 'addAttackFromBase',
	column: Column,
	attack: Attack
} | {
	type: 'removeAttack',
	column: Column,
	attack: Attack
} | {
	type: 'modifyAttack',
	column: Column,
	attack: Attack,
	modifier: (column: Attack) => void
} | {
	type: 'modifyAttacks',
	column: Column,
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
			state.shown = state.shown.clone().duplicate(action.column);
			break;
		case 'remove':
			state.shown = state.shown.clone().remove(action.column, true);
			break;
		case 'load':
			state.shown = state.shown.clone().add(action.column);
			state.closed = state.closed.clone().remove(action.column);
			break;
		case 'unload':
			state.closed = state.closed.clone().add(action.column);
			state.shown = state.shown.clone().remove(action.column, true);
			break;
		case 'import':
			state.shown = state.shown.clone().import(action.build, action.element);
			break;
		case 'addAttackFromBase':
			state.shown = state.shown.clone().addAttackFromBase(action.column, action.attack);
			break;
		case 'removeAttack':
			state.shown = state.shown.clone().removeAttack(action.column, action.attack);
			break;
		case 'setActiveAttack':
			state.shown = state.shown.clone().setActiveAttack(action.column, action.attack);
			break;
		case 'modifyAttack':
			state.shown = state.shown.clone().transformAttack(action.column, action.attack, action.modifier);
			break;
		case 'modifyAttacks':
			state.shown = state.shown.clone().transformAttacks(action.column, action.modifier);
	}

	return state;
}