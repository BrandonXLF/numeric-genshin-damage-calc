import StatInput from "./StatInput";
import InputDetails from "../types/InputDetails";
import Stat from "../types/Stat";
import StatValue from "../utils/StatValue";
import StatData from "../types/StatData";
import attributes, { getAttrStat } from "../utils/attributes";
import AddSVG from "../svgs/AddSVG";
import SVGButton from "./SVGButton";
import '../less/AttrStatInput.less';

export default function AttrStatInput(props: {
	stat: Stat;
	inputDetails: InputDetails;
	onChange: (name: keyof StatData, val?: string) => void,
}) {
	const activeAttributes = attributes.filter(attr => getAttrStat(props.stat.prop, attr) in props.inputDetails.statData);
	const inactiveAttributes = attributes.filter(attr => !(getAttrStat(props.stat.prop, attr) in props.inputDetails.statData));
	
	if (!activeAttributes.length) {
		const attr = inactiveAttributes.shift()!;

		activeAttributes.push(attr);
		props.inputDetails.statData[getAttrStat(props.stat.prop, attr)] = new StatValue(props.stat.default.toString(), props.stat.type);
	}
	
	return <div className="attr-inputs">
		{activeAttributes.map(attr =>  {
			const prop = getAttrStat(props.stat.prop, attr);
			const value = props.inputDetails.statData[prop]!.number;
			
			const types: { name: string; value?: string; disabled?: boolean; }[] = attributes.map(optionAttr => ({
				name: optionAttr,
				disabled: !inactiveAttributes.includes(optionAttr) && optionAttr !== attr
			}));
			
			if (activeAttributes.length > 1)
				types.push({ name: '-', value: '' })
			
			return <StatInput
				key={attr}
				stat={props.stat}
				value={value}
				onChange={value => props.onChange(prop, value)}
				unit={attr}
				unitOptions={types}
				onUnitChange={newAttr => {
					props.onChange(prop);
					
					if (newAttr)
						props.onChange(getAttrStat(props.stat.prop, newAttr as typeof attributes[keyof typeof attributes]), value);
				}}
			/>
		})}
		{inactiveAttributes.length > 0 &&
			<SVGButton
				mini={true}
				svg={<AddSVG className="pos" />}
				label="Add Stat"
				onClick={() => props.onChange(
					getAttrStat(props.stat.prop, inactiveAttributes[0]),
					props.stat.default.toString()
				)}
			/>
		}
	</div>
}