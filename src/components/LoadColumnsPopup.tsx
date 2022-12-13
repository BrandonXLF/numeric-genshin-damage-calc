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
}) {
	const ref = React.useRef<PopupActions>(null);
	
	let allEnabled = !props.columns.some(inputDetails => !inputDetails.shown);
	
	useEffect(() => {
		if (ref.current && allEnabled)
			ref.current.close();
	});
	
	return <Popup trigger={
		<SVGButton
			svg={<LoadSVG />}
			label="Load Column"
			disabled={allEnabled}
		/>
	} ref={ref} modal>
		<div>
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
				{props.columns.map((inputDetails, i) =>
					!inputDetails.shown && <div key={i}>
						<SVGButton
							label={`${i} - ${inputDetails.label || 'Unnamed'}`}
							onClick={() => {
								let newColumns = [...props.columns];
								
								newColumns[i].shown = true;
								
								props.setColumns(newColumns);
							}}
						/>
					</div>
				)}
			</div>
		</div>
	</Popup>
}