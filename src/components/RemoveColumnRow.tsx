import React from "react";
import DeleteSVG from "../svgs/DeleteSVG";
import SaveSVG from "../svgs/SaveSVG";
import Group from "../utils/Group";
import SVGButton from "./SVGButton";
import GroupListUtils from "../utils/GroupListUtils";
import CopySVG from "../svgs/CopySVG";

export default function RemoveColumnRow(props: {
	groups: Group[];
	setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
	closedGroups: Group[];
	setClosedGroups: React.Dispatch<React.SetStateAction<Group[]>>;
}) {
	return <>
		{props.groups.map((_, i) =>
			<div key={i} className="column-top">
				<SVGButton
					svg={<SaveSVG />}
					label="Save and Close Column"
					hideLabel={true}
					onClick={() => {
						let chosenGroup = props.groups[i];
						
						props.setGroups(groups => GroupListUtils.remove(groups, chosenGroup, true));
						props.setClosedGroups(closedGroups => GroupListUtils.transfer(closedGroups, chosenGroup));
					}}
				/>
				<SVGButton
					svg={<CopySVG />}
					label="Duplicate Column"
					hideLabel={true}
					onClick={() => {
						let chosenGroup = props.groups[i];
						
						props.setGroups(groups => GroupListUtils.duplicate(groups, chosenGroup));
					}}
				/>
				<SVGButton
					svg={<DeleteSVG className="neg" />}
					label="Delete Column"
					hideLabel={true}
					onClick={() => {
						let chosenGroup = props.groups[i];
						
						props.setGroups(groups => GroupListUtils.remove(groups, chosenGroup, true));
					}}
				/>
			</div>
		)}
	</>;
}