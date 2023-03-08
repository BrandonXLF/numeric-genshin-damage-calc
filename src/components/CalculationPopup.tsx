import React from "react";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import CalculatorSVG from "../svgs/CalculatorSVG";
import SVGButton from "./SVGButton";
import { EquationRecord } from "../types/VariableOutput";
import EquationLine from "./EquationLine";
import PopupHeader from "./PopupHeader";

export default function CalculationPopup(props: {
	calcs: EquationRecord;
}) {
	const ref = React.useRef<PopupActions>(null);
	
	return <Popup trigger={
		<SVGButton svg={<CalculatorSVG />} label="Show Calculations" hideLabel={true} mini={true} />
	} ref={ref} modal>
		<PopupHeader title="Calculations" ref={ref} />
		<EquationLine record={props.calcs} />
	</Popup>
}