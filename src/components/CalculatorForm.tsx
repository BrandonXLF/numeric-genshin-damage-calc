import { useEffect, useReducer } from "react";
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
import columnListReducer from "../utils/columnListReducer";
import ColumnStorage from "../utils/ColumnStorage";

export default function CalculatorForm() {
	let [columnState, dispatchColumnState] = useReducer(columnListReducer, undefined, () => ColumnStorage.load());
	useEffect(() => ColumnStorage.save(columnState), [columnState]);

	const columns = columnState.shown.columns;

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
					<DamageOutputRow key={damageType.prop} damageType={damageType} columns={columns} />
				)}
			</form>
		</div>
	</section>;
}