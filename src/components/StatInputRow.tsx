import StatInput from "./StatInput";
import DamageCalculator from "../utils/DamageCalculator";
import InputDetails from "../types/InputDetails";
import RowLabel from "./RowLabel";
import Stat from "../types/Stat";
import React from 'react';

export default function StatInputRow(props: {
	stat: Stat,
	allInputDetails: InputDetails[],
	setAllInputDetails: (value: React.SetStateAction<InputDetails[]>) => void
}) {
	let anyEnabled = false;
	
	let statInputs = props.allInputDetails.map((inputDetails, i) => {
		let damageGroups = DamageCalculator.reactionTypes[inputDetails.reactionType].groups;
		let enabled = !!(props.stat.groups & damageGroups);
		
		anyEnabled = anyEnabled || enabled;
		
		return <StatInput
			key={i}
			stat={props.stat}
			value={inputDetails.statData[props.stat.attr].number}
			disabled={!enabled}
			onChange={value => props.setAllInputDetails(([...newAllInputDetails]) => {
				newAllInputDetails[i].statData[props.stat.attr].number = value;
				
				return newAllInputDetails;
			})}
		/>
	});
	
	if (!anyEnabled) return null;
	
	return <>
		<RowLabel label={props.stat.name} desc={props.stat.desc} />
		{statInputs}
	</>;
}