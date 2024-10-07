import ImportedCharacter from "../types/ImportedCharacter";
import Attack, { StoredAttack } from "../types/Attack";
import Column from "./Column";
import { StatTypes } from "../types/Stat";
import elements from "./elements";
import stats from "./stats";
import StatData from "../types/StatData";
import attributes, { getAttrStat } from "./attributes";
import StatValue from "./StatValue";

export default class ColumnList {
	constructor(public readonly columns: Column[]) {}

    static createAttack(base?: StoredAttack) {
        let out: Attack = {
            reaction: base?.reaction ?? 0,
            reactionType: base?.reactionType ?? 0,
            label: base?.label ?? '',
            statData: {} as StatData,
            synced: base?.synced ?? [],
            unmodified: base === undefined ? true : (base?.unmodified ?? false)
        };
        
        stats.forEach(stat => {
            if (stat.usesAttrs) {
                let anyFound = false;
                
                attributes.forEach(attr => {
                    const prop = getAttrStat(stat.prop, attr);
                    const value = base?.statData?.[prop];
                    
                    if (!value) return;
                
                    out.statData[prop] = new StatValue(typeof value === 'string' ? value : value.number, stat.type);
                    anyFound = true;
                });
                
                if (anyFound)
                    return;
            }
            
            const value = base?.statData?.[stat.prop];
            
            out.statData[stat.prop] = new StatValue(
                typeof value === 'string' ? value : value?.number ?? stat.default.toString(),
                stat.type
            );
        });
        
        return out;
    }

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

	addWithAttack(attack: Attack) {
        this.clean();
        this.columns.push(new Column([attack]));

		return this;
    }

    duplicate(column: Column) {
        const index = this.columns.indexOf(column);
        if (index === -1) return this;

        this.columns.splice(index + 1, 0, new Column(column.attacks));

		return this;
    }
    
    import(build: ImportedCharacter, element: typeof elements[number] | '') {
        const base: StoredAttack = {
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

		return this.addWithAttack(base as Attack);
    }

    remove(column: Column, keepOne = false) {
		const removeIndex = this.columns.findIndex(iteratedColumn => iteratedColumn === column);
        if (removeIndex === -1) return this;

		this.columns.splice(removeIndex, 1);

        if (keepOne && !this.columns.length)
			this.columns.push(new Column());

		return this;
    }

    addAttackFromBase(column: Column, base: Attack) {
        const index = this.columns.indexOf(column);
        if (index === -1) return this;

        const newColumn = new Column(
            [...column.attacks, ColumnList.createAttack(base)],
            column.attacks.length
        );

        this.columns.splice(index, 1, newColumn);

        return this;
    }

    removeAttack(column: Column, attack: Attack) {
        const index = this.columns.indexOf(column);
        if (index === -1) return this;

        const newItems = column.attacks.filter(iteratedAttack => iteratedAttack !== attack);
        const newColumn = new Column(newItems, Math.min(column.activeIndex, newItems.length - 1));

        this.columns.splice(index, 1, newColumn);

        return this;
    }

    setActiveAttack(column: Column, attack: Attack) {
        const colIndex = this.columns.indexOf(column);
        if (colIndex === -1) return this;

        const atkIndex = column.attacks.indexOf(attack);
        if (atkIndex === -1) return this;

        const newColumn = new Column([...column.attacks], atkIndex);

        this.columns.splice(colIndex, 1, newColumn);

        return this;
    }

	transformAttack(column: Column, attack: Attack, modifier: (attack: Attack) => void) {
        const colIndex = this.columns.indexOf(column);
        if (colIndex === -1) return this;
        const oldColumn = this.columns[colIndex];
        const newColumn = new Column(oldColumn.attacks, oldColumn.activeIndex);

        const atkIndex = newColumn.attacks.indexOf(attack);
        if (atkIndex === -1) return this;
        const newAttack = ColumnList.createAttack(newColumn.attacks[atkIndex]);
		
        modifier(newAttack);
        
        newColumn.attacks[atkIndex] = newAttack;
		this.columns[colIndex] = newColumn;

        return this;
	}

	transformAttacks(column: Column, modifier: (attack: Attack[]) => void) {
        const colIndex = this.columns.indexOf(column);
        if (colIndex === -1) return this;
        const oldColumn = this.columns[colIndex];
        const newColumn = new Column(oldColumn.attacks, oldColumn.activeIndex);

		modifier(newColumn.attacks);
		
        this.columns[colIndex] = newColumn;

        return this;
	}

	clone() {
		return new ColumnList([...this.columns]);
	}
}