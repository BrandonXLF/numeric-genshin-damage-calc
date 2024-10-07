import ImportedCharacter from "../types/ImportedCharacter";
import Attack, { StoredAttack } from "../types/Attack";
import Column from "./Column";
import { StatTypes } from "../types/Stat";
import StatData from "../types/StatData";
import StatValue from "./StatValue";
import attributes, { getAttrStat } from "./attributes";
import elements from "./elements";
import stats from "./stats";

export default class ColumnListUtils {
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

    static loadFromStorage(shown: boolean, requireOne = false): Column[] {
        const storedAttacks = (JSON.parse(localStorage.getItem('GIDC-data') ?? '[]') as StoredAttack[]);
        const attacks = storedAttacks.map(
            storedAttack => [storedAttack, ColumnListUtils.createAttack(storedAttack)] as const
        );
        const columnsMap = new Map<string | number, [StoredAttack, Attack][]>();

        attacks.forEach(([storedAttack, attack], i) => {
            if (storedAttack.group === undefined) {
                columnsMap.set(`SG_${i}`, [[storedAttack, attack]]);
                return;
            }

            columnsMap.set(storedAttack.group, [
                ...(columnsMap.get(storedAttack.group) ?? []),
                [storedAttack, attack]
            ]);
        })

        const columns = Array.from(columnsMap.values());
        const filteredColumns = columns.filter(
            ([[firstStored]]) => shown ? firstStored.shown !== false : firstStored.shown === false
        );

        if (!filteredColumns.length && requireOne)
            return [new Column([ColumnListUtils.createAttack()])];
        
        return filteredColumns.map(column => new Column(column.map(([_, inputDetails]) => inputDetails)));
    }

    private static encodeForStorage(columns: Column[], shown: boolean): StoredAttack[] {
        const itemLists = ColumnListUtils.clean(columns)
            .map(column => column.attacks);

        const processedItemLists = itemLists.map((items, itemsIndex) => items.map((attack, atkIndex) => {
            const storedAttack: StoredAttack = {...attack};

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

    static saveToStorage(shownColumns: Column[], closedColumns: Column[]) {
		localStorage.setItem('GIDC-data', JSON.stringify([
			...ColumnListUtils.encodeForStorage(shownColumns, true),
            ...ColumnListUtils.encodeForStorage(closedColumns, false)
		]));
    }

    private static clean(columns: Column[]) {
        let cleanLength = columns.length;

        while (cleanLength > 0 && columns[cleanLength - 1].unmodified) {
            cleanLength--;
        }

        return columns.slice(0, cleanLength);
    }

    static add(columns: Column[]) {
        const newColumns = [...columns];

        newColumns.push(new Column([ColumnListUtils.createAttack()]));

        return newColumns;
    }

    static duplicate(columns: Column[], column: Column) {
        const index = columns.indexOf(column);
        if (index === -1) return columns;

        const newColumns = [...columns];
        newColumns.splice(index + 1, 0, new Column(column.attacks.map(attack => ColumnListUtils.createAttack(attack))));

        return newColumns;
    }

    static transfer(columns: Column[], ...columnsToAdd: Column[]) {
        const newColumns = ColumnListUtils.clean(columns);
        newColumns.push(...columnsToAdd);

        return newColumns;
    }

    static load(columns: Column[], attack: StoredAttack) {
        const newColumns = ColumnListUtils.clean(columns);
        newColumns.push(new Column([ColumnListUtils.createAttack(attack)]));

        return newColumns;
    }
    
    static import(columns: Column[], build: ImportedCharacter, element: typeof elements[number] | '') {
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

        return ColumnListUtils.load(columns, base);
    }

    static remove(columns: Column[], column: Column, keepOne = false) {
        const newColumns = columns.filter(iteratedColumn => iteratedColumn !== column);

        if (keepOne && !newColumns.length)
        newColumns.push(new Column([ColumnListUtils.createAttack()]));

        return newColumns;
    }

    static addAttack(columns: Column[], column: Column, base: Attack) {
        const index = columns.indexOf(column);
        if (index === -1) return columns;

        const newColumns = [...columns];
        const newColumn = new Column(
            [...column.attacks, ColumnListUtils.createAttack(base)],
            column.attacks.length
        );

        newColumns.splice(index, 1, newColumn);

        return newColumns;
    }

    static removeAttack(columns: Column[], column: Column, attack: Attack) {
        const index = columns.indexOf(column);
        if (index === -1) return columns;

        const newColumns = [...columns];
        const newItems = column.attacks.filter(iteratedAttack => iteratedAttack !== attack);
        const newColumn = new Column(newItems, Math.min(column.activeIndex, newItems.length - 1));

        newColumns.splice(index, 1, newColumn);

        return newColumns;
    }

    static setActiveAttack(columns: Column[], column: Column, attack: Attack) {
        const colIndex = columns.indexOf(column);
        if (colIndex === -1) return columns;

        const atkIndex = column.attacks.indexOf(attack);
        if (atkIndex === -1) return columns;

        const newColumns = [...columns];
        const newColumn = new Column([...column.attacks], atkIndex);

        newColumns.splice(colIndex, 1, newColumn);

        return newColumns;
    }

    static modify(columns: Column[], column: Column, modifier: (column: Column) => void) {
        modifier(column);   
        return [...columns];
    }
}