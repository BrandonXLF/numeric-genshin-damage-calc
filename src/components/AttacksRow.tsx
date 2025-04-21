import React from "react";
import SVGButton from "./SVGButton";
import AddSVG from "../svgs/AddSVG";
import Column from "../utils/Column";
import AttackList from "./AttackList";
import '../less/FormInput.less';
import '../less/AttacksRow.less';
import RowLabel from "./RowLabel";
import { ColumnStateAction } from "../types/ColumnState";

export default function AttacksRow(props: Readonly<{
	columns: Column[],
	dispatch: React.Dispatch<ColumnStateAction>;
}>) {
	return <>
        <RowLabel label="Attack" desc="Individual damage instances that contribute to the final calculated damage" />
		{props.columns.map(column => <div key={column.id} className="form-width column-attacks">
            <AttackList
                attacks={column.attacks}
                activeIndex={column.activeIndex}
                setActive={atkId => props.dispatch({
                    type: 'setActiveAttack',
                    colId: column.id,
                    atkId
                })}
                deleteAttack={atkId => props.dispatch({
                    type: 'removeAttack',
                    colId: column.id,
                    atkId
                })}
            />
            <SVGButton
                svg={<AddSVG className="pos" />}
                label="Add"
                mini
                hideLabel
                onClick={() => props.dispatch({
                    type: 'addAttackFromBase',
                    colId: column.id,
                    attack: column.last
                })}
            />
		</div>)}
	</>;
}