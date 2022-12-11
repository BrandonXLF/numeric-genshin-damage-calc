import InputDetails from "../types/InputDetails";
import StatSection from "../types/StatSection";
import stats from "../utils/stats";
import HeadingRow from "./HeadingRow";
import StatInputRow from "./StatInputRow";

export default function CalculatorSection(props: {
	section: StatSection,
	headerSpan: number,
	allInputDetails: InputDetails[],
	setAllInputDetails: (value: React.SetStateAction<InputDetails[]>) => void
}) {
	return <>
		<HeadingRow title={props.section.name} span={props.headerSpan} />
		{stats.filter(stat => stat.section === props.section.value).map(stat =>
			<StatInputRow key={stat.name} stat={stat} allInputDetails={props.allInputDetails} setAllInputDetails={props.setAllInputDetails} />
		)}
	</>;
}