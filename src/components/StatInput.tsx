import Stat, { StatTypes } from "../types/Stat";

export default function StatInput(props: {
	stat: Stat,
	value: number,
	disabled: boolean,
	onChange: (val: number) => void
}) {
	let percent = props.stat.type === StatTypes.Percent;
	
	return <>
		<div className="mini-col">{percent ? '%' : ''}</div>
		<input type="number" disabled={props.disabled} value={props.value} onChange={e => props.onChange(e.target.valueAsNumber)} />
	</>;
}