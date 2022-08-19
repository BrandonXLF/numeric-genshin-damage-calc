export default function DamageOutput(props: { value: number }) {
	return <div className="output">
		<output>{Math.round(props.value)}</output>
	</div>;
}