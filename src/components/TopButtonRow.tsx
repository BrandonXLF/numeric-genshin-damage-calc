import InputDetails from "../types/InputDetails";
import createInputDetails from "../utils/createInputDetails";
import React from 'react';
import SVGButton from "./SVGButton";
import AddSVG from "../svgs/AddSVG";
import LoadColumnsPopup from "./LoadColumnsPopup";
import '../less/TopButtonRow.less';

export default function TopButtonRow(props: {
	columns: InputDetails[];
	setColumns: React.Dispatch<React.SetStateAction<InputDetails[]>>;
	closedColumns: InputDetails[];
	setClosedColumns: React.Dispatch<React.SetStateAction<InputDetails[]>>;
}) {
	return <div className="form-top">
		<LoadColumnsPopup
			columns={props.columns}
			setColumns={props.setColumns}
			closedColumns={props.closedColumns}
			setClosedColumns={props.setClosedColumns}
		/>
		<SVGButton
			svg={<AddSVG className="pos" />}
			label="Add Column"
			onClick={() => props.setColumns(
				[...props.columns, createInputDetails(props.columns[props.columns.length - 1])]
			)}
		/>
	</div>;
}