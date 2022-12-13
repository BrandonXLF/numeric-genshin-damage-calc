import React from "react";
import CloseSVG from "../svgs/CloseSVG";
import InputDetails from "../types/InputDetails";
import SVGButton from "./SVGButton";

export default function RemoveColumnRow(props: {
	columns: InputDetails[];
	setColumns: React.Dispatch<React.SetStateAction<InputDetails[]>>;
}) {
	if (props.columns.length < 2) {
		return <div></div>;
	}
	
	return <>
		{props.columns.map((_, i) =>
			<div key={i} style={{textAlign: 'center'}}>
				<SVGButton
					svg={<CloseSVG className="neg" />}
					label="Remove Column"
					hideLabel={true}
					onClick={() => {
						let newColumns = [...props.columns];
						
						newColumns.splice(i, 1);
						
						props.setColumns(newColumns);
					}}
				/>
			</div>
		)}
	</>;
}