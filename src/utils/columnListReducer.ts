import Attack from "../types/Attack";
import ImportedCharacter from "../types/ImportedCharacter";
import Column from "./Column";
import ColumnListUtils from "./ColumnListUtils";
import elements from "./elements";

export interface ColumnState {
	shown: Column[];
	closed: Column[];
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
	type: 'addAttack',
	column: Column,
	attack: Attack
} | {
	type: 'removeAttack',
	column: Column,
	attack: Attack
} | {
	type: 'modify',
	column: Column,
	modifier: (column: Column) => void
};

export default function columnListReducer(oldState: ColumnState, action: ColumnStateAction) {
	const state = {...oldState};

	switch (action.type) {
		case 'add':
			state.shown = ColumnListUtils.transfer(state.shown, ...action.columns);
			break;
		case 'addEmpty':
			state.shown = ColumnListUtils.add(state.shown);
			break;
		case 'duplicate':
			state.shown =  ColumnListUtils.duplicate(state.shown, action.column);
			break;
		case 'remove':
			state.shown =  ColumnListUtils.remove(state.shown, action.column, true);
			break;
		case 'load':
			state.shown = ColumnListUtils.transfer(state.shown, action.column);
			state.closed =  ColumnListUtils.remove(state.closed, action.column);
			break;
		case 'unload':
			state.closed = ColumnListUtils.transfer(state.closed, action.column);
			state.shown =  ColumnListUtils.remove(state.shown, action.column, true);
			break;
		case 'import':
			state.shown = ColumnListUtils.import(state.shown, action.build, action.element);
			break;
		case 'addAttack':
			state.shown = ColumnListUtils.addAttack(state.shown, action.column, action.attack);
			break;
		case 'removeAttack':
			state.shown = ColumnListUtils.removeAttack(state.shown, action.column, action.attack);
			break;
		case 'setActiveAttack':
			state.shown = ColumnListUtils.setActiveAttack(state.shown, action.column, action.attack);
			break;
		case 'modify':
			state.shown = ColumnListUtils.modify(state.shown, action.column, action.modifier);
	}

	return state;
}