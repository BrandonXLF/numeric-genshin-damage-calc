import StatInput from "./StatInput";
import DamageCalculator from "../utils/DamageCalculator";
import InputDetails from "../types/InputDetails";
import RowLabel from "./RowLabel";
import Stat from "../types/Stat";
import React from 'react';

export default function StatInputRow(props: {
	stat: Stat,
	columns: InputDetails[],
	setColumns: (value: React.SetStateAction<InputDetails[]>) => void
}) {
	let anyEnabled = false;
	
	let statInputs = props.columns.map((inputDetails, i) => {
		let damageGroups = DamageCalculator.reactionTypes[inputDetails.reactionType].groups;
		let enabled = !!(props.stat.groups & damageGroups);
		
		anyEnabled = anyEnabled || enabled;
		
		return <StatInput
			key={i}
			stat={props.stat}
			value={inputDetails.statData[props.stat.prop].number}
			disabled={!enabled}
			onChange={value => {
				let newColumns = [...props.columns];
				
				newColumns[i].statData[props.stat.prop].number = value;
				
				props.setColumns(newColumns);
			}}
		/>
	});
	
	if (!anyEnabled) return null;
	
	return <>
		<RowLabel label={props.stat.name} desc={props.stat.desc} icon={props.stat.icon} />
		{statInputs}
	</>;
}