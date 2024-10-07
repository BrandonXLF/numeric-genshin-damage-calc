import Column from "../utils/Column";
import StatSectionDefinition from "../types/StatSectionDefinition";
import stats from "../utils/stats";
import HeadingRow from "./HeadingRow";
import StatInputRow from "./StatInputRow";
import { useEffect, useRef } from "react";
import { ColumnStateAction } from "../utils/columnListReducer";

export default function CalculatorSection(props: Readonly<{
	section: StatSectionDefinition,
	headerSpan: number,
	columns: Column[],
	dispatch: React.Dispatch<ColumnStateAction>;
}>) {
	const heading = useRef<HTMLHeadingElement>(null);
	const headingLevel = props.section.sub ? 3 : 2;
	
	useEffect(() => {
		const levelAttr = heading.current!.nextElementSibling?.getAttribute('data-level');
		
		heading.current!.style.display = levelAttr && parseInt(levelAttr) <= headingLevel ? 'none' : '';
	});
	
	return <>
		<HeadingRow ref={heading} title={props.section.name} span={props.headerSpan} level={headingLevel} />
		{stats.filter(stat => stat.section === props.section.value).map(stat =>
			<StatInputRow key={stat.prop} stat={stat} columns={props.columns} dispatch={props.dispatch} />
		)}
	</>;
}