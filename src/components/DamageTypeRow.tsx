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
		{props.columns.map((inputDetails, i) =>
			<FormInput key={i}>
				<select
					value={`${inputDetails.reactionType},${inputDetails.reaction}`}
					style={{ color: DamageCalculator.reactionTypes[inputDetails.reactionType].reactions[inputDetails.reaction].color ?? 'white' }} 
					onChange={e => {
					let newColumns = [...props.columns];
					
					[
						newColumns[i].reactionType,
						newColumns[i].reaction
					] = e.target.value.split(',').map(Number);
				
					props.setColumns(newColumns);
				}}>
					{DamageCalculator.reactionTypes.map((damageType, i) => {
						return <optgroup key={i} label={damageType.name}>
							{damageType.reactions.map((damageSubType, j) => {
								return <option style={{ color: damageSubType.color ?? 'white' }} value={`${i},${j}`} key={j}>
									{damageSubType.name}
								</option>;
							})}
						</optgroup>;
					})}
				</select>
			</FormInput>
		)}
	</>;
}