import React, { useEffect } from "react";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import CloseSVG from "../svgs/CloseSVG";
import SVGButton from "./SVGButton";
import '../css/LoadColumnsPopup.css';
import LoadSVG from "../svgs/LoadSVG";
import InputDetails from "../types/InputDetails";

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
		<div className="load-columns-popup-top">
			<h2>Load Columns</h2>
			<SVGButton
				svg={<CloseSVG className="neg" />}
				label="Close"
				hideLabel={true}
				onClick={() => ref.current?.close()}
			/>
		</div>
		<div className="load-columns-popup-body">
			{props.closedColumns.map((inputDetails, i) =>
				<div key={i}>
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
				</div>
			)}
		</div>
	</Popup>
}