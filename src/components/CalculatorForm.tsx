import React, { useEffect } from "react";
import DamageCalculator from "../utils/DamageCalculator";
import DamageOutputRow from "./DamageOutputRow";
import DamageTypeRow from "./DamageTypeRow";
import HeadingRow from "./HeadingRow";
import InputDetails, { StoredInputDetails } from "../types/InputDetails";
import createInputDetails from "../utils/createInputDetails";
import '../css/CalculatorForm.css';
import TopButtonRow from "./TopButtonRow";
import RemoveColumnRow from "./RemoveColumnRow";
import statSections from "../utils/statSections";
import CalculatorSection from "./CalculatorSection";
import LabelRow from "./LabelRow";
import damageTypes from "../utils/damageTypes";

export default function CalculatorForm() {
	let [columns, setColumns] = React.useState<InputDetails[]>(() => {
		let storedColumns = (JSON.parse(localStorage.getItem('GIDC-data') || '[]') as StoredInputDetails[])
			.filter(storedInputDetails => storedInputDetails.shown);
		
		storedColumns[0] = storedColumns[0] ?? [];
		
		return storedColumns.map(createInputDetails);
	});
	
	let [closedColumns, setClosedColumns] = React.useState<InputDetails[]>(() => {
		let storedClosedColumns = (JSON.parse(localStorage.getItem('GIDC-data') || '[]') as StoredInputDetails[])
			.filter(storedInputDetails => !storedInputDetails.shown);
		
		return storedClosedColumns.map(createInputDetails);
	});
	
	let damages = columns.map(({statData, reactionType, reaction}) =>
		new DamageCalculator(statData, reactionType, reaction).calculateDamage()
	);
	
	useEffect(() => {
		localStorage.setItem('GIDC-data', JSON.stringify([
			...(columns as StoredInputDetails[]).map(inputDetails => {
				inputDetails.shown = true;
				return inputDetails;
			}),
			...(closedColumns as StoredInputDetails[]).map(inputDetails => {
				inputDetails.shown = false;
				return inputDetails;
			})
		]));
	}, [columns, closedColumns]);

	return <section className="form-section">
		<TopButtonRow columns={columns} setColumns={setColumns} closedColumns={closedColumns} setClosedColumns={setClosedColumns} />
		<div className="center-items grid-container">
			<form className="grid" style={{
				gridTemplateColumns: `max-content repeat(${columns.length}, 1fr)`
			}}>
				<HeadingRow title="General" span={1} />
				<RemoveColumnRow columns={columns} setColumns={setColumns} closedColumns={closedColumns} setClosedColumns={setClosedColumns} />
				<LabelRow columns={columns} setColumns={setColumns} />
				<DamageTypeRow columns={columns} setColumns={setColumns} />
				{statSections.map(statSection =>
					<CalculatorSection key={statSection.value} section={statSection} headerSpan={columns.length + 1} columns={columns} setColumns={setColumns} />
				)}
				<HeadingRow title="Damage" span={columns.length + 1} />
				{damageTypes.map(damageType =>
					<DamageOutputRow damageType={damageType} damages={damages} />
				)}
			</form>
		</div>
	</section>;
}