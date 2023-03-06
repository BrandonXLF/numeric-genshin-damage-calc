import Stat, { StatTypes } from "../types/Stat";
import FormInput from "./FormInput";

export default function StatInput(props: {
	stat: Stat,
	value: string,
	disabled?: boolean,
	onChange: (val: string) => void,
	after?: string | React.ReactNode
}) {
	let percent = props.stat.type === StatTypes.Percent;
	
	return <FormInput
		frontIcon={!props.disabled && <div className="input-icon-math">
			<div>+</div><div>&minus;</div><div>&times;</div><div>&divide;</div>
		</div>}
		backIcon={!props.disabled && percent && <div>%</div>}
		frontIconLabel="Equation"
		backIconLabel="Percent"
		after={props.after}
	>
		<input type="text" disabled={props.disabled} value={props.disabled ? '' : props.value} onChange={e => props.onChange(e.target.value)} />
	</FormInput>;
}