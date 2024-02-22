import React, { useEffect } from "react";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import SVGButton from "./SVGButton";
import '../less/LoadSavedPopup.less';
import LoadSVG from "../svgs/LoadSVG";
import Column from "../utils/Column";
import PopupHeader from "./PopupHeader";
import ColumnListUtils from "../utils/ColumnListUtils";

export default function LoadSavedPopup(props: Readonly<{
	columns: Column[];
	setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
	closedColumns: Column[];
	setClosedColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}>) {
	const ref = React.useRef<PopupActions>(null);
	
	useEffect(() => {
		if (ref.current && !props.closedColumns.length)
			ref.current.close();
	});
	
	return <Popup trigger={
		<SVGButton
			svg={<LoadSVG />}
			label="Load"
			title="Load Saved Column"
			disabled={!props.closedColumns.length}
		/>
	} ref={ref} modal>
		<PopupHeader title="Load Columns" ref={ref} />
		<div className="load-saved">
			{props.closedColumns.map((column, i) => <div key={i}>
				<SVGButton
					label={column.first.label || `Saved Column ${i + 1}`}
					onClick={() => {
						let chosenColumn = props.closedColumns[i];

						props.setColumns(columns => ColumnListUtils.transfer(columns, chosenColumn));
						props.setClosedColumns(closedColumns => ColumnListUtils.remove(closedColumns, chosenColumn));
					}}
				/>
			</div>)}
		</div>
	</Popup>
}