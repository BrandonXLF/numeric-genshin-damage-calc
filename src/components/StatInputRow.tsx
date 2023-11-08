import StatInput from "./StatInput";
import AttrStatInput from "./AttrStatInput";
import DamageCalculator from "../utils/DamageCalculator";
import Group from "../utils/Group";
import RowLabel from "./RowLabel";
import Stat from "../types/Stat";
import React from 'react';
import StatValue from "../utils/StatValue";
import StatData from "../types/StatData";
import { attrStats } from "../utils/stats";
import { getAttrStat } from "../utils/attributes";

export default function StatInputRow(props: {
	stat: Stat,
	groups: Group[],
	setGroups: (value: React.SetStateAction<Group[]>) => void
}) {
	let anyEnabled = false;
	
	function onChange(i: number, j: number, prop: keyof StatData, value?: string) {
		let newGroups = [...props.groups];
		
		if (!newGroups[i].items[j].statData[prop])
			newGroups[i].items[j].statData[prop] = new StatValue(value ?? '', props.stat.type);
		
		if (value === undefined)
			delete newGroups[i].items[j].statData[prop];
		else
			newGroups[i].items[j].statData[prop]!.number = value;

		newGroups[i].items[j].unmodified = false;
		
		props.setGroups(newGroups);
	}
	
	let statInputs = props.groups.map((group, groupIndex) => {
		const inputDetails = group.active;
		const columnIndex = group.activeIndex;

		let damageGroups = DamageCalculator.reactionTypes[inputDetails.reactionType].groups;
		let enabled = Boolean(props.stat.groups! & damageGroups);
		
		if (!enabled && 'attr' in props.stat)
			enabled = attrStats.some(stat =>
				(stat.groups! & damageGroups) &&
				parseInt(inputDetails.statData[getAttrStat(stat.prop, props.stat.attr!)]?.number ?? '')
			);
		
		anyEnabled = anyEnabled || enabled;
		
		if ('usesAttrs' in props.stat && enabled)
			return <AttrStatInput
				key={groupIndex}
				stat={props.stat}
				inputDetails={inputDetails}
				onChange={(props, value) => onChange(groupIndex, columnIndex, props, value)}
			/>;
		
		return <StatInput
			key={groupIndex}
			stat={props.stat}
			value={inputDetails.statData[props.stat.prop]?.number ?? ''}
			disabled={!enabled}
			onChange={value => onChange(groupIndex, columnIndex, props.stat.prop, value)}
		/>;
	});
	
	if (!anyEnabled) return null;
	
	return <>
		<RowLabel label={props.stat.name} desc={props.stat.desc} icon={props.stat.icon} />
		{statInputs}
	</>;
}