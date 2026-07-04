import React from "react";
import Column from "../utils/Column";
import RowLabel from "./RowLabel";
import FormInput from "./FormInput";
import '../less/DamageTypeRow.less';
import { ColumnStateAction } from "../types/ColumnState";
import reactionTypes from "../utils/reactionTypes";
import { topDescs } from "../utils/topDescs";

export default function ContributorRow(props: Readonly<{
	columns: Column[];
	dispatch: React.Dispatch<ColumnStateAction>;
}>) {
	let anyEnabled = false;

	const dropdowns = props.columns.map(column => {
		const reactionType = reactionTypes.get(column.active.reactionType);
		const enabled = reactionType?.multiContributor ?? false;

		anyEnabled ||= enabled;
		
		return <FormInput
			key={column.id}
			class="damage-type"
			disabled={!enabled}
			value={`${column.active.contributorNum ?? 1}`}
			onChange={value => props.dispatch({
				type: 'modifyAttack',
				colId: column.id,
				atkId: column.active.id,
				modifier: attack => {
					attack.contributorNum = Number(value);
				}
			})}
			options={[
				{ name: "1st", value: "1" },
				{ name: "2nd", value: "2" },
				{ name: "3rd", value: "3" },
				{ name: "4th", value: "4" },
				{ name: "Use for All", value: "-1" },
			]}
		/>
	});

	if (!anyEnabled) return null;

	return <>
		<RowLabel label="Contributor" desc={topDescs.get('Contributor')} wide />
		{dropdowns}
	</>;
}