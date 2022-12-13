import React from "react";
import DeleteSVG from "../svgs/DeleteSVG";
import SaveSVG from "../svgs/SaveSVG";
import InputDetails from "../types/InputDetails";
import createInputDetails from "../utils/createInputDetails";
import SVGButton from "./SVGButton";

export default function RemoveColumnRow(props: {
	columns: InputDetails[];
	setColumns: React.Dispatch<React.SetStateAction<InputDetails[]>>;
}) {
	return <>
		{props.columns.map((inputDetails, i) =>
			inputDetails.shown && <div key={i} style={{ display: 'flex', justifyContent: 'center', gap: '0.5em'}}>
				<div>
					<SVGButton
						svg={<SaveSVG />}
						label="Save and Close Column"
						hideLabel={true}
						onClick={() => {
							let newColumns = [...props.columns];
							
							newColumns[i].shown = false;
							
							if (!newColumns.some(inputDetails => inputDetails.shown)) {
								newColumns.push(createInputDetails());
							}
							
							props.setColumns(newColumns);
						}}
					/>
				</div>
				<div style={{textAlign: 'center'}}>
					<SVGButton
						svg={<DeleteSVG className="neg" />}
						label="Delete Column"
						hideLabel={true}
						onClick={() => {
							let newColumns = [...props.columns];
							
							newColumns.splice(i, 1);
							
							if (!newColumns.some(inputDetails => inputDetails.shown)) {
								newColumns.push(createInputDetails());
							}
							
							props.setColumns(newColumns);
						}}
					/>
				</div>
			</div>
		)}
	</>;
}