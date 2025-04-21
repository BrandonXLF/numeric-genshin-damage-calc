import React from "react";
import Column from "../utils/Column";
import RowLabel from "./RowLabel";
import FormInput from "./FormInput";
import '../less/DamageTypeRow.less';
import { ColumnStateAction } from "../types/ColumnState";
import reactionTypes from "../utils/reactionTypes";

export default function SecondaryReactionRow(props: Readonly<{
	columns: Column[];
	dispatch: React.Dispatch<ColumnStateAction>;
}>) {
	const typePairs = [...reactionTypes.entries()];
	let anyEnabled = false;

	const dropdowns = props.columns.map(column => {
		const reaction = reactionTypes.get(column.active.reactionType)?.reactions.get(column.active.reaction);
		const enabled = reaction?.canApply ?? false;

		anyEnabled ||= enabled;
		
		return <FormInput
			key={column.id}
			class="damage-type"
			disabled={!enabled}
			value={`${column.active.secondaryType},${column.active.secondary}`}
			style={{ color: reactionTypes.get(column.active.secondaryType)?.reactions.get(column.active.secondary)?.color ?? 'white' }} 
			onChange={value => props.dispatch({
				type: 'modifyAttack',
				colId: column.id,
				atkId: column.active.id,
				modifier: attack => {
					[
						attack.secondaryType,
						attack.secondary
					] = value.split(',').map(Number);
				}
			})}
			options={
				typePairs
					.filter(([id]) => id !== 2)
					.map(([id, damageType]) => ({
						label: damageType.secondaryName ?? damageType.name,
						options: [...damageType.reactions.entries()]
							.filter(([_, damageSubType]) =>
								damageSubType?.element === reaction?.element || damageSubType?.element === 'Varies' || reaction?.element === 'Varies'
							)
							.map(([subID, damageSubType]) => ({
								name: damageSubType.secondaryName ?? damageSubType.name,
								value: `${id},${subID}`,
								style: { color: damageSubType.color ?? 'white' }
							}))
					}))
					.filter(({ options }) => options.length > 0)
			}
		/>
	});

	if (!anyEnabled) return null;

	return <>
		<RowLabel label="Secondary Reaction" desc="When reactions apply an element to adjacent entities, those applications can trigger reactions. The base damage is the damage of the original reaction." wide />
		{dropdowns}
	</>;
}