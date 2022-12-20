import Damage from "../types/Damage";
import DisplayedProp from "../types/DisplayedProp";
import DamageOutput from "./DamageOutput";
import RowLabel from "./RowLabel";

export default function DamageOutputRow(props: {
	damageType: DisplayedProp<Damage>;
	damages: Damage[];
}) {
	let initial: number | undefined;
	let hasValues = false;
	
	let damageOutputs = props.damages.map((damage, i) => {
		let value = damage[props.damageType.prop]?.value;
		
		if (i === 0) initial = value;
		
		if (value === undefined) {
			return <div key={i}>&mdash;</div>;
		}
		
		hasValues = true;
		
		return <DamageOutput key={i} initial={i !== 0 ? initial : undefined} value={value} calcs={damage[props.damageType.prop]?.record} />;
	});
	
	if (!hasValues) {
		return null;
	}
	
	return <>
		<RowLabel label={props.damageType.name} desc={props.damageType.desc} />
		{damageOutputs}
	</>;
}