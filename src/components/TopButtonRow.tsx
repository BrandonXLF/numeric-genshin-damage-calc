import Group from "../utils/Group";
import React from 'react';
import SVGButton from "./SVGButton";
import AddSVG from "../svgs/AddSVG";
import LoadColumnsPopup from "./LoadColumnsPopup";
import '../less/TopButtonRow.less';
import ImportPopup from "./ImportPopup";
import GroupListUtils from "../utils/GroupListUtils";

export default function TopButtonRow(props: {
	groups: Group[];
	setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
	closedGroups: Group[];
	setClosedGroups: React.Dispatch<React.SetStateAction<Group[]>>;
}) {
	return <div className="form-top">
		<SVGButton
			svg={<AddSVG className="pos" />}
			label="Add Column"
			onClick={() => props.setGroups(columns => GroupListUtils.add(columns))}
		/>
		<LoadColumnsPopup
			groups={props.groups}
			setGroups={props.setGroups}
			closedGroups={props.closedGroups}
			setClosedGroups={props.setClosedGroups}
		/>
		<ImportPopup setGroups={props.setGroups} />
	</div>;
}