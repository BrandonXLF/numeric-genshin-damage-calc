import InputDetails from "../types/InputDetails";
import StatSection from "../types/StatSection";
import stats from "../utils/stats";
import HeadingRow from "./HeadingRow";
import StatInputRow from "./StatInputRow";
import { useEffect, useRef } from "react";

export default function CalculatorSection(props: {
	section: StatSection,
	headerSpan: number,
	columns: InputDetails[],
	setColumns: (value: React.SetStateAction<InputDetails[]>) => void
}) {
	let heading = useRef<HTMLHeadingElement>(null);
	
	useEffect(() => {
		heading.current!.style.display = /H\d/.test(heading.current!.nextSibling?.nodeName || '') ? 'none' : '';
	});
	
	return <>
		<HeadingRow ref={heading} title={props.section.name} span={props.headerSpan} level={props.section.sub ? 3 : 2} />
		{stats.filter(stat => stat.section === props.section.value).map(stat =>
			<StatInputRow key={stat.prop} stat={stat} columns={props.columns} setColumns={props.setColumns} />
		)}
	</>;
}