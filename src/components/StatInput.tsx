import Stat, { StatTypes } from "../types/Stat";
import FormInput from "./FormInput";

export default function StatInput(props: {
	stat: Stat,
	value: string,
	disabled: boolean,
	onChange: (val: string) => void
}) {
	let percent = props.stat.type === StatTypes.Percent;
	
	return <FormInput
		frontIcon={<div className="input-icon-math">
			<div>+</div><div>&minus;</div><div>&times;</div><div>&divide;</div>
		</div>}
		backIcon={percent && <div>%</div>}
		frontIconLabel="Equation"
		backIconLabel="Percent"
	>
		<input type="text" disabled={props.disabled} value={props.value} onChange={e => props.onChange(e.target.value)} />
	</FormInput>;
}