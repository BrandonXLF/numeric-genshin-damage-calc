import React, { useEffect, useMemo } from "react";
import DamageCalculator from "../utils/DamageCalculator";
import DamageOutputRow from "./DamageOutputRow";
import DamageTypeRow from "./DamageTypeRow";
import HeadingRow from "./HeadingRow";
import AttacksRow from "./AttacksRow";
import Column from "../utils/Column";
import '../less/CalculatorForm.less';
import TopButtonRow from "./TopButtonRow";
import RemoveColumnRow from "./RemoveColumnRow";
import statSections from "../utils/statSections";
import CalculatorSection from "./CalculatorSection";
import LabelRow from "./LabelRow";
import damageTypes from "../utils/damageTypes";
import ColumnListUtils from "../utils/ColumnListUtils";

export default function CalculatorForm() {
	let [columns, setColumns] = React.useState<Column[]>(() => ColumnListUtils.loadFromStorage(true, true));
	let [closedColumns, setClosedColumns] = React.useState<Column[]>(() => ColumnListUtils.loadFromStorage(false));
	
	let columnDamages = useMemo(() => columns.map(column => {
		let damages = column.attacks.map(
			({statData, reactionType, reaction})=> new DamageCalculator(statData, reactionType, reaction).calculateDamage()
		);

		return { items: damages, activeIndex: column.activeIndex };
	}), [columns]);
	
	useEffect(
		() => ColumnListUtils.saveToStorage(columns, closedColumns),
		[columns, closedColumns]
	);

	return <section className="form-section">
		<TopButtonRow columns={columns} setColumns={setColumns} closedColumns={closedColumns} setClosedColumns={setClosedColumns} />
		<div className="center-items grid-container">
			<form className={`grid${columns.length === 1 ? ' wide-inputs' : ''}`} style={{
				gridTemplateColumns: `max-content repeat(${columns.length}, 1fr)`
			}}>
				<HeadingRow title="General" span={1} />
				<RemoveColumnRow columns={columns} setColumns={setColumns} closedColumns={closedColumns} setClosedColumns={setClosedColumns} />
				<LabelRow columns={columns} setColumns={setColumns} />
				<AttacksRow columns={columns} setColumns={setColumns} />
				<DamageTypeRow columns={columns} setColumns={setColumns} />
				{statSections.map(statSection =>
					<CalculatorSection key={statSection.value} section={statSection} headerSpan={columns.length + 1} columns={columns} setColumns={setColumns} />
				)}
				<HeadingRow title="Damage" span={columns.length + 1} />
				{damageTypes.map(damageType =>
					<DamageOutputRow key={damageType.prop} damageType={damageType} columnDamages={columnDamages} />
				)}
			</form>
		</div>
	</section>;
}