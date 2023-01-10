import Popup from "reactjs-popup";

export default function DifferenceOutput(props: {
	initial?: number;
	value?: number
}) {
	if (
		!props.initial || !props.value || Number.isNaN(props.initial) || Number.isNaN(props.value)
	) {
		return null;
	}

	let number = Math.round((props.value - props.initial) / props.initial * 100);
	let className = number > 0 ? 'pos' : number < 0 ? 'neg' : '';
	
	return <Popup
		trigger={
			<span className={className}>
				{(number <= 0 ? '' : '+') + number + '%'}
			</span>
		}
		position={['top center', 'bottom center', 'top right']}
		on={'hover'}
		arrow={true}
	>
		Difference verses first column
	</Popup>;
}