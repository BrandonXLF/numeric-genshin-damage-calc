import { stringify } from "csv-stringify/browser/esm/sync";
import Attack from "./Attack";
import Stat, { StatType } from "../types/Stat";
import Column from "./Column";
import DamageCalculator from "./DamageCalculator";
import damageTypes from "./damageTypes";
import displayDamage from "./displayDamage";
import stats from "./stats";
import { parse } from "csv-parse/browser/esm/sync";
import attributes, { getAttrStat } from "./attributes";
import statSections from "./statSections";
import { StoredAttack } from "../types/PartialAttack";

function generateRow(
    columns: Column[],
    label: string,
    valueGenerator: (attack: Attack, attackIndex: number, column: Column, columnIndex: number) => string
) {
    const row = [label];

    columns.forEach((column, columnIndex) =>
        column.attacks.forEach((attack, attackIndex) => {
            row.push(valueGenerator(attack, attackIndex, column, columnIndex));
        })
    );

    return row;
}

function getStatLabel(stat: Stat, suffix?: string, prop?: string) {
	let label = stat.name;

	if (suffix) {
		label += ` ${suffix}`;
	}

	if (stat.type === StatType.Percent && !label.endsWith('%')) {
		label += ' %';
	}

	label += ` (${prop ?? stat.prop})`;

	return label;
}

export function csvExport(columns: Column[]) {
    const rows = [];

	let columnCount = 0;
	columns.forEach(column => column.attacks.forEach(() => columnCount++));

	const addSectionTitle = (label: string) => {
		rows.push(Array(columnCount + 1).fill(''));
		rows.push([label, ...Array(columnCount).fill('')]);
	};

	rows.push(generateRow(
		columns,
		'Label',
		(atk, atkIndex) => atkIndex === 0 ? atk.label : ''
	));

	rows.push(generateRow(
		columns,
		'Attack',
		(_, atkIndex, col) => `${atkIndex + 1} of ${col.attacks.length}`
	));

	rows.push(generateRow(
		columns,
		'Reaction',
		atk => `${DamageCalculator.reactionTypes.get(atk.reactionType)!.reactions.get(atk.reaction)!.name} (ID: ${atk.reactionType}_${atk.reaction})`
	));

	statSections.forEach(statSection => {
		addSectionTitle(statSection.name);

		stats.filter(stat => stat.section === statSection.value).forEach(stat => {
			if (stat.usesAttrs) {
				attributes.forEach(attr => {
					const attrStat = getAttrStat(stat.prop, attr);
	
					rows.push(generateRow(
						columns,
						getStatLabel(stat, attr, attrStat),
						atk => '' + (atk.getStat(attrStat) ?? '-')
					));
				});
			} else {
				rows.push(generateRow(columns, getStatLabel(stat), atk => '' + atk.getStat(stat.prop)));
			}
		});
	});

	addSectionTitle('Damage');

	damageTypes.forEach(damageType => {
		rows.push(generateRow(
			columns,
			damageType.name,
			(_, atkIndex, column, _2) => {
				if (atkIndex !== 0) return '';

				const damage = column.attacks.reduce((prev, curr) => prev + (curr.damage[damageType.prop]?.value ?? NaN), 0);

				if (Number.isNaN(damage)) return '\u2014';
				return displayDamage(damage);
			}
		));
	});

    return stringify(rows);
}

export function csvImport(str: string) {
	const rows: string[][] = parse(str);
	const objects: Record<string, string>[] = [];

	rows.forEach(row => {
		const key = /\((.+)\)$/.exec(row[0])?.[1] ?? row[0];

		row.slice(1).forEach((val, i) => {
			if (!objects[i]) objects[i] = {};
			objects[i][key] = val;
		});
	});

	const storedAttackGroups: StoredAttack[][] = [];

	let lastAttackNum: number | undefined;

	objects.forEach(object => {
		const attackNum = parseInt(object.Attack);
		const storedAttack: StoredAttack = {};

		if (Number.isNaN(attackNum)) {
			throw new Error(`Failed to parse attack number from "${object.Attack}".`);
		}

		if (!lastAttackNum || attackNum <= lastAttackNum) {
			storedAttackGroups.push([]);
		}

		const reactionMatch = /\(ID: (\d+)\D(\d+)\)/.exec(object.Reaction);

		if (!reactionMatch) {
			throw new Error(`Failed to parse reaction ID from "${object.Reaction}".`);
		}

		storedAttack.reactionType = parseInt(reactionMatch[1]);
		storedAttack.reaction = parseInt(reactionMatch[2]);
		storedAttack.label = object.Label;
		storedAttack.statData = Object.fromEntries(Object.entries(object).filter(([,val]) => val !== '-'));

		storedAttackGroups[storedAttackGroups.length - 1].push(storedAttack);

		lastAttackNum = attackNum;
	});

	return storedAttackGroups.map(attacks => new Column(attacks));
}