import React from "react";
import DamageCalculator from "../utils/DamageCalculator";
import Group from "../utils/Group";
import RowLabel from "./RowLabel";
import FormInput from "./FormInput";
import '../less/DamageTypeRow.less';

export default function DamageTypeRow(props: {
	groups: Group[];
	setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
}) {
	return <>
		<RowLabel label="Reaction" />
		{props.groups.map((group, i) => <FormInput
			key={i}
			class="damage-type"
			value={`${group.active.reactionType},${group.active.reaction}`}
			style={{
				color: DamageCalculator.reactionTypes[group.active.reactionType].reactions[group.active.reaction].color ?? 'white'
			}} 
			onChange={value => {
				let newGroups = [...props.groups];
				
				[
					newGroups[i].active.reactionType,
					newGroups[i].active.reaction
				] = value.split(',').map(Number);
				
				newGroups[i].active.unmodified = false;
			
				props.setGroups(newGroups);
			}}
			options={
				DamageCalculator.reactionTypes.map((damageType, i) => ({
					label: damageType.name,
					options: damageType.reactions.map((damageSubType, j) => ({
						name: damageSubType.name,
						value: `${i},${j}`,
						style: { color: damageSubType.color ?? 'white' }
					}))
				}))
			}
		/>
	)}</>;
}