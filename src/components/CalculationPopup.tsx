import React from "react";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import CalculatorSVG from "../svgs/CalculatorSVG";
import SVGButton from "./SVGButton";
import AttackList from "./AttackList";
import EquationLine from "./EquationLine";
import PopupHeader from "./PopupHeader";
import Column from "../utils/Column";
import '../less/CalculationPopup.less';
import DisplayedProp from "../types/DisplayedProp";
import DamageData from "../types/DamageData";
import displayDamage from "../utils/displayDamage";

export default function CalculationPopup(props: Readonly<{
	column: Column;
	displayedProp: DisplayedProp<DamageData>;
	value: number;
	error?: boolean;
}>) {
	const ref = React.useRef<PopupActions>(null);
	const [shown, setShown] = React.useState(props.column.activeIndex);
	
	return <Popup trigger={
		<SVGButton svg={<CalculatorSVG className={props.error ? 'neg' : ''} />} label="Show Calculations" hideLabel={true} mini={true} />
	} ref={ref} modal onOpen={() => setShown(props.column.activeIndex)}>
		<PopupHeader title="Calculations" ref={ref} />
		<div className="row">
			{props.displayedProp.name} {displayDamage(props.value)}
		</div>
		<div className="labelled-row">
			<span>Attack: </span>
			<AttackList attacks={props.column.attacks} activeIndex={shown} setActive={(_, i) => setShown(i)} />
		</div>
		<EquationLine equation={props.column.attacks[shown].damage.getWithDefault(props.displayedProp.prop)} />
	</Popup>
}