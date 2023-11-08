import React, { useEffect } from "react";
import DamageCalculator from "../utils/DamageCalculator";
import DamageOutputRow from "./DamageOutputRow";
import DamageTypeRow from "./DamageTypeRow";
import HeadingRow from "./HeadingRow";
import AttacksRow from "./AttacksRow";
import Group from "../utils/Group";
import '../less/CalculatorForm.less';
import TopButtonRow from "./TopButtonRow";
import RemoveColumnRow from "./RemoveColumnRow";
import statSections from "../utils/statSections";
import CalculatorSection from "./CalculatorSection";
import LabelRow from "./LabelRow";
import damageTypes from "../utils/damageTypes";
import GroupListUtils from "../utils/GroupListUtils";

export default function CalculatorForm() {
	let [groups, setGroups] = React.useState<Group[]>(() => GroupListUtils.loadFromStorage(true, true));
	let [closedGroups, setClosedGroups] = React.useState<Group[]>(() => GroupListUtils.loadFromStorage(false));
	
	let groupDamages = groups.map(group => {
		let damages = group.items.map(
			({statData, reactionType, reaction})=> new DamageCalculator(statData, reactionType, reaction).calculateDamage()
		);

		return { items: damages, activeIndex: group.activeIndex };
	});
	
	useEffect(
		() => GroupListUtils.saveToStorage(groups, closedGroups),
		[groups, closedGroups]
	);

	return <section className="form-section">
		<TopButtonRow groups={groups} setGroups={setGroups} closedGroups={closedGroups} setClosedGroups={setClosedGroups} />
		<div className="center-items grid-container">
			<form className={`grid${groups.length === 1 ? ' wide-inputs' : ''}`} style={{
				gridTemplateColumns: `max-content repeat(${groups.length}, 1fr)`
			}}>
				<HeadingRow title="General" span={1} />
				<RemoveColumnRow groups={groups} setGroups={setGroups} closedGroups={closedGroups} setClosedGroups={setClosedGroups} />
				<LabelRow groups={groups} setGroups={setGroups} />
				<AttacksRow groups={groups} setGroups={setGroups} />
				<DamageTypeRow groups={groups} setGroups={setGroups} />
				{statSections.map(statSection =>
					<CalculatorSection key={statSection.value} section={statSection} headerSpan={groups.length + 1} groups={groups} setGroups={setGroups} />
				)}
				<HeadingRow title="Damage" span={groups.length + 1} />
				{damageTypes.map(damageType =>
					<DamageOutputRow key={damageType.prop} damageType={damageType} groupDamages={groupDamages} />
				)}
			</form>
		</div>
	</section>;
}