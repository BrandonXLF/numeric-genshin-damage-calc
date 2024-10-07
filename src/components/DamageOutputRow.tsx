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
		let hadError = false;
		let sum = 0;

		for (let attack of column.attacks) {
			let damage = attack.damage[props.damageType.prop]?.value;

			if (Number.isNaN(damage)) {
				hadError = true;
			}

			sum += damage ?? NaN;
		}
		
		if (i === 0) initial = sum;
		
		if (Number.isNaN(sum) && !hadError) {
			return <div key={column.id}>&mdash;</div>;
		}
		
		hasValues = true;
		
		return <DamageOutput
			key={column.id}
			column={column}
			prop={props.damageType.prop}
			value={sum}
			error={hadError}
			initial={i !== 0 ? initial : undefined}
		/>;
	});
	
	if (!hasValues) return null;
	
	return <>
		<RowLabel label={props.damageType.name} desc={props.damageType.desc} />
		{damageOutputs}
	</>;
}