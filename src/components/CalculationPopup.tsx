import React from "react";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import CalculatorSVG from "../svgs/CalculatorSVG";
import CloseSVG from "../svgs/CloseSVG";
import SVGButton from "./SVGButton";
import '../css/CalculationPopup.css';
import { EquationRecord } from "../types/VariableOutput";
import EquationLine from "./EquationLine";

export default function CalculationPopup(props: {
	calcs: EquationRecord;
}) {
	const ref = React.useRef<PopupActions>(null);
	
	return <Popup trigger={
		<SVGButton svg={<CalculatorSVG />} label="Show Calculations" hideLabel={true} mini={true} />
	} ref={ref} modal>
		<div className="calculation-popup-top">
			<h2>Calculations</h2>
			<SVGButton
				svg={<CloseSVG className="neg" />}
				label="Close"
				hideLabel={true}
				onClick={() => ref.current?.close()}
			/>
		</div>
		<EquationLine record={props.calcs} />
	</Popup>
}