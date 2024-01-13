import React from "react";
import DeleteSVG from "../svgs/DeleteSVG";
import SaveSVG from "../svgs/SaveSVG";
import Column from "../utils/Column";
import SVGButton from "./SVGButton";
import ColumnListUtils from "../utils/ColumnListUtils";
import CopySVG from "../svgs/CopySVG";

export default function RemoveColumnRow(props: Readonly<{
	columns: Column[];
	setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
	closedColumns: Column[];
	setClosedColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}>) {
	return <>
		{props.columns.map((_, i) =>
			<div key={i} className="column-top">
				<SVGButton
					svg={<SaveSVG />}
					label="Save and Close Column"
					hideLabel={true}
					onClick={() => {
						let chosenColumn = props.columns[i];
						
						props.setColumns(columns => ColumnListUtils.remove(columns, chosenColumn, true));
						props.setClosedColumns(closedColumns => ColumnListUtils.transfer(closedColumns, chosenColumn));
					}}
				/>
				<SVGButton
					svg={<CopySVG />}
					label="Duplicate Column"
					hideLabel={true}
					onClick={() => {
						let chosenColumn = props.columns[i];
						
						props.setColumns(columns => ColumnListUtils.duplicate(columns, chosenColumn));
					}}
				/>
				<SVGButton
					svg={<DeleteSVG className="neg" />}
					label="Delete Column"
					hideLabel={true}
					onClick={() => {
						let chosenColumn = props.columns[i];
						
						props.setColumns(columns => ColumnListUtils.remove(columns, chosenColumn, true));
					}}
				/>
			</div>
		)}
	</>;
}