import Popup from "reactjs-popup";

export default function DifferenceOutput(props: {
	initial?: number;
	value: number
}) {
	if (!props.initial) return null;
	
	let value = Math.round(props.value);
	let initial = Math.round(props.initial);
	let number = Math.round((value - initial) / initial * 100);
	let className = number > 0 ? 'pos' : number < 0 ? ' neg' : '';
	
	return <Popup
		trigger={
			<div className={className}>
				{(number <= 0 ? '' : '+') + number + '%'}
			</div>
		}
		position={['top center', 'bottom center', 'top right']}
		on={'hover'}
		arrow={true}
	>
		Difference verses first column
	</Popup>;
}