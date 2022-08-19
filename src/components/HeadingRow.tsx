export default function HeadingRow(props: {
	title: string;
	span: number;
}) {
	return <h2 style={{ gridColumn: `1 / span ${props.span}` }}>{props.title}</h2>;
}