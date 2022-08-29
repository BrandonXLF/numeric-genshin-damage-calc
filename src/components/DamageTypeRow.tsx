import React from "react";
import DamageCalculator from "../utils/DamageCalculator";
import InputDetails from "../types/InputDetails";
import RowLabel from "./RowLabel";
import FormInput from "./FormInput";

export default function DamageTypeRow(props: {
	allInputDetails: InputDetails[];
	setAllInputDetails: React.Dispatch<React.SetStateAction<InputDetails[]>>;
}) {
	return <>
		<RowLabel label="Reaction" />
		{props.allInputDetails.map((inputDetails, i) =>
			<FormInput key={i}>
				<select value={`${inputDetails.reactionType},${inputDetails.reaction}`} onChange={e => {
					props.setAllInputDetails(([...newAllInputDetails]) => {
						[
							newAllInputDetails[i].reactionType,
							newAllInputDetails[i].reaction
						] = e.target.value.split(',').map(Number);
						
						return newAllInputDetails;
					});
				}}>
					{DamageCalculator.reactionTypes.map((damageType, i) => {
						return <optgroup key={i} label={damageType.name}>
							{damageType.reactions.map((damageSubType, j) => {
								return <option value={`${i},${j}`} key={j}>{damageSubType[0]}</option>;
							})}
						</optgroup>;
					})}
				</select>
			</FormInput>
		)}
	</>;
}