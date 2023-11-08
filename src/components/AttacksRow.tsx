import React from "react";
import SVGButton from "./SVGButton";
import GroupListUtils from "../utils/GroupListUtils";
import AddSVG from "../svgs/AddSVG";
import Group from "../utils/Group";
import ColumnList from "./ColumnList";
import '../less/FormInput.less';
import '../less/AttacksRow.less';
import RowLabel from "./RowLabel";

export default function AttacksRow(props: {
	groups: Group[],
	setGroups: (value: React.SetStateAction<Group[]>) => void
}) {
	return <>
        <RowLabel label="Attacks" desc="Individual damage instances that contribute to the final calculated damage" />
		{props.groups.map((group, groupIndex) => <div key={groupIndex} className="form-width group-columns">
            <ColumnList
                columns={group.items}
                active={group.activeIndex}
                setActive={colIndex => {
                    const column = group.items[colIndex];
                    props.setGroups(groups => GroupListUtils.setActiveColumn(groups, group, column));
                }}
                deleteColumn={colIndex => {
                    const column = group.items[colIndex];
                    props.setGroups(groups => GroupListUtils.removeColumn(groups, group, column));
                }}
            />
            <SVGButton
                svg={<AddSVG className="pos" />}
                label="Add"
                mini
                hideLabel
                onClick={() => {
                    props.setGroups(groups => GroupListUtils.addColumn(groups, group, group.last));
                }}
            />
		</div>)}
	</>;
}