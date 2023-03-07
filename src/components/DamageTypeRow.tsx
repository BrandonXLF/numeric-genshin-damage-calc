import React from "react";
import DamageCalculator from "../utils/DamageCalculator";
import InputDetails from "../types/InputDetails";
import RowLabel from "./RowLabel";
import FormInput from "./FormInput";

export default function DamageTypeRow(props: {
	columns: InputDetails[];
	setColumns: React.Dispatch<React.SetStateAction<InputDetails[]>>;
}) {
	return <>
		<RowLabel label="Reaction" />
		{props.columns.map((inputDetails, i) => <FormInput
			key={i}
			value={`${inputDetails.reactionType},${inputDetails.reaction}`}
			style={{
				color: DamageCalculator.reactionTypes[inputDetails.reactionType].reactions[inputDetails.reaction].color ?? 'white'
			}} 
			onChange={value => {
				let newColumns = [...props.columns];
				
				[ newColumns[i].reactionType, newColumns[i].reaction ] = value.split(',').map(Number);
			
				props.setColumns(newColumns);
			}}
			options={
				DamageCalculator.reactionTypes.map((damageType, i) => {
					return {
						label: damageType.name,
						options: damageType.reactions.map((damageSubType, j) => ({
							name: damageSubType.name,
							value: `${i},${j}`
						}))
					}
				})
			}
		/>
	)}</>;
}