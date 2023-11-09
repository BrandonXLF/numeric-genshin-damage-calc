import Column from "../utils/Column";
import StatSection from "../types/StatSection";
import stats from "../utils/stats";
import HeadingRow from "./HeadingRow";
import StatInputRow from "./StatInputRow";
import { useEffect, useRef } from "react";

export default function CalculatorSection(props: {
	section: StatSection,
	headerSpan: number,
	columns: Column[],
	setColumns: (value: React.SetStateAction<Column[]>) => void
}) {
	const heading = useRef<HTMLHeadingElement>(null);
	const headingLevel = props.section.sub ? 3 : 2;
	
	useEffect(() => {
		const levelAttr = heading.current!.nextElementSibling?.getAttribute('data-level');
		
		heading.current!.style.display = levelAttr && parseInt(levelAttr) <= headingLevel ? 'none' : '';
	});
	
	return <>
		<HeadingRow ref={heading} title={props.section.name} span={props.headerSpan} level={headingLevel} />
		{stats.filter(stat => stat.section === props.section.value).map(stat =>
			<StatInputRow key={stat.prop} stat={stat} columns={props.columns} setColumns={props.setColumns} />
		)}
	</>;
}