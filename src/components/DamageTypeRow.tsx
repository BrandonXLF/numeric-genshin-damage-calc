import React from "react";
import DamageCalculator from "../utils/DamageCalculator";
import Column from "../utils/Column";
import RowLabel from "./RowLabel";
import FormInput from "./FormInput";
import '../less/DamageTypeRow.less';
import { ColumnStateAction } from "../types/ColumnState";

export default function DamageTypeRow(props: Readonly<{
	columns: Column[];
	dispatch: React.Dispatch<ColumnStateAction>;
}>) {
	return <>
		<RowLabel label="Reaction" />
		{props.columns.map(column => <FormInput
			key={column.id}
			class="damage-type"
			value={`${column.active.reactionType},${column.active.reaction}`}
			style={{
				color: DamageCalculator.reactionTypes.get(column.active.reactionType)!.reactions.get(column.active.reaction)?.color ?? 'white'
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
				}
			})}
			options={
				[...DamageCalculator.reactionTypes.entries().map(([id, damageType]) => ({
					label: damageType.name,
					options: [...damageType.reactions.entries().map(([subId, damageSubType]) => ({
						name: damageSubType.name,
						value: `${id},${subId}`,
						style: { color: damageSubType.color ?? 'white' }
					}))]
				}))]
			}
		/>
	)}</>;
}