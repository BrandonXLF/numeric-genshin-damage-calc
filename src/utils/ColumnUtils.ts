import ImportedCharacter from "../types/ImportedCharacter";
import InputDetails, { StoredInputDetails } from "../types/InputDetails";
import { StatTypes } from "../types/Stat";
import StatData from "../types/StatData";
import StatValue from "./StatValue";
import attributes, { getAttrStat } from "./attributes";
import elements from "./elements";
import stats from "./stats";

export default class ColumnUtils {
    static create(base?: StoredInputDetails) {
        let out: InputDetails = {
            reaction: base?.reaction ?? 0,
            reactionType: base?.reactionType ?? 0,
            label: base?.label ?? '',
            statData: {} as StatData,
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

    private static clean(columns: InputDetails[]) {
        for (let i = columns.length - 1; i >= 0 && columns[i].unmodified; i--)
            columns.pop();
    }

    static add(columns: InputDetails[]) {
        const newColumns = [...columns];

        newColumns.push(ColumnUtils.create());

        return newColumns;
    }

    static clone(columns: InputDetails[], column: InputDetails) {
        const index = columns.indexOf(column);
        const newColumns = [...columns];

        newColumns.splice(index + 1, 0, ColumnUtils.create(newColumns[index]));

        return newColumns;
    }

    static transfer(columns: InputDetails[], column: InputDetails) {
        const newColumns = [...columns];

        ColumnUtils.clean(newColumns);
        newColumns.push(column);

        return newColumns;
    }

    static load(columns: InputDetails[], column: StoredInputDetails) {
        const newColumns = [...columns];

        ColumnUtils.clean(newColumns);
        newColumns.push(ColumnUtils.create(column));

        return newColumns;
    }
    
    static import(columns: InputDetails[], build: ImportedCharacter, element: typeof elements[number]) {
        const base: StoredInputDetails = {
            label: build.name,
            statData: {}
        };

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

        return ColumnUtils.load(columns, base);
    }

    static remove(columns: InputDetails[], column: InputDetails, keepOne = false) {
        const newColumns = columns.filter(iteratedColumn => iteratedColumn !== column);

        if (keepOne && !newColumns.length)
            newColumns.push(ColumnUtils.create());

        return newColumns;
    }
}