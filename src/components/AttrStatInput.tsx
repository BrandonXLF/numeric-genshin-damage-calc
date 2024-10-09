import StatInput from "./StatInput";
import Attack from "../utils/Attack";
import Stat from "../types/Stat";
import StatData from "../types/StatData";
import attributes, { getAttrStat } from "../utils/attributes";
import AddSVG from "../svgs/AddSVG";
import SVGButton from "./SVGButton";
import '../less/AttrStatInput.less';

export default function AttrStatInput(props: Readonly<{
	stat: Stat;
	attack: Attack;
	onChange: (name: keyof StatData, val?: string) => void,
}>) {
	const [
		activeAttributes,
		inactiveAttributes
	] = attributes.reduce(
		(accum, attr) => {
			accum[props.attack.hasStat(getAttrStat(props.stat.prop, attr)) ? 0 : 1].push(attr);
			return accum;
		},
		[
			[] as (typeof attributes)[number][],
			[] as (typeof attributes)[number][]
		]
	);
	
	if (!activeAttributes.length) {
		const attr = inactiveAttributes.shift()!;

		activeAttributes.push(attr);
		props.attack.setStat(getAttrStat(props.stat.prop, attr), props.stat.default.toString());
	}
	
	return <div className="attr-inputs">
		{activeAttributes.map(attr =>  {
			const prop = getAttrStat(props.stat.prop, attr);
			const value = props.attack.getStat(prop) ?? '';
			
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
					props.onChange(prop, undefined);
					
					if (newAttr)
						props.onChange(
							getAttrStat(
								props.stat.prop,
								newAttr as typeof attributes[number]
							),
							value
						);
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