import React from "react";
import SVGButton from "./SVGButton";
import AddSVG from "../svgs/AddSVG";
import Column from "../utils/Column";
import AttackList from "./AttackList";
import '../less/FormInput.less';
import '../less/AttacksRow.less';
import RowLabel from "./RowLabel";
import { ColumnStateAction } from "../utils/columnListReducer";

export default function AttacksRow(props: Readonly<{
	columns: Column[],
	dispatch: React.Dispatch<ColumnStateAction>;
}>) {
	return <>
        <RowLabel label="Attack" desc="Individual damage instances that contribute to the final calculated damage" />
		{props.columns.map((column, colIndex) => <div key={colIndex} className="form-width column-attacks">
            <AttackList
                attacks={column.attacks}
                active={column.activeIndex}
                setActive={atkIndex => props.dispatch({
                    type: 'setActiveAttack',
                    column,
                    attack: column.attacks[atkIndex]
                })}
                deleteAttack={atkIndex => props.dispatch({
                    type: 'removeAttack',
                    column,
                    attack: column.attacks[atkIndex]
                })}
            />
            <SVGButton
                svg={<AddSVG className="pos" />}
                label="Add"
                mini
                hideLabel
                onClick={() => props.dispatch({
                    type: 'addAttack',
                    column,
                    attack: column.last
                })}
            />
		</div>)}
	</>;
}