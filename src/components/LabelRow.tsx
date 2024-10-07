import React from "react";
import Column from "../utils/Column";
import FormInput from "./FormInput";
import RowLabel from "./RowLabel";
import { ColumnStateAction } from "../utils/columnListReducer";

export default function LabelRow(props: Readonly<{
	columns: Column[];
	dispatch: React.Dispatch<ColumnStateAction>;
}>) {
	return <>
		<RowLabel label="Label" />
		{props.columns.map((column, i) => <FormInput
			key={i}
			value={column.first.label}
			onChange={value => props.dispatch({
				type: 'modifyAttack',
				column: props.columns[i],
				attack: column.first,
				modifier: attack => {
					attack.label = value;
				}
			})}
		/>)}
	</>;
}