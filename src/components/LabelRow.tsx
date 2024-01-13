import React from "react";
import Column from "../utils/Column";
import FormInput from "./FormInput";
import RowLabel from "./RowLabel";

export default function LabelRow(props: Readonly<{
	columns: Column[];
	setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}>) {
	return <>
		<RowLabel label="Label" />
		{props.columns.map((column, i) => <FormInput
			key={i}
			value={column.first.label}
			onChange={value => {
				let newColumns = [...props.columns];
				
				newColumns[i].first.label = value;
				newColumns[i].first.unmodified = false;

				props.setColumns(newColumns);
			}}
		/>)}
	</>;
}