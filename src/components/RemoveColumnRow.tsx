import React from "react";
import DeleteSVG from "../svgs/DeleteSVG";
import SaveSVG from "../svgs/SaveSVG";
import InputDetails from "../types/InputDetails";
import createInputDetails from "../utils/createInputDetails";
import SVGButton from "./SVGButton";

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
						let newColumns = [...props.columns];
						let newClosedColumns = [...props.closedColumns];
						
						newClosedColumns.push(newColumns.splice(i, 1)[0]);
						if (!newColumns.length) newColumns.push(createInputDetails());
						
						props.setColumns(newColumns);
						props.setClosedColumns(newClosedColumns);
					}}
				/>
				<SVGButton
					svg={<DeleteSVG className="neg" />}
					label="Delete Column"
					hideLabel={true}
					onClick={() => {
						let newColumns = [...props.columns];
						
						newColumns.splice(i, 1);
						if (!newColumns.length) newColumns.push(createInputDetails());
						
						props.setColumns(newColumns);
					}}
				/>
			</div>
		)}
	</>;
}