import React from "react";
import DeleteSVG from "../svgs/DeleteSVG";
import SaveSVG from "../svgs/SaveSVG";
import Column from "../utils/Column";
import SVGButton from "./SVGButton";
import CopySVG from "../svgs/CopySVG";
import { ColumnStateAction } from "../utils/columnListReducer";

export default function RemoveColumnRow(props: Readonly<{
	columns: Column[];
	dispatch: React.Dispatch<ColumnStateAction>;
}>) {
	return <>
		{props.columns.map((column, i) =>
			<div key={i} className="column-top">
				<SVGButton
					svg={<SaveSVG />}
					label="Save and Close Column"
					hideLabel={true}
					onClick={() => props.dispatch({type: 'unload', column})}
				/>
				<SVGButton
					svg={<CopySVG />}
					label="Duplicate Column"
					hideLabel={true}
					onClick={() => props.dispatch({type: 'duplicate', column})}
				/>
				<SVGButton
					svg={<DeleteSVG className="neg" />}
					label="Delete Column"
					hideLabel={true}
					onClick={() => props.dispatch({type: 'remove', column})}
				/>
			</div>
		)}
	</>;
}