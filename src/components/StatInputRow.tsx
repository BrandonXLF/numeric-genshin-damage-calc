import StatInput from "./StatInput";
import AttrStatInput from "./AttrStatInput";
import DamageCalculator from "../utils/DamageCalculator";
import Column from "../utils/Column";
import RowLabel from "./RowLabel";
import Stat from "../types/Stat";
import React from 'react';
import StatValue from "../utils/StatValue";
import StatData from "../types/StatData";
import { attrStats } from "../utils/stats";
import { getAttrStat } from "../utils/attributes";
import SyncSVG from "../svgs/SyncSVG";
import "../less/StatInputRow.less";
import Attack from "../types/Attack";
import SVGButton from "./SVGButton";
import { ColumnStateAction } from "../utils/columnListReducer";

export default function StatInputRow(props: Readonly<{
	stat: Stat,
	columns: Column[],
	dispatch: React.Dispatch<ColumnStateAction>;
}>) {
	let anyEnabled = false;

	function updateAttack(attack: Attack, prop: keyof StatData, value?: string) {
		if (!attack.statData[prop])
			attack.statData[prop] = new StatValue(value ?? '', props.stat.type);
		
		if (value === undefined)
			delete attack.statData[prop];
		else
			attack.statData[prop].number = value;

		attack.unmodified = false;
	}
	
	function onChange(colIndex: number, atkIndex: number, prop: keyof StatData, value?: string) {
		props.dispatch({
			type: 'modify',
			column: props.columns[colIndex],
			modifier: (column: Column) => {
				if (column.first.synced.includes(prop)) {
					column.attacks.forEach(attack => updateAttack(attack, prop, value));
				} else {
					updateAttack(column.attacks[atkIndex], prop, value);
				}
			}
		});
	}

	function setSynced(colIndex: number, prop: keyof StatData, synced: boolean, value?: StatValue) {	
		props.dispatch({
			type: 'modify',
			column: props.columns[colIndex],
			modifier: column => {
				if (synced && !column.first.synced.includes(prop)) {
					column.first.synced.push(prop);
					return;
				}
		
				if (synced) {
					column.attacks.forEach(attack => {
						attack.statData[prop] = value as StatValue;
						attack.unmodified = false;
					});

					return;
				}
				
				column.first.synced = column.first.synced.filter(syncedProp => syncedProp !== prop);
			}
		});
	}
	
	let statInputs = props.columns.map((column, colIndex) => {
		const attack = column.active;
		const atkIndex = column.activeIndex;
		const synced = column.first.synced.includes(props.stat.prop);

		let damageColumns = DamageCalculator.reactionTypes[attack.reactionType].groups;
		let enabled = Boolean(props.stat.groups! & damageColumns);
		
		if (!enabled && 'attr' in props.stat)
			enabled = attrStats.some(stat =>
				(stat.groups! & damageColumns) &&
				parseInt(attack.statData[getAttrStat(stat.prop, props.stat.attr!)]?.number ?? '')
			);
		
		anyEnabled = anyEnabled || enabled;

		return <div key={colIndex} className="stat-input-row">
			{'usesAttrs' in props.stat && enabled
				? <AttrStatInput
					stat={props.stat}
					attack={attack}
					onChange={(props, value) => onChange(colIndex, atkIndex, props, value)}
				/>
				: <StatInput
					stat={props.stat}
					value={attack.statData[props.stat.prop]?.number ?? ''}
					disabled={!enabled}
					onChange={value => onChange(colIndex, atkIndex, props.stat.prop, value)}
				/>
			}
			{column.attacks.length > 1 &&
				<div className="sync-btn-cnt">
					<SVGButton
						svg={<SyncSVG
							className="sync-stat"
							noSync={!synced}
						/>}
						label={synced ? 'Unsync' : 'Sync'}
						hideLabel
						onClick={() => setSynced(
							colIndex,
							props.stat.prop,
							!synced,
							attack.statData[props.stat.prop]
						)}
					/>
					</div>
			}
		</div>;
	});
	
	if (!anyEnabled) return null;
	
	return <>
		<RowLabel label={props.stat.name} desc={props.stat.desc} icon={props.stat.icon} />
		{statInputs}
	</>;
}