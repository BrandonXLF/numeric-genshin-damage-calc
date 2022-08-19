import StatInput from "./StatInput";
import DamageCalculator from "../utils/DamageCalculator";
import InputDetails from "../types/InputDetails";
import RowLabel from "./RowLabel";
import Stat from "../types/Stat";
import StatData from "../types/StatData";

export default function StatInputRow(props: {
	dataType: 'enemyData' | 'characterData'
	stat: Stat,
	allInputDetails: InputDetails[],
	setAllInputDetails: (value: React.SetStateAction<InputDetails[]>) => void
}) {
	let anyEnabled = false;
	
	let statInputs = props.allInputDetails.map((inputDetails, i) => {
		let damageGroup = DamageCalculator.damageTypes[inputDetails.damageType].group;
		let enabled = !!(props.stat.groups & damageGroup);
		
		anyEnabled = anyEnabled || enabled;
		
		return <StatInput
			key={i}
			stat={props.stat}
			value={(inputDetails[props.dataType] as StatData)[props.stat.attr].number}
			disabled={!enabled}
			onChange={value => props.setAllInputDetails(([...newAllInputDetails]) => {
				(newAllInputDetails[i][props.dataType] as StatData)[props.stat.attr].number = value;
				
				return newAllInputDetails;
			})}
		/>
	});
	
	if (!anyEnabled) return null;
	
	return <>
		<RowLabel label={props.stat.label || props.stat.name} desc={props.stat.desc} />
		{statInputs}
	</>;
}