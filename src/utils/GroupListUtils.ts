import ImportedCharacter from "../types/ImportedCharacter";
import InputDetails, { StoredInputDetails } from "../types/InputDetails";
import Group from "./Group";
import { StatTypes } from "../types/Stat";
import StatData from "../types/StatData";
import StatValue from "./StatValue";
import attributes, { getAttrStat } from "./attributes";
import elements from "./elements";
import stats from "./stats";

export default class GroupListUtils {
    static createColumn(base?: StoredInputDetails) {
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

    static loadFromStorage(shown: boolean, requireOne = false): Group[] {
        const storedColumns = (JSON.parse(localStorage.getItem('GIDC-data') ?? '[]') as StoredInputDetails[]);
        const columns = storedColumns.map(
            storedColumn => [storedColumn, GroupListUtils.createColumn(storedColumn)] as const
        );
        const groupsMap = new Map<string | number, [StoredInputDetails, InputDetails][]>();

        columns.forEach(([storedColumn, column], i) => {
            if (storedColumn.group === undefined) {
                groupsMap.set(`SG_${i}`, [[storedColumn, column]]);
                return;
            }

            groupsMap.set(storedColumn.group, [
                ...(groupsMap.get(storedColumn.group) ?? []),
                [storedColumn, column]
            ]);
        })

        const groups = Array.from(groupsMap.values());
        const filteredGroups = groups.filter(
            ([[firstStored]]) => shown ? firstStored.shown !== false : firstStored.shown === false
        );

        if (!filteredGroups.length && requireOne)
            return [new Group([GroupListUtils.createColumn()])];
        
        return filteredGroups.map(group => new Group(group.map(([_, inputDetails]) => inputDetails)));
    }

    private static encodeForStorage(groups: Group[], shown: boolean): StoredInputDetails[] {
        const itemLists = GroupListUtils.clean(groups)
            .map(group => group.items as StoredInputDetails[]);

        const processedItemLists = itemLists.map((items, itemsIndex) => items.map((column, colIndex) => {
            column.shown = shown;

            if (items.length > 1) column.group = itemsIndex;
            if (colIndex > 1) delete column.label;

            return column;
        }));

        return processedItemLists.flat();
    }

    static saveToStorage(shownGroups: Group[], closedGroups: Group[]) {
		localStorage.setItem('GIDC-data', JSON.stringify([
			...GroupListUtils.encodeForStorage(shownGroups, true),
            ...GroupListUtils.encodeForStorage(closedGroups, false)
		]));
    }

    private static clean(groups: Group[]) {
        let cleanLength = groups.length;

        while (cleanLength > 0 && groups[cleanLength - 1].unmodified) {
            cleanLength--;
        }

        return groups.slice(0, cleanLength);
    }

    static add(groups: Group[]) {
        const newGroups = [...groups];

        newGroups.push(new Group([GroupListUtils.createColumn()]));

        return newGroups;
    }

    static duplicate(groups: Group[], group: Group) {
        const index = groups.indexOf(group);
        if (index === -1) return groups;

        const newGroups = [...groups];
        newGroups.splice(index + 1, 0, new Group(group.items.map(column => GroupListUtils.createColumn(column))));

        return newGroups;
    }

    static transfer(groups: Group[], group: Group) {
        const newGroups = GroupListUtils.clean(groups);
        newGroups.push(group);

        return newGroups;
    }

    static load(groups: Group[], column: StoredInputDetails) {
        const newGroups = GroupListUtils.clean(groups);
        newGroups.push(new Group([GroupListUtils.createColumn(column)]));

        return newGroups;
    }
    
    static import(groups: Group[], build: ImportedCharacter, element: typeof elements[number]) {
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

        return GroupListUtils.load(groups, base);
    }

    static remove(groups: Group[], group: Group, keepOne = false) {
        const newGroups = groups.filter(iteratedGroup => iteratedGroup !== group);

        if (keepOne && !newGroups.length)
        newGroups.push(new Group([GroupListUtils.createColumn()]));

        return newGroups;
    }

    static addColumn(groups: Group[], group: Group, base: InputDetails) {
        const index = groups.indexOf(group);
        if (index === -1) return groups;

        const newGroups = [...groups];
        const newGroup = new Group(
            [...group.items, GroupListUtils.createColumn(base)],
            group.items.length
        );

        newGroups.splice(index, 1, newGroup);

        return newGroups;
    }

    static removeColumn(groups: Group[], group: Group, column: InputDetails) {
        const index = groups.indexOf(group);
        if (index === -1) return groups;

        const newGroups = [...groups];
        const newItems = group.items.filter(iteratedColumn => iteratedColumn !== column);
        const newGroup = new Group(newItems, Math.min(group.activeIndex, newItems.length - 1));

        newGroups.splice(index, 1, newGroup);

        return newGroups;
    }

    static setActiveColumn(groups: Group[], group: Group, column: InputDetails) {
        const index = groups.indexOf(group);
        if (index === -1) return groups;

        const colIndex = group.items.indexOf(column);
        if (colIndex === -1) return groups;

        const newGroups = [...groups];
        const newGroup = new Group([...group.items], colIndex);

        newGroups.splice(index, 1, newGroup);

        return newGroups;
    }
}