import ImportedCharacter from "../types/ImportedCharacter";
import Attack from "../utils/Attack";
import Column from "./Column";
import { StatType } from "../types/Stat";
import elements from "./elements";
import stats from "./stats";
import PartialAttack from "../types/PartialAttack";
import ColumnCopyMode from "../types/ColumnCopyMode";

export default class ColumnList {
	constructor(public readonly columns: Column[]) {}

	private get cleanLength() {
        let cleanLength = this.columns.length;

        while (cleanLength > 0 && this.columns[cleanLength - 1].unmodified) {
            cleanLength--;
        }

		return cleanLength;
	}

    /**
     * Remove unmodified columns at the end of the columns array.
     */
    private clean() {
        this.columns.splice(this.cleanLength);
    }

    /**
     * Return a slice of the columns array without unmodified columns at the end.
     */
	get cleanedColumns() {
		return this.columns.slice(0, this.cleanLength);
	}

    /**
     * Clean and add items to the column array.
     * To add an empty column, use {@link addEmpty}.
     */
	add(...columns: Column[]) {
        this.clean();
		this.columns.push(...columns);

		return this;
    }

    addEmpty() {
        this.columns.push(new Column());
		return this;
    }

    duplicate(colId: number) {
        const index = this.columns.findIndex(col => col.id === colId);
        if (index === -1) return this;
        const column = this.columns[index];

        this.columns.splice(index + 1, 0, new Column(column.attacks));

		return this;
    }
    
    import(build: ImportedCharacter, element: typeof elements[number] | '') {
        const base: PartialAttack = {
            label: build.name,
            statData: {}
        };

        if (!element) {
            element = build.element;
        }

        stats.forEach(stat => {
            if (!('map' in stat)) return;

            let numVal: number | undefined;

            if (stat.map === 'char') {
                numVal = +build.propMap[stat.mapNumber].val;
            } else {
                let key = typeof stat.mapNumber === 'object'
                    ? stat.mapNumber[element]
                    : stat.mapNumber;

                numVal = build.fightPropMap[key];
            }

            if (numVal === undefined) return;

            if (stat.type === StatType.Percent) numVal *= 100;
            numVal = Math.round(numVal * 100) / 100;

            base.statData![stat.prop] = numVal.toString();
        });

		return this.add(new Column([base]));
    }

    remove(colId: number, keepOne = false) {
        const removeIndex = this.columns.findIndex(col => col.id === colId);
        if (removeIndex === -1) return [this, undefined] as const;
        const columns = this.columns[removeIndex];

		this.columns.splice(removeIndex, 1);

        if (keepOne && !this.columns.length)
			this.columns.push(new Column());

		return [this, columns] as const;
    }

    transfer(colId: number, to: ColumnList, keepOne = false) {
        const [, removed] = this.remove(colId, keepOne);
        if (!removed) return this;
        
        to.add(removed);
        return this;
    }

    /**
     * Copy the given column and add attack based on the given based to it.
    */
    addAttackFromBase(colId: number, base: PartialAttack) {
        const colIndex = this.columns.findIndex(col => col.id === colId);
        if (colIndex === -1) return this;
        const oldColumn = this.columns[colIndex];
        const newColumn = new Column(oldColumn, ColumnCopyMode.CopyAttacks);
		
        newColumn.addAttack(base);
		this.columns[colIndex] = newColumn;

        return this;
    }

    /**
     * Copy the given column and remove the provided attack from it.
    */
    removeAttack(colId: number, atkId: number) {
        const colIndex = this.columns.findIndex(col => col.id === colId);
        if (colIndex === -1) return this;
        const oldColumn = this.columns[colIndex];
        const newColumn = new Column(oldColumn, ColumnCopyMode.CopyAttacks);
		
		newColumn.removeAttack(atkId);
		this.columns[colIndex] = newColumn;

        return this;
    }

    /**
     * Copy the given column and set the its active attack to `atkId`.
    */
	setActiveAttack(colId: number, atkId: number) {
        const colIndex = this.columns.findIndex(col => col.id === colId);
        if (colIndex === -1) return this;
        const oldColumn = this.columns[colIndex];
        const newColumn = new Column(oldColumn, ColumnCopyMode.CopyAttacks);
		
		newColumn.setActiveAttack(atkId);
		this.columns[colIndex] = newColumn;

        return this;
	}

    /**
     * Duplicate the provided column and and run a modifier on it.
     */
	transformAttack(colId: number, atkId: number, modifier: (attack: Attack) => void) {
        const colIndex = this.columns.findIndex(col => col.id === colId);
        if (colIndex === -1) return this;
        const oldColumn = this.columns[colIndex];
        const newColumn = new Column(oldColumn, ColumnCopyMode.CopyAttacks);

        const atkIndex = newColumn.attacks.findIndex(col => col.id === atkId);
        if (atkIndex === -1) return this;
        const attack = new Attack(newColumn.attacks[atkIndex], true);
		
        modifier(attack);
        
        newColumn.attacks[atkIndex] = attack;
		this.columns[colIndex] = newColumn;

        return this;
	}

    /**
     * Duplicate the provided column and all attacks and run a modifier on them.
     */
	transformAttacks(colId: number, modifier: (attack: Attack[]) => void) {
        const colIndex = this.columns.findIndex(col => col.id === colId);
        if (colIndex === -1) return this;
        const oldColumn = this.columns[colIndex];
        const newColumn = new Column(oldColumn, ColumnCopyMode.CopyDataAndId);

		modifier(newColumn.attacks);
		
        this.columns[colIndex] = newColumn;

        return this;
	}

	clone() {
		return new ColumnList([...this.columns]);
	}
}