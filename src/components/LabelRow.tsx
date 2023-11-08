import React from "react";
import Group from "../utils/Group";
import FormInput from "./FormInput";
import RowLabel from "./RowLabel";

export default function LabelRow(props: {
	groups: Group[];
	setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
}) {
	return <>
		<RowLabel label="Label" />
		{props.groups.map((group, i) => <FormInput
			key={i}
			value={group.first.label}
			onChange={value => {
				let newGroups = [...props.groups];
				
				newGroups[i].first.label = value;
				newGroups[i].first.unmodified = false;

				props.setGroups(newGroups);
			}}
		/>)}
	</>;
}