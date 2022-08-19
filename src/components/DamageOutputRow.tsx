import React from "react";
import Damage from "../types/Damage";
import DamageOutput from "./DamageOutput";
import DifferenceOutput from "./DifferenceOutput";
import RowLabel from "./RowLabel";

export default function DamageOutputRow(props: {
	title: string;
	damages: Damage[];
	prop: 'nonCrit' | 'avgDmg' | 'crit';
}) {
	let initial: number | undefined;
	
	return <>
		<RowLabel label={props.title} />
		{props.damages.map((damage, i) => {
			let value = damage[props.prop];
			
			if (i === 0) initial = value;
			
			if (value === undefined) {
				return <React.Fragment key={i}>
					<div className="mini-col"></div>
					<div>&mdash;</div>
				</React.Fragment>;
			}
			
			return <React.Fragment key={i}>
				<div className="mini-col">{i !== 0 && <DifferenceOutput initial={initial as number} value={value} />}</div>
				<DamageOutput value={value} />
			</React.Fragment>;
		})}
	</>;
}