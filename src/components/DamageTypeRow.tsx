import React from "react";
import DamageCalculator from "../utils/DamageCalculator";
import InputDetails from "../types/InputDetails";
import RowLabel from "./RowLabel";

export default function DamageTypeRow(props: {
	allInputDetails: InputDetails[];
	setAllInputDetails: React.Dispatch<React.SetStateAction<InputDetails[]>>;
}) {
	return <>
		<RowLabel label="Reaction" />
		{props.allInputDetails.map((inputDetails, i) => {
			return <React.Fragment key={i}>
				<div></div>
				<select value={inputDetails.damageType} onChange={e => {
					let selected = +e.target.value;
					
					props.setAllInputDetails(([...newAllInputDetails]) => {
						newAllInputDetails[i].damageType = selected;
						
						return newAllInputDetails;
					});
				}}>
					{DamageCalculator.damageTypes.map((damageType, i) => {
						return <option value={i} key={i}>{damageType.name}</option>;
					})}
				</select>
			</React.Fragment>;
		})}
	</>;
}