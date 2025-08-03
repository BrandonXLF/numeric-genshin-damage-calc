import React from "react";
import Column from "../utils/Column";
import RowLabel from "./RowLabel";
import FormInput from "./FormInput";
import '../less/DamageTypeRow.less';
import { ColumnStateAction } from "../types/ColumnState";
import reactionTypes from "../utils/reactionTypes";
import { topDescs } from "../utils/topDescs";

export default function DamageTypeRow(props: Readonly<{
	columns: Column[];
	dispatch: React.Dispatch<ColumnStateAction>;
}>) {
	return <>
		<RowLabel label="Reaction" desc={topDescs.get('Reaction')} wide />
		{props.columns.map(column => {
			const reaction = reactionTypes.get(column.active.reactionType)?.reactions.get(column.active.reaction);

			return <FormInput
				key={column.id}
				class="damage-type"
				value={`${column.active.reactionType},${column.active.reaction}`}
				style={{
					color: reaction?.color ?? 'white'
				}} 
				onChange={value => props.dispatch({
					type: 'modifyAttack',
					colId: column.id,
					atkId: column.active.id,
					modifier: attack => {
						[
							attack.reactionType,
							attack.reaction
						] = value.split(',').map(Number);

						attack.secondaryType = 0;
						attack.secondary = 0;
					}
				})}
				options={
					[...reactionTypes.entries().map(([id, damageType]) => ({
						label: damageType.name,
						options: [...damageType.reactions.entries().map(([subID, damageSubType]) => ({
							name: damageSubType.name,
							value: `${id},${subID}`,
							style: { color: damageSubType.color ?? 'white' }
						}))]
					}))]
				}
			/>;
		})}
	</>;
}