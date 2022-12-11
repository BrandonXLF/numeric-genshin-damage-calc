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

export default function CalculatorForm() {
	let [allInputDetails, setAllInputDetails] = React.useState<InputDetails[]>(() => {
		let storedInputDetails: StoredInputDetails[] = JSON.parse(localStorage.getItem('GIDC-data') || '[]');
		
		storedInputDetails[0] = storedInputDetails[0] ?? [];
		
		return storedInputDetails.map(storedInputDetail => createInputDetails(storedInputDetail));
	});
	
	let damages = allInputDetails.map(({statData, reactionType, reaction}) =>
		new DamageCalculator(statData, reactionType, reaction).calculateDamage()
	);
	
	let headerSpan = allInputDetails.length + 1;
	
	useEffect(() => {
		let allStoredInputDetails = [...allInputDetails] as StoredInputDetails[];
		
		localStorage.setItem('GIDC-data', JSON.stringify(allStoredInputDetails));
	}, [allInputDetails]);

	return <section className="center-items form-section">
		<TopButtonRow allInputDetails={allInputDetails} setAllInputDetails={setAllInputDetails} />
		<form className="grid" style={{
			gridTemplateColumns: `max-content repeat(${allInputDetails.length}, 1fr)`
		}}>
			<HeadingRow title="General" span={1} />
			<RemoveColumnRow allInputDetails={allInputDetails} setAllInputDetails={setAllInputDetails} />
			<DamageTypeRow allInputDetails={allInputDetails} setAllInputDetails={setAllInputDetails} />
			{statSections.map(statSection =>
				<CalculatorSection key={statSection.value} section={statSection} headerSpan={headerSpan} allInputDetails={allInputDetails} setAllInputDetails={setAllInputDetails} />
			)}
			<HeadingRow title="Damage" span={headerSpan} />
			<DamageOutputRow title="CRIT Hit" damages={damages} prop="crit" />
			<DamageOutputRow title="Non-CRIT" damages={damages} prop="nonCrit" />
			<DamageOutputRow title="Average" damages={damages} prop="avgDmg" />
		</form>
	</section>;
}