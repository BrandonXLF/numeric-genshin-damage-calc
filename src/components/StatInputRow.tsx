import StatInput from "./StatInput";
import AttrStatInput from "./AttrStatInput";
import DamageCalculator from "../utils/DamageCalculator";
import Column from "../utils/Column";
import RowLabel from "./RowLabel";
import Stat from "../types/Stat";
import React from 'react';
import StatValue from "../utils/StatValue";
import StatData from "../types/StatData";
import { attrStats } from "../utils/stats";
import { getAttrStat } from "../utils/attributes";

export default function StatInputRow(props: {
	stat: Stat,
	columns: Column[],
	setColumns: (value: React.SetStateAction<Column[]>) => void
}) {
	let anyEnabled = false;
	
	function onChange(i: number, j: number, prop: keyof StatData, value?: string) {
		let newColumns = [...props.columns];
		
		if (!newColumns[i].attacks[j].statData[prop])
			newColumns[i].attacks[j].statData[prop] = new StatValue(value ?? '', props.stat.type);
		
		if (value === undefined)
			delete newColumns[i].attacks[j].statData[prop];
		else
			newColumns[i].attacks[j].statData[prop]!.number = value;

		newColumns[i].attacks[j].unmodified = false;
		
		props.setColumns(newColumns);
	}
	
	let statInputs = props.columns.map((column, colIndex) => {
		const inputDetails = column.active;
		const atkIndex = column.activeIndex;

		let damageColumns = DamageCalculator.reactionTypes[inputDetails.reactionType].groups;
		let enabled = Boolean(props.stat.groups! & damageColumns);
		
		if (!enabled && 'attr' in props.stat)
			enabled = attrStats.some(stat =>
				(stat.groups! & damageColumns) &&
				parseInt(inputDetails.statData[getAttrStat(stat.prop, props.stat.attr!)]?.number ?? '')
			);
		
		anyEnabled = anyEnabled || enabled;
		
		if ('usesAttrs' in props.stat && enabled)
			return <AttrStatInput
				key={colIndex}
				stat={props.stat}
				inputDetails={inputDetails}
				onChange={(props, value) => onChange(colIndex, atkIndex, props, value)}
			/>;
		
		return <StatInput
			key={colIndex}
			stat={props.stat}
			value={inputDetails.statData[props.stat.prop]?.number ?? ''}
			disabled={!enabled}
			onChange={value => onChange(colIndex, atkIndex, props.stat.prop, value)}
		/>;
	});
	
	if (!anyEnabled) return null;
	
	return <>
		<RowLabel label={props.stat.name} desc={props.stat.desc} icon={props.stat.icon} />
		{statInputs}
	</>;
}