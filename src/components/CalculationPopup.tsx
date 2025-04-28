import React, { useEffect } from "react";
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
import AttacksExpr from "./AttacksExpr";

export default function CalculationPopup(props: Readonly<{
	column: Column;
	displayedProp: DisplayedProp<DamageData>;
	value: number;
	error?: boolean;
}>) {
	const ref = React.useRef<PopupActions>(null);
	const [shown, setShown] = React.useState(props.column.activeIndex);
	const [showExpr, setShowExpr] = React.useState(!!localStorage.getItem('GIDC-expr'));

	useEffect(() => {
		if (showExpr) {
			localStorage.setItem('GIDC-expr', '1');
		} else {
			localStorage.removeItem('GIDC-expr');
		}
	}, [showExpr]);

	return <Popup trigger={
		<SVGButton svg={<CalculatorSVG className={props.error ? 'neg' : ''} />} label="Show Calculations" hideLabel={true} mini={true} />
	} ref={ref} modal onOpen={() => setShown(props.column.activeIndex)} className="calc-popup">
		<PopupHeader title="Calculations" ref={ref} />
		<div className={`calc-popup-row top-row ${showExpr ? 'expanded' : ''}`}>
			<div>
				{props.displayedProp.name}: {displayDamage(props.value)}{showExpr && <>
					{' = '}
					<AttacksExpr attacks={props.column.attacks} prop={props.displayedProp.prop} />
				</>}
			</div>
			<label className="toggle-label">
				<input type="checkbox" checked={showExpr} onChange={() => setShowExpr(!showExpr)} />{' '}
				<span>Show Math Expression</span>
			</label>
		</div>
		<div className="calc-popup-row">
			<span>Attack: </span>
			<AttackList attacks={props.column.attacks} activeIndex={shown} setActive={(_, i) => setShown(i)} />
		</div>
		<EquationLine equation={props.column.attacks[shown].damage.getWithDefault(props.displayedProp.prop)} />
	</Popup>
}