import React from "react";
import InputDetails from "../types/InputDetails";
import FormInput from "./FormInput";
import RowLabel from "./RowLabel";

export default function LabelRow(props: {
	columns: InputDetails[];
	setColumns: React.Dispatch<React.SetStateAction<InputDetails[]>>;
}) {
	return <>
		<RowLabel label="Label" />
		{props.columns.map((inputDetails, i) => <FormInput
			key={i}
			value={inputDetails.label}
			onChange={value => {
				let newColumns = [...props.columns];
				
				newColumns[i].label = value;

				props.setColumns(newColumns);
			}}
		/>)}
	</>;
}