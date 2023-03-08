import React, { useEffect } from "react";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import SVGButton from "./SVGButton";
import '../less/LoadColumnsPopup.less';
import LoadSVG from "../svgs/LoadSVG";
import InputDetails from "../types/InputDetails";
import PopupHeader from "./PopupHeader";

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
			label="Load Column"
			disabled={!props.closedColumns.length}
		/>
	} ref={ref} modal>
		<PopupHeader title="Load Columns" ref={ref} />
		<div className="load-columns">
			{props.closedColumns.map((inputDetails, i) => <div key={i}>
				<SVGButton
					label={inputDetails.label || `Saved Column ${i + 1}`}
					onClick={() => {
						let newColumns = [...props.columns];
						let newClosedColumns = [...props.closedColumns];
						
						newColumns.push(newClosedColumns.splice(i, 1)[0]);
						
						props.setColumns(newColumns);
						props.setClosedColumns(newClosedColumns);
					}}
				/>
			</div>)}
		</div>
	</Popup>
}