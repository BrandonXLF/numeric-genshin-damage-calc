import Damage from "../types/Damage";
import DisplayedProp from "../types/DisplayedProp";
import Column from "../utils/Column";
import DamageOutput from "./DamageOutput";
import RowLabel from "./RowLabel";

export default function DamageOutputRow(props: Readonly<{
	damageType: DisplayedProp<Damage>;
	columns: Column[];
}>) {
	let initial: number | undefined;
	let hasValues = false;
	
	let damageOutputs = props.columns.map((column, i) => {
		let value = column.attacks.reduce((prev, curr) => prev + (curr.damage[props.damageType.prop]?.value ?? NaN), 0);
		
		if (i === 0) initial = value;
		
		if (Number.isNaN(value)) {
			return <div key={column.id}>&mdash;</div>;
		}
		
		hasValues = true;
		
		return <DamageOutput
			key={column.id}
			column={column}
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