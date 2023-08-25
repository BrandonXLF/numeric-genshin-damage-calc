import React from "react";
import DeleteSVG from "../svgs/DeleteSVG";
import SaveSVG from "../svgs/SaveSVG";
import InputDetails from "../types/InputDetails";
import SVGButton from "./SVGButton";
import ColumnUtils from "../utils/ColumnUtils";

export default function RemoveColumnRow(props: {
	columns: InputDetails[];
	setColumns: React.Dispatch<React.SetStateAction<InputDetails[]>>;
	closedColumns: InputDetails[];
	setClosedColumns: React.Dispatch<React.SetStateAction<InputDetails[]>>;
}) {
	return <>
		{props.columns.map((_, i) =>
			<div key={i} className="column-top">
				<SVGButton
					svg={<SaveSVG />}
					label="Save and Close Column"
					hideLabel={true}
					onClick={() => {
						let chosenColumn = props.columns[i];
						
						props.setClosedColumns(closedColumns => ColumnUtils.transfer(closedColumns, chosenColumn));
						props.setColumns(columns => ColumnUtils.remove(columns, chosenColumn, true));
					}}
				/>
				<SVGButton
					svg={<DeleteSVG className="neg" />}
					label="Delete Column"
					hideLabel={true}
					onClick={() => {
						let chosenColumn = props.columns[i];
						
						props.setColumns(columns => ColumnUtils.remove(columns, chosenColumn, true));
					}}
				/>
			</div>
		)}
	</>;
}