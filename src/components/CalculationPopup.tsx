import React from "react";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import CalculatorSVG from "../svgs/CalculatorSVG";
import CloseSVG from "../svgs/CloseSVG";
import RecordEntry from "../types/RecordEntry";
import SVGButton from "./SVGButton";
import '../css/CalculationPopup.css';

export default function CalculationPopup(props: {
	calcs: Record<string, RecordEntry[]>;
}) {
	const ref = React.useRef<PopupActions>(null);
	
	return <Popup trigger={
		<SVGButton svg={<CalculatorSVG />} label="Show Calculations" hideLabel={true} mini={true} />
	} ref={ref} modal>
		<div>
			<div className="calculation-popup-top">
				<h2>Calculations</h2>
				<SVGButton
					svg={<CloseSVG className="neg" />}
					label="Close"
					hideLabel={true}
					onClick={() => ref.current?.close()}
				/>
			</div>
			{Object.entries(props.calcs).map(([key, row]) =>
				<div className="calc" key={key}>
					{row.map((entry, i) =>
						<span key={i} className={`calc-${entry.type}`}>{entry.value}</span>
					)}
				</div>
			)}
		</div>
	</Popup>
}