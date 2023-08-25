import CharacterBuild from "../types/CharacterBuild";
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

    static remove(columns: InputDetails[], column: InputDetails, keepOne = false) {
        const newColumns = columns.filter(iteratedColumn => iteratedColumn !== column);

        if (keepOne && !newColumns.length)
            newColumns.push(ColumnUtils.create());

        return newColumns;
    }
}