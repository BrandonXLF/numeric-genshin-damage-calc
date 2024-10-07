import ColumnState from "../types/ColumnState";
import { StoredAttack } from "../types/PartialAttack";
import Column from "./Column";
import ColumnList from "./ColumnList";

export default class ColumnStorage {
	static load(): ColumnState {
        const storedAttacks = (JSON.parse(localStorage.getItem('GIDC-data') ?? '[]') as StoredAttack[]);

        const shownMap = new Map<string | number, StoredAttack[]>();
		const closedMap = new Map<string | number, StoredAttack[]>();

        storedAttacks.forEach((storedAttack, i) => {
			// Support saved configs before groups where added
			const group = storedAttack.group ?? `SG_${i}`;
			const map = storedAttack.shown !== false ? shownMap : closedMap;

			if (!map.has(group))
				map.set(group, []);

			map.get(group)!.push(storedAttack);
        });
		
		const shownGroups = [...shownMap.values()];
		const closedGroups = [...closedMap.values()];

		if (!shownGroups.length)
			shownGroups.push([{}]);

		const shown = new ColumnList(shownGroups.map(group => new Column(group)));
		const closed = new ColumnList(closedGroups.map(group => new Column(group)))

		return {
			shown,
			closed
		};
    }

	static save({shown, closed}: ColumnState) {
		localStorage.setItem('GIDC-data', JSON.stringify([
			...ColumnStorage.encodeForStorage(shown, true),
            ...ColumnStorage.encodeForStorage(closed, false)
		]));
	}

    private static encodeForStorage(columnList: ColumnList, shown: boolean): StoredAttack[] {
        const itemLists = columnList.cleanedColumns.map(column => column.attacks);

        const processedItemLists = itemLists.map((items, itemsIndex) => items.map((attack, atkIndex) => {
            const storedAttack = attack.toObject();

            if (items.length > 1)
                storedAttack.group = itemsIndex;

            if (atkIndex === 0) {
                storedAttack.shown = shown;
            } else {
                delete storedAttack.label;
                delete storedAttack.synced;
            }

            return storedAttack;
        }));

        return processedItemLists.flat();
    }
}