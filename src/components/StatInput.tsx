import Stat, { StatTypes } from "../types/Stat";

export default function StatInput(props: {
	stat: Stat,
	value: string,
	disabled: boolean,
	onChange: (val: string) => void
}) {
	let percent = props.stat.type === StatTypes.Percent;
	
	return <>
		<div className="mini-col">{percent ? '%' : ''}</div>
		<input type="text" title="Equation" disabled={props.disabled} value={props.value} onChange={e => props.onChange(e.target.value)} />
	</>;
}