import React from "react";
import CloseSVG from "../svgs/CloseSVG";
import InputDetails from "../types/InputDetails";
import SVGButton from "./SVGButton";

export default function RemoveColumnRow(props: {
	allInputDetails: InputDetails[];
	setAllInputDetails: React.Dispatch<React.SetStateAction<InputDetails[]>>;
}) {
	return <>
		{props.allInputDetails.map((_, i) => i === 0
			? null
			: <div key={i} style={{textAlign: 'center'}}>
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