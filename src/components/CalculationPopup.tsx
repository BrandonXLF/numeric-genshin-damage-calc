import React from "react";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import CalculatorSVG from "../svgs/CalculatorSVG";
import SVGButton from "./SVGButton";
import Damage from "../types/Damage";
import AttackList from "./AttackList";
import EquationLine from "./EquationLine";
import PopupHeader from "./PopupHeader";

export default function CalculationPopup(props: {
	damages: Damage[];
	current: number;
	prop: keyof Damage;
}) {
	const ref = React.useRef<PopupActions>(null);
	const [shown, setShown] = React.useState(props.current);
	
	return <Popup trigger={
		<SVGButton svg={<CalculatorSVG />} label="Show Calculations" hideLabel={true} mini={true} />
	} ref={ref} modal onOpen={() => setShown(props.current)}>
		<PopupHeader title="Calculations" ref={ref} />
		<div className="calc">
			<span>Attack: </span>
			<AttackList attacks={props.damages} active={shown} setActive={setShown} />
		</div>
		<EquationLine equation={props.damages[shown][props.prop]!} />
	</Popup>
}