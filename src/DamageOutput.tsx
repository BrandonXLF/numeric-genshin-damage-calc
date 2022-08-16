import React, { useId } from 'react';

export default function DamageOutput(props: {
	label: string,
	value: number
}) {
	let id = useId();
	
	return <React.Fragment>
		<label htmlFor={id}>{props.label}</label>
		<output id={id}>{Math.round(props.value)}</output>
	</React.Fragment>;
}