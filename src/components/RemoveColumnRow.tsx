import React from "react";
import DeleteSVG from "../svgs/DeleteSVG";
import SaveSVG from "../svgs/SaveSVG";
import Column from "../utils/Column";
import SVGButton from "./SVGButton";
import CopySVG from "../svgs/CopySVG";
import { ColumnStateAction } from "../types/ColumnState";

export default function RemoveColumnRow(props: Readonly<{
	columns: Column[];
	dispatch: React.Dispatch<ColumnStateAction>;
}>) {
	return <>
		{props.columns.map(column =>
			<div key={column.id} className="column-top">
				<SVGButton
					svg={<SaveSVG />}
					label="Save and Close Column"
					hideLabel={true}
					onClick={() => props.dispatch({type: 'unload', colId: column.id})}
				/>
				<SVGButton
					svg={<CopySVG />}
					label="Duplicate Column"
					hideLabel={true}
					onClick={() => props.dispatch({type: 'duplicate', colId: column.id})}
				/>
				<SVGButton
					svg={<DeleteSVG className="neg" />}
					label="Delete Column"
					hideLabel={true}
					onClick={() => props.dispatch({type: 'remove', colId: column.id})}
				/>
			</div>
		)}
	</>;
}