import ImportedCharacter from "../types/ImportedCharacter";
import Attack, { PartialAttack } from "../utils/Attack";
import Column from "./Column";
import { StatTypes } from "../types/Stat";
import elements from "./elements";
import stats from "./stats";

export default class ColumnList {
	constructor(public readonly columns: Column[]) {}

	private get cleanLength() {
        let cleanLength = this.columns.length;

        while (cleanLength > 0 && this.columns[cleanLength - 1].unmodified) {
            cleanLength--;
        }

		return cleanLength;
	}

    private clean() {
        this.columns.splice(this.cleanLength);
    }

	get cleanedColumns() {
		return this.columns.slice(0, this.cleanLength);
	}

	add(...columns: Column[]) {
        this.clean();
		this.columns.push(...columns);

		return this;
    }

    addEmpty() {
        this.columns.push(new Column());
		return this;
    }

	addWithAttack(attack: PartialAttack) {
        this.clean();
        this.columns.push(new Column([attack]));

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

            if (stat.type === StatTypes.Percent) numVal *= 100;
            numVal = Math.round(numVal * 100) / 100;

            base.statData![stat.prop] = numVal.toString();
        });

		return this.addWithAttack(base);
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

    transfer(colId: number, target: ColumnList, keepOne = false) {
        const [, removed] = this.remove(colId, keepOne);
        if (!removed) return this;
        
        target.add(removed);
        return this;
    }

    addAttackFromBase(colId: number, attack: PartialAttack) {
        const colIndex = this.columns.findIndex(col => col.id === colId);
        if (colIndex === -1) return this;
        const oldColumn = this.columns[colIndex];
        const newColumn = new Column(oldColumn, 'copyAttacks');
		
        newColumn.addAttackFromBase(attack);
		this.columns[colIndex] = newColumn;

        return this;
    }

    removeAttack(colId: number, atkId: number) {
        const colIndex = this.columns.findIndex(col => col.id === colId);
        if (colIndex === -1) return this;
        const oldColumn = this.columns[colIndex];
        const newColumn = new Column(oldColumn, 'copyAttacks');
		
		newColumn.removeAttack(atkId);
		this.columns[colIndex] = newColumn;

        return this;
    }

	setActiveAttack(colId: number, atkId: number) {
        const colIndex = this.columns.findIndex(col => col.id === colId);
        if (colIndex === -1) return this;
        const oldColumn = this.columns[colIndex];
        const newColumn = new Column(oldColumn, 'copyAttacks');
		
		newColumn.setActiveAttack(atkId);
		this.columns[colIndex] = newColumn;

        return this;
	}

	transformAttack(colId: number, atkId: number, modifier: (attack: Attack) => void) {
        const colIndex = this.columns.findIndex(col => col.id === colId);
        if (colIndex === -1) return this;
        const oldColumn = this.columns[colIndex];
        const newColumn = new Column(oldColumn, 'copyAttacks');

        const atkIndex = newColumn.attacks.findIndex(col => col.id === atkId);
        if (atkIndex === -1) return this;
        const attack = Attack.fromBase(newColumn.attacks[atkIndex], true);
		
        modifier(attack);
        
        newColumn.attacks[atkIndex] = attack;
		this.columns[colIndex] = newColumn;

        return this;
	}

	transformAttacks(colId: number, modifier: (attack: Attack[]) => void) {
        const colIndex = this.columns.findIndex(col => col.id === colId);
        if (colIndex === -1) return this;
        const oldColumn = this.columns[colIndex];
        const newColumn = new Column(oldColumn, 'copyDataAndId');

		modifier(newColumn.attacks);
		
        this.columns[colIndex] = newColumn;

        return this;
	}

	clone() {
		return new ColumnList([...this.columns]);
	}
}