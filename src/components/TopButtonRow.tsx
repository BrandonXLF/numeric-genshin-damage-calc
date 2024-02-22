import Column from "../utils/Column";
import React from 'react';
import SVGButton from "./SVGButton";
import AddSVG from "../svgs/AddSVG";
import LoadSavedPopup from "./LoadSavedPopup";
import '../less/TopButtonRow.less';
import ImportPopup from "./ImportPopup";
import ColumnListUtils from "../utils/ColumnListUtils";
import ExportPopup from "./ExportPopup";

export default function TopButtonRow(props: Readonly<{
	columns: Column[];
	setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
	closedColumns: Column[];
	setClosedColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}>) {
	return <div className="form-top">
		<SVGButton
			svg={<AddSVG className="pos" />}
			label="Add"
			onClick={() => props.setColumns(columns => ColumnListUtils.add(columns))}
		/>
		<LoadSavedPopup
			columns={props.columns}
			setColumns={props.setColumns}
			closedColumns={props.closedColumns}
			setClosedColumns={props.setClosedColumns}
		/>
		<ImportPopup setColumns={props.setColumns} />
		<ExportPopup columns={props.columns} closedColumns={props.closedColumns} />
	</div>;
}