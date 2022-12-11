export default function HeadingRow(props: {
	title: string;
	level?: number
	span: number;
	className?: string;
}) {
	const Tag = `h${props.level || 2}` as 'h2';
	
	return <Tag className={props.className} style={{ gridColumn: `1 / span ${props.span}` }}>{props.title}</Tag>;
}