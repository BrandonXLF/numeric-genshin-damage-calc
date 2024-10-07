import { useEffect, useMemo, useReducer } from "react";
import DamageCalculator from "../utils/DamageCalculator";
import DamageOutputRow from "./DamageOutputRow";
import DamageTypeRow from "./DamageTypeRow";
import HeadingRow from "./HeadingRow";
import AttacksRow from "./AttacksRow";
import '../less/CalculatorForm.less';
import TopButtonRow from "./TopButtonRow";
import RemoveColumnRow from "./RemoveColumnRow";
import statSections from "../utils/statSections";
import CalculatorSection from "./CalculatorSection";
import LabelRow from "./LabelRow";
import damageTypes from "../utils/damageTypes";
import ColumnListUtils from "../utils/ColumnListUtils";
import columnListReducer from "../utils/columnListReducer";

export default function CalculatorForm() {
	let [columnState, dispatchColumnState] = useReducer(columnListReducer, {
		shown: ColumnListUtils.loadFromStorage(true, true),
		closed: ColumnListUtils.loadFromStorage(false)
	});
	const columns = columnState.shown;
	
	let columnDamages = useMemo(() => columns.map(column => {
		let damages = column.attacks.map(
			({statData, reactionType, reaction}) => new DamageCalculator(statData, reactionType, reaction).calculateDamage()
		);

		return { items: damages, activeIndex: column.activeIndex };
	}), [columns]);
	
	useEffect(
		() => ColumnListUtils.saveToStorage(columns, columnState.closed),
		[columns, columnState.closed]
	);

	return <section className="form-section">
		<TopButtonRow state={columnState} dispatch={dispatchColumnState} />
		<div className="center-items grid-container">
			<form className={`grid${columns.length === 1 ? ' wide-inputs' : ''}`} style={{
				gridTemplateColumns: `max-content repeat(${columns.length}, auto)`
			}}>
				<HeadingRow title="General" span={1} />
				<RemoveColumnRow columns={columns} dispatch={dispatchColumnState} />
				<LabelRow columns={columns} dispatch={dispatchColumnState} />
				<AttacksRow columns={columns} dispatch={dispatchColumnState} />
				<DamageTypeRow columns={columns} dispatch={dispatchColumnState}  />
				{statSections.map(statSection =>
					<CalculatorSection key={statSection.value} section={statSection} headerSpan={columns.length + 1} columns={columns} dispatch={dispatchColumnState} />
				)}
				<HeadingRow title="Damage" span={columns.length + 1} />
				{damageTypes.map(damageType =>
					<DamageOutputRow key={damageType.prop} damageType={damageType} columnDamages={columnDamages} />
				)}
			</form>
		</div>
	</section>;
}