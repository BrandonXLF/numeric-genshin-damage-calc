import React from "react";
import CloseSVG from "../svgs/CloseSVG";
import InputDetails from "../types/InputDetails";
import SVGButton from "./SVGButton";

export default function RemoveColumnRow(props: {
	allInputDetails: InputDetails[];
	setAllInputDetails: React.Dispatch<React.SetStateAction<InputDetails[]>>;
}) {
	if (props.allInputDetails.length < 2) {
		return <div></div>;
	}
	
	return <>
		{props.allInputDetails.map((_, i) =>
			<div key={i} style={{textAlign: 'center'}}>
				<SVGButton
					svg={<CloseSVG className="neg" />}
					label="Remove Column"
					hideLabel={true}
					onClick={() => props.setAllInputDetails(([...value]) => {
						value.splice(i, 1);
						
						return value;
					})}
				/>
			</div>
		)}
	</>;
}