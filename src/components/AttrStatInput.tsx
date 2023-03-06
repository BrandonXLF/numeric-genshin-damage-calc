import StatInput from "./StatInput";
import InputDetails from "../types/InputDetails";
import Stat from "../types/Stat";
import StatValue from "../utils/StatValue";
import StatData from "../types/StatData";
import attributes, { getAttrStat } from "../utils/attributes";
import AddSVG from "../svgs/AddSVG";
import SVGButton from "./SVGButton";

export default function StatInputRow(props: {
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
	
	return <div className="form-inputs">
		{activeAttributes.map(attr =>  {
			const prop = getAttrStat(props.stat.prop, attr);
			const value = props.inputDetails.statData[prop]!.number;
			
			return <StatInput
				key={attr}
				stat={props.stat}
				value={value}
				after={
					<select className="mini-select" value={attr} onChange={e => {
						props.onChange(prop);
						props.onChange(getAttrStat(props.stat.prop, e.target.value as typeof attributes[keyof typeof attributes]), value);
					}}>
						{attributes.map(selectAttr => <option key={selectAttr} disabled={!inactiveAttributes.includes(selectAttr) && selectAttr !== attr}>{selectAttr}</option>)}
						{activeAttributes.length > 1 && <option>-</option>}
					</select>
				}
				onChange={value => props.onChange(prop, value)}
			/>
		})}
		{props.stat.attrs && inactiveAttributes.length > 0 &&
			<SVGButton
				mini={true}
				svg={<AddSVG />}
				label="Add Stat"
				onClick={() => props.onChange(
					getAttrStat(props.stat.prop, inactiveAttributes[0]),
					props.stat.default.toString()
				)}
			/>
		}
	</div>
}