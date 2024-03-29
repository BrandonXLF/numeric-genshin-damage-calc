import React from "react";

type HeadingRowProps = {
	title: string;
	level?: number;
	span: number;
	className?: string;
};

export default React.forwardRef<HTMLHeadingElement, HeadingRowProps>((props, ref) => {
	const Tag = `h${props.level ?? 2}` as 'h2';

	return <Tag
		ref={ref}
		data-level={props.level}
		className={props.className}
		style={{ gridColumn: `1 / span ${props.span}` }}
	>
		{props.title}
	</Tag>;
});