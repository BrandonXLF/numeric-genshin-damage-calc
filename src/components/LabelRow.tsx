import React from "react";
import Column from "../utils/Column";
import FormInput from "./FormInput";
import RowLabel from "./RowLabel";
import { ColumnStateAction } from "../types/ColumnState";

export default function LabelRow(props: Readonly<{
	columns: Column[];
	dispatch: React.Dispatch<ColumnStateAction>;
}>) {
	return <>
		<RowLabel label="Label" />
		{props.columns.map(column => <FormInput
			key={column.id}
			value={column.first.label}
			onChange={value => props.dispatch({
				type: 'modifyAttack',
				colId: column.id,
				atkId: column.first.id,
				modifier: attack => {
					attack.label = value;
				}
			})}
		/>)}
	</>;
}