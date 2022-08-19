import React from "react";
import DamageCalculator from "../utils/DamageCalculator";
import Stats from "../utils/Stats";
import DamageOutputRow from "./DamageOutputRow";
import StatInputRow from "./StatInputRow";
import DamageTypeRow from "./DamageTypeRow";
import HeadingRow from "./HeadingRow";
import InputDetails from "../types/InputDetails";
import createInputDetails from "../utils/CreateInputDetails";

import '../css/CalculatorForm.css';
import TopButtonRow from "./TopButtonRow";
import RemoveColumnRow from "./RemoveColumnRow";

export default function CalculatorForm() {
	let [allInputDetails, setAllInputDetails] = React.useState<InputDetails[]>([createInputDetails()]);
	
	let damages = allInputDetails.map(({characterData, enemyData, damageType}) => {
		let damageCalculator = new DamageCalculator(characterData, enemyData);
		
		return damageCalculator.calculateDamage(damageType);
	});
	
	let headerSpan = allInputDetails.length * 2 + 2;

	return <section className="center-items form-section">
		<TopButtonRow allInputDetails={allInputDetails} setAllInputDetails={setAllInputDetails} />
		<form className="grid" style={{
			gridTemplateColumns: `max-content max-content repeat(${allInputDetails.length}, max-content 1fr)`
		}}>
			<HeadingRow title="General" span={4} />
			<RemoveColumnRow allInputDetails={allInputDetails} setAllInputDetails={setAllInputDetails} />
			<DamageTypeRow allInputDetails={allInputDetails} setAllInputDetails={setAllInputDetails} />
			<HeadingRow title="Character" span={headerSpan} />
			{Stats.characterStats.map(stat =>
				<StatInputRow  key={stat.name} dataType="characterData" stat={stat} allInputDetails={allInputDetails} setAllInputDetails={setAllInputDetails} />
			)}
			<HeadingRow title="Enemy" span={headerSpan} />
			{Stats.enemyStats.map(stat =>
				<StatInputRow  key={stat.name} dataType="enemyData" stat={stat} allInputDetails={allInputDetails} setAllInputDetails={setAllInputDetails} />
			)}
			<HeadingRow title="Damage" span={headerSpan} />
			<DamageOutputRow title="Crit Hit Damage" damages={damages} prop="crit" />
			<DamageOutputRow title="Non-Crit Damage" damages={damages} prop="nonCrit" />
			<DamageOutputRow title="Average Damage" damages={damages} prop="avgDmg" />
		</form>
	</section>;
}