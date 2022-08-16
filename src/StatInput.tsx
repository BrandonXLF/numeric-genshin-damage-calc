import React, { useId } from 'react';
import Popup from 'reactjs-popup';
import { Stat, ValueTypes } from './Stats';
import 'reactjs-popup/dist/index.css';
import { DamageGroup } from './DamageCalculator';

export default function StatInput(props: {
	stat: Stat,
	value: number,
	damageGroup: DamageGroup,
	onChange: (val: number) => void
}) {
	let value = props.value;
	let id = useId();
	let percent = props.stat.type === ValueTypes.Percent;
	let show = !!(props.stat.groups & props.damageGroup);
	
	if (!show) {
		return null;
	}
	
	return <React.Fragment>
		<label htmlFor={id} className="stat-label">
			{props.stat.label || props.stat.name} {props.stat.desc && <Popup
				trigger={<button className="stat-desc-button">?</button>}
				position={['top center', 'bottom center', 'top right']}
				on={['hover', 'focus']}
				arrow={true}
			>
				{props.stat.desc}
			</Popup>}
		</label>
		<div>
			<span style={{visibility: percent ? 'visible' : 'hidden'}}>% </span>
			<input type="number" id={id} value={value} onChange={e => props.onChange(e.target.valueAsNumber)} />
		</div>
	</React.Fragment>;
}