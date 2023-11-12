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

export default function StatInputRow(props: {
	stat: Stat,
	columns: Column[],
	setColumns: (value: React.SetStateAction<Column[]>) => void
}) {
	let anyEnabled = false;

	function updateAttack(attack: Attack, prop: keyof StatData, value?: string) {
		if (!attack.statData[prop])
			attack.statData[prop] = new StatValue(value ?? '', props.stat.type);
		
		if (value === undefined)
			delete attack.statData[prop];
		else
			attack.statData[prop]!.number = value;

		attack.unmodified = false;
	}
	
	function onChange(colIndex: number, atkIndex: number, prop: keyof StatData, value?: string) {
		const newColumns = [...props.columns];
		const column = newColumns[colIndex];
		
		if (column.first.synced.includes(prop)) {
			column.attacks.forEach(attack => updateAttack(attack, prop, value));
		} else {
			updateAttack(column.attacks[atkIndex], prop, value);
		}
		
		props.setColumns(newColumns);
	}

	function setSynced(colIndex: number, prop: keyof StatData, synced: boolean, value?: StatValue) {
		let newColumns = [...props.columns];
		
		if (synced && !newColumns[colIndex].first.synced.includes(prop)) {
			newColumns[colIndex].first.synced.push(prop);
		}

		if (synced)
			newColumns[colIndex].attacks.forEach(attack => {
				attack.statData[prop] = value as StatValue;
				attack.unmodified = false;
			});
		
		if (!synced) {
			newColumns[colIndex].first.synced = newColumns[colIndex].first.synced.filter(syncedProp => syncedProp !== prop);
		}

		props.setColumns(newColumns);
	}
	
	let statInputs = props.columns.map((column, colIndex) => {
		const attack = column.active;
		const atkIndex = column.activeIndex;

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
				<SyncSVG
					onClick={() => setSynced(
						colIndex,
						props.stat.prop,
						!column.first.synced.includes(props.stat.prop),
						attack.statData[props.stat.prop]
					)}
					className="sync-stat"
					noSync={!column.first.synced.includes(props.stat.prop)}
				/>
			}
		</div>;
	});
	
	if (!anyEnabled) return null;
	
	return <>
		<RowLabel label={props.stat.name} desc={props.stat.desc} icon={props.stat.icon} />
		{statInputs}
	</>;
}