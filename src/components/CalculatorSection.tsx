import InputDetails from "../types/InputDetails";
import StatSection from "../types/StatSection";
import DamageCalculator from "../utils/DamageCalculator";
import stats from "../utils/stats";
import HeadingRow from "./HeadingRow";
import StatInputRow from "./StatInputRow";

export default function CalculatorSection(props: {
	section: StatSection,
	headerSpan: number,
	allInputDetails: InputDetails[],
	setAllInputDetails: (value: React.SetStateAction<InputDetails[]>) => void
}) {
	let validStats = stats.filter(stat => stat.section === props.section.value),
		validGroups = validStats.reduce((groups, val) => groups | val.groups, 0),
		anyValid = props.allInputDetails.some(inputDetails => validGroups & DamageCalculator.reactionTypes[inputDetails.reactionType].groups);
		
	if (!anyValid) return null;
	
	return <>
		<HeadingRow title={props.section.name} span={props.headerSpan} level={props.section.sub ? 3 : 2} />
		{validStats.map(stat =>
			<StatInputRow key={stat.name} stat={stat} allInputDetails={props.allInputDetails} setAllInputDetails={props.setAllInputDetails} />
		)}
	</>;
}