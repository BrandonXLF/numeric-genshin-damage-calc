import DisplayedProp from "../types/DisplayedProp";
import Column from "../utils/Column";
import DamageOutput from "./DamageOutput";
import RowLabel from "./RowLabel";
import DamageData from "../types/DamageData";

export default function DamageOutputRow(props: Readonly<{
	damageType: DisplayedProp<DamageData>;
	columns: Column[];
}>) {
	let initial: number | undefined;
	let hasValues = false;
	
	let damageOutputs = props.columns.map((column, i) => {
		const { damage, hadError, anyWithValue } = column.sumDamage(props.damageType.prop);
		
		if (i === 0) {
			initial = damage;
		}
		
		if (!anyWithValue) {
			return <div key={column.id}>&mdash;</div>;
		}
		
		hasValues = true;
		
		return <DamageOutput
			key={column.id}
			column={column}
			displayedProp={props.damageType}
			value={damage}
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