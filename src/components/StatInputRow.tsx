import StatInput from "./StatInput";
import AttrStatInput from "./AttrStatInput";
import DamageCalculator from "../utils/DamageCalculator";
import InputDetails from "../types/InputDetails";
import RowLabel from "./RowLabel";
import Stat from "../types/Stat";
import React from 'react';
import StatValue from "../utils/StatValue";
import StatData from "../types/StatData";
import { attrStats } from "../utils/stats";
import { getAttrStat } from "../utils/attributes";

export default function StatInputRow(props: {
	stat: Stat,
	columns: InputDetails[],
	setColumns: (value: React.SetStateAction<InputDetails[]>) => void
}) {
	let anyEnabled = false;
	
	function onChange(i: number, prop: keyof StatData, value?: string) {
		let newColumns = [...props.columns];
		
		if (!newColumns[i].statData[prop])
			newColumns[i].statData[prop] = new StatValue(value ?? '', props.stat.type);
		
		if (value === undefined)
			delete newColumns[i].statData[prop];
		else
			newColumns[i].statData[prop]!.number = value;

		newColumns[i].unmodified = false;
		
		props.setColumns(newColumns);
	}
	
	let statInputs = props.columns.map((inputDetails, i) => {
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
				key={i}
				stat={props.stat}
				inputDetails={inputDetails}
				onChange={(props, value) => onChange(i, props, value)}
			/>;
		
		return <StatInput
			key={i}
			stat={props.stat}
			value={inputDetails.statData[props.stat.prop]?.number ?? ''}
			disabled={!enabled}
			onChange={value => onChange(i, props.stat.prop, value)}
		/>;
	});
	
	if (!anyEnabled) return null;
	
	return <>
		<RowLabel label={props.stat.name} desc={props.stat.desc} icon={props.stat.icon} />
		{statInputs}
	</>;
}