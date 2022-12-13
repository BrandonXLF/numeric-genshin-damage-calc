import InputDetails from "../types/InputDetails";
import createInputDetails from "../utils/createInputDetails";
import React from 'react';
import SVGButton from "./SVGButton";
import ResetSVG from "../svgs/ResetSVG";
import AddSVG from "../svgs/AddSVG";

export default function TopButtonRow(props: {
	columns: InputDetails[];
	setColumns: React.Dispatch<React.SetStateAction<InputDetails[]>>;
}) {
	return <div className="form-top">
		<SVGButton
			svg={<ResetSVG />}
			label="Reset"
			onClick={() => props.setColumns([createInputDetails()])}
		/>
		<SVGButton
			svg={<AddSVG className="pos" />}
			label="Add Column"
			onClick={() =>
				props.setColumns([...props.columns, createInputDetails(props.columns[0])])
			}
		/>
	</div>;
}