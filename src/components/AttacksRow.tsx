import React from "react";
import SVGButton from "./SVGButton";
import ColumnListUtils from "../utils/ColumnListUtils";
import AddSVG from "../svgs/AddSVG";
import Column from "../utils/Column";
import AttackList from "./AttackList";
import '../less/FormInput.less';
import '../less/AttacksRow.less';
import RowLabel from "./RowLabel";

export default function AttacksRow(props: {
	columns: Column[],
	setColumns: (value: React.SetStateAction<Column[]>) => void
}) {
	return <>
        <RowLabel label="Attack" desc="Individual damage instances that contribute to the final calculated damage" />
		{props.columns.map((column, colIndex) => <div key={colIndex} className="form-width column-attacks">
            <AttackList
                attacks={column.attacks}
                active={column.activeIndex}
                setActive={atkIndex => {
                    const attack = column.attacks[atkIndex];
                    props.setColumns(columns => ColumnListUtils.setActiveAttack(columns, column, attack));
                }}
                deleteAttack={atkIndex => {
                    const attack = column.attacks[atkIndex];
                    props.setColumns(columns => ColumnListUtils.removeAttack(columns, column, attack));
                }}
            />
            <SVGButton
                svg={<AddSVG className="pos" />}
                label="Add"
                mini
                hideLabel
                onClick={() => {
                    props.setColumns(columns => ColumnListUtils.addAttack(columns, column, column.last));
                }}
            />
		</div>)}
	</>;
}