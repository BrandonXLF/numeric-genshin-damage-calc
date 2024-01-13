import Damage from "../types/Damage";
import DisplayedProp from "../types/DisplayedProp";
import DamageOutput from "./DamageOutput";
import RowLabel from "./RowLabel";

export default function DamageOutputRow(props: Readonly<{
	damageType: DisplayedProp<Damage>;
	columnDamages: { items: Damage[]; activeIndex: number; }[];
}>) {
	let initial: number | undefined;
	let hasValues = false;
	
	let damageOutputs = props.columnDamages.map((damages, i) => {
		let value = damages.items.reduce((prev, curr) => prev + (curr[props.damageType.prop]?.value ?? NaN), 0);
		
		if (i === 0) initial = value;
		
		if (Number.isNaN(value)) {
			return <div key={i}>&mdash;</div>;
		}
		
		hasValues = true;
		
		return <DamageOutput
			key={i}
			damages={damages.items}
			current={damages.activeIndex}
			prop={props.damageType.prop}
			value={value}
			initial={i !== 0 ? initial : undefined}
		/>;
	});
	
	if (!hasValues) return null;
	
	return <>
		<RowLabel label={props.damageType.name} desc={props.damageType.desc} />
		{damageOutputs}
	</>;
}