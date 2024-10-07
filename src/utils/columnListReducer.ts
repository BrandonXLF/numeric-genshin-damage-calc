import ColumnState, { ColumnStateAction } from "../types/ColumnState";

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