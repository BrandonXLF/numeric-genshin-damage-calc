import InputDetails from "../types/InputDetails";
import createInputDetails from "../utils/CreateInputDetails";
import React from 'react';
import SVGButton from "./SVGButton";
import ResetSVG from "../svgs/ResetSVG";
import AddSVG from "../svgs/AddSVG";

export default function TopButtonRow(props: {
	allInputDetails: InputDetails[];
	setAllInputDetails: React.Dispatch<React.SetStateAction<InputDetails[]>>;
}) {
	return <div className="form-top">
		<SVGButton
			svg={<ResetSVG />}
			label="Reset"
			onClick={() => props.setAllInputDetails([createInputDetails()])}
		/>
		<SVGButton
			svg={<AddSVG className="pos" />}
			label="Add Column"
			onClick={() =>
				props.setAllInputDetails(prevAllInputDetails => [...prevAllInputDetails, createInputDetails(props.allInputDetails[0])])
			}
		/>
	</div>;
}