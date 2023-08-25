import InputDetails from "../types/InputDetails";
import React from 'react';
import SVGButton from "./SVGButton";
import AddSVG from "../svgs/AddSVG";
import LoadColumnsPopup from "./LoadColumnsPopup";
import '../less/TopButtonRow.less';
import ImportPopup from "./ImportPopup";
import ColumnUtils from "../utils/ColumnUtils";

export default function TopButtonRow(props: {
	columns: InputDetails[];
	setColumns: React.Dispatch<React.SetStateAction<InputDetails[]>>;
	closedColumns: InputDetails[];
	setClosedColumns: React.Dispatch<React.SetStateAction<InputDetails[]>>;
}) {
	return <div className="form-top">
		<SVGButton
			svg={<AddSVG className="pos" />}
			label="Add Column"
			onClick={() => props.setColumns(columns => ColumnUtils.add(columns))}
		/>
		<LoadColumnsPopup
			columns={props.columns}
			setColumns={props.setColumns}
			closedColumns={props.closedColumns}
			setClosedColumns={props.setClosedColumns}
		/>
		<ImportPopup setColumns={props.setColumns} />
	</div>;
}