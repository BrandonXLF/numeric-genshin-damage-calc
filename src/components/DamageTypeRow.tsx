import React from "react";
import DamageCalculator from "../utils/DamageCalculator";
import Column from "../utils/Column";
import RowLabel from "./RowLabel";
import FormInput from "./FormInput";
import '../less/DamageTypeRow.less';

export default function DamageTypeRow(props: {
	columns: Column[];
	setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}) {
	return <>
		<RowLabel label="Reaction" />
		{props.columns.map((column, i) => <FormInput
			key={i}
			class="damage-type"
			value={`${column.active.reactionType},${column.active.reaction}`}
			style={{
				color: DamageCalculator.reactionTypes[column.active.reactionType].reactions[column.active.reaction].color ?? 'white'
			}} 
			onChange={value => {
				let newColumns = [...props.columns];
				
				[
					newColumns[i].active.reactionType,
					newColumns[i].active.reaction
				] = value.split(',').map(Number);
				
				newColumns[i].active.unmodified = false;
			
				props.setColumns(newColumns);
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