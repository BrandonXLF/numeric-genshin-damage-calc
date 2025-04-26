import StatInput from "./StatInput";
import AttrStatInput from "./AttrStatInput";
import Column from "../utils/Column";
import RowLabel from "./RowLabel";
import Stat from "../types/Stat";
import React from 'react';
import StatData from "../types/StatData";
import { attrStats } from "../utils/stats";
import { getAttrStat } from "../utils/attributes";
import SyncSVG from "../svgs/SyncSVG";
import "../less/StatInputRow.less";
import SVGButton from "./SVGButton";
import { ColumnStateAction } from "../types/ColumnState";

export default function StatInputRow(props: Readonly<{
	stat: Stat,
	columns: Column[],
	dispatch: React.Dispatch<ColumnStateAction>;
}>) {
	let anyEnabled = false;

	function onChange(colId: number, atkId: number, prop: keyof StatData, value?: string) {
		const column = props.columns.find(col => col.id === colId);

		if (column?.first.synced.includes(prop)) {
			props.dispatch({
				type: 'modifyAttacks',
				colId,
				modifier: attacks => attacks.forEach(attack => attack.setStat(prop, value))
			});
		} else {
			props.dispatch({
				type: 'modifyAttack',
				colId,
				atkId,
				modifier: attack => attack.setStat(prop, value)
			});
		}
	}

	function setSynced(colId: number, prop: keyof StatData, synced: boolean, value?: string) {	
		props.dispatch({
			type: 'modifyAttacks',
			colId,
			modifier: attacks => {
				if (synced) {
					if (!attacks[0].synced.includes(prop))
						attacks[0].synced.push(prop);

					attacks.forEach(attack => attack.setStat(prop, value));
					return;
				}
				
				attacks[0].synced = attacks[0].synced.filter(syncedProp => syncedProp !== prop);
			}
		});
	}
	
	let statInputs = props.columns.map(column => {
		const attack = column.active;
		const synced = column.first.synced.includes(props.stat.prop);
		const damageColumns = attack.groups;

		let enabled = Boolean((props.stat.groups ?? 0) & damageColumns);
		
		// Required by group-enabled stat that uses current stat's attribute
		if (!enabled && 'attr' in props.stat)
			enabled = attrStats.some(stat =>
				((stat.groups ?? 0) & damageColumns) &&
				attack.getStatAsNumber(getAttrStat(stat.prop, props.stat.attr!), stat.type)
			);
		
		anyEnabled ||= enabled;

		return <div key={column.id} className="stat-input-row">
			{'usesAttrs' in props.stat && enabled
				? <AttrStatInput
					stat={props.stat}
					attack={attack}
					onChange={(prop, value) => onChange(column.id, attack.id, prop, value)}
				/>
				: <StatInput
					stat={props.stat}
					value={attack.getStat(props.stat.prop) ?? ''}
					disabled={!enabled}
					onChange={value => onChange(column.id, attack.id, props.stat.prop, value)}
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
							column.id,
							props.stat.prop,
							!synced,
							attack.getStat(props.stat.prop)
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
