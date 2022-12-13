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

export default function CalculatorForm() {
	let [columns, setColumns] = React.useState<InputDetails[]>(() => {
		let storedColumns: StoredInputDetails[] = JSON.parse(localStorage.getItem('GIDC-data') || '[]');
		
		storedColumns[0] = storedColumns[0] ?? [];
		
		return storedColumns.map(storedInputDetails => createInputDetails(storedInputDetails));
	});
	
	let shownColumns = columns.filter(inputDetails => inputDetails.shown);
	
	let damages = shownColumns.map(({statData, reactionType, reaction}) =>
		new DamageCalculator(statData, reactionType, reaction).calculateDamage()
	);
	
	useEffect(() => localStorage.setItem('GIDC-data', JSON.stringify(columns)), [columns]);

	return <section className="center-items form-section">
		<TopButtonRow columns={columns} setColumns={setColumns} />
		<form className="grid" style={{
			gridTemplateColumns: `max-content repeat(${shownColumns.length}, 1fr)`
		}}>
			<HeadingRow title="General" span={1} />
			<RemoveColumnRow columns={columns} setColumns={setColumns} />
			<LabelRow columns={columns} setColumns={setColumns} />
			<DamageTypeRow columns={columns} setColumns={setColumns} />
			{statSections.map(statSection =>
				<CalculatorSection key={statSection.value} section={statSection} headerSpan={shownColumns.length + 1} columns={columns} setColumns={setColumns} />
			)}
			<HeadingRow title="Damage" span={shownColumns.length + 1} />
			<DamageOutputRow title="CRIT Hit" damages={damages} prop="crit" />
			<DamageOutputRow title="Non-CRIT" damages={damages} prop="nonCrit" />
			<DamageOutputRow title="Average" damages={damages} prop="avgDmg" />
		</form>
	</section>;
}