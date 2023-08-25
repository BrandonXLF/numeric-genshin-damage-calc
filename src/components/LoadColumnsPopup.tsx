import React, { useEffect } from "react";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import SVGButton from "./SVGButton";
import '../less/LoadColumnsPopup.less';
import LoadSVG from "../svgs/LoadSVG";
import InputDetails from "../types/InputDetails";
import PopupHeader from "./PopupHeader";
import ColumnUtils from "../utils/ColumnUtils";

export default function LoadColumnsPopup(props: {
	columns: InputDetails[];
	setColumns: React.Dispatch<React.SetStateAction<InputDetails[]>>;
	closedColumns: InputDetails[];
	setClosedColumns: React.Dispatch<React.SetStateAction<InputDetails[]>>;
}) {
	const ref = React.useRef<PopupActions>(null);
	
	useEffect(() => {
		if (ref.current && !props.closedColumns.length)
			ref.current.close();
	});
	
	return <Popup trigger={
		<SVGButton
			svg={<LoadSVG />}
			label="Load Saved"
			disabled={!props.closedColumns.length}
		/>
	} ref={ref} modal>
		<PopupHeader title="Load Columns" ref={ref} />
		<div className="load-columns">
			{props.closedColumns.map((inputDetails, i) => <div key={i}>
				<SVGButton
					label={inputDetails.label || `Saved Column ${i + 1}`}
					onClick={() => {
						let chosenColumn = props.closedColumns[i];

						props.setClosedColumns(closedColumns => ColumnUtils.remove(closedColumns, chosenColumn));
						props.setColumns(columns => ColumnUtils.transfer(columns, chosenColumn));
					}}
				/>
			</div>)}
		</div>
	</Popup>
}