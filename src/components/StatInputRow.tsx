import StatInput from "./StatInput";
import AttrStatInput from "./AttrStatInput";
import DamageCalculator from "../utils/DamageCalculator";
import InputDetails from "../types/InputDetails";
import RowLabel from "./RowLabel";
import Stat from "../types/Stat";
import React from 'react';
import StatValue from "../utils/StatValue";
import StatData from "../types/StatData";
import DamageGroups from "../types/DamageGroups";

export default function StatInputRow(props: {
	stat: Stat,
	columns: InputDetails[],
	setColumns: (value: React.SetStateAction<InputDetails[]>) => void
}) {
	let anyEnabled = false;
	
	function onChange(i: number, prop: keyof StatData, value?: string) {
		let newColumns = [...props.columns];
		
		if (!newColumns[i].statData[prop])
			newColumns[i].statData[prop] = new StatValue(value || '', props.stat.type);
		
		if (value === undefined)
			delete newColumns[i].statData[prop];
		else
			newColumns[i].statData[prop]!.number = value;
		
		props.setColumns(newColumns);
	}
	
	let statInputs = props.columns.map((inputDetails, i) => {
		let damageGroups = DamageCalculator.reactionTypes[inputDetails.reactionType].groups;
		let validGroups = props.stat.groups & damageGroups;
		
		// Remove groups without any of the required dependents
		for (let j = 1; DamageGroups[j]; j *= 2)
			if (props.stat.dependents?.[j] && !props.stat.dependents[j]!.some(dependent => parseInt(inputDetails.statData[dependent]?.number || '')))
				validGroups &= ~j;
		
		anyEnabled = anyEnabled || validGroups !== 0;
		
		if ('attrs' in props.stat && validGroups)
			return <AttrStatInput
				key={i}
				stat={props.stat}
				inputDetails={inputDetails}
				onChange={(props, value) => onChange(i, props, value)}
			/>;
		
		return <StatInput
			key={i}
			stat={props.stat}
			value={inputDetails.statData[props.stat.prop]!.number}
			disabled={validGroups === 0}
			onChange={value => onChange(i, props.stat.prop, value)}
		/>;
	});
	
	if (!anyEnabled) return null;
	
	return <>
		<RowLabel label={props.stat.name} desc={props.stat.desc} icon={props.stat.icon} />
		{statInputs}
	</>;
}