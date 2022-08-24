import React from "react";
import Damage from "../types/Damage";
import DamageOutput from "./DamageOutput";
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
			let value = damage[props.prop]?.value;
			
			if (i === 0) initial = value;
			
			if (value === undefined) {
				return <div key={i}>&mdash;</div>;
			}
			
			return <DamageOutput key={i} initial={i !== 0 ? initial : undefined} value={value} calcs={damage[props.prop]?.equations} />;
		})}
	</>;
}