import Column from "../Column";
import ColumnList from "../ColumnList";
import { csvExport, csvImport } from "../csv"

const columnList = new ColumnList([]);

columnList.addEmpty();
columnList.columns[0].addAttackFromBase();
columnList.columns[0].first.label = 'No-Reaction';

// Set the modified flag
columnList.columns[0].last.reaction = columnList.columns[0].last.reaction;

columnList.addEmpty();
columnList.columns[1].first.label = 'Bloom';
columnList.columns[1].first.reactionType = 2;
columnList.columns[1].first.reaction = 3;

function makeCSV(grid: string[][]) {
	const maxLength = Math.max(...grid.map(row => row.length));
	const rowStrings = [];

	for (const row of grid) {
		for (let i = row.length; i < maxLength; i++) {
			row.push('');
		}

		rowStrings.push(row.join(','));
	}

	return rowStrings.join('\n') + '\n';
}

function toObjects(columns: Column[]) {
	return columns.map(column => column.attacks.map(atk => atk.toObject()));
}

it('exports correctly', () => {
	const expected = [
		['Label', 'No-Reaction', '', 'Bloom'],
		['Attack', '1 of 2', '2 of 2', '1 of 1'],
		['Reaction', 'No Reaction (ID: 0_0)', 'No Reaction (ID: 0_0)', 'Bloom (ID: 2_3)'],
		['', '', '', ''],
		['Character', '', '', ''],
		['Character Level (characterLevel)', '1', '1', '1'],
		['', '', '', ''],
		['Talent', '', '', ''],
		['Talent DMG ATK % (talent)', '100', '100', '100'],
		['Talent DMG DEF % (talentDEF)', '-', '-', '-'],
		['Talent DMG HP % (talentHP)', '-', '-', '-'],
		['Talent DMG EM % (talentEM)', '-', '-', '-'],
		['Talent Multiplier % (baseDamageMultiplier)', '100', '100', '100'],
		['Talent DMG Bonus ATK % (talentDamageBonus)', '0', '0', '0'],
		['Talent DMG Bonus DEF % (talentDamageBonusDEF)', '-', '-', '-'],
		['Talent DMG Bonus HP % (talentDamageBonusHP)', '-', '-', '-'],
		['Talent DMG Bonus EM % (talentDamageBonusEM)', '-', '-', '-'],
		['Flat DMG Bonus (flatDamage)', '0', '0', '0'],
		['', '', '', ''],
		['Stats', '', '', ''],
		['Base ATK (baseTalentScale)', '500', '500', '500'],
		['Bonus ATK (bonusTalentScale)', '500', '500', '500'],
		['Extra ATK % (additionalBonusTalentScale)', '0', '0', '0'],
		['Base DEF (baseDEF)', '500', '500', '500'],
		['Bonus DEF (bonusDEF)', '500', '500', '500'],
		['Extra DEF % (additionalBonusDEF)', '0', '0', '0'],
		['Base HP (baseHP)', '500', '500', '500'],
		['Bonus HP (bonusHP)', '500', '500', '500'],
		['Extra HP % (additionalBonusHP)', '0', '0', '0'],
		['Elemental Mastery (em)', '0', '0', '0'],
		['DMG Bonus % (damageBonus)', '0', '0', '0'],
		['Reaction Bonus % (reactionBonus)', '0', '0', '0'],
		['CRIT Rate % (critRate)', '5', '5', '5'],
		['CRIT DMG % (critDamage)', '50', '50', '50'],
		['', '', '', ''],
		['Enemy', '', '', ''],
		['Enemy Level (enemyLevel)', '1', '1', '1'],
		['DEF Decrease % (defenseDecrease)', '0', '0', '0'],
		['DEF Ignore % (defenseIgnore)', '0', '0', '0'],
		['Base RES % (resistance)', '10', '10', '10'],
		['RES Decrease % (resistanceReduction)', '0', '0', '0'],
		['', '', '', ''],
		['Damage', '', '', ''],
		['CRIT Hit', '1350', '', '\u2014'],
		['Non-CRIT Hit', '900', '', '\u2014'],
		['Average DMG', '922.5', '', '30.9']
	];

	expect(csvExport(columnList.columns)).toBe(makeCSV(expected));
});

it('imports correctly', () => {
	const reImported = csvImport(csvExport(columnList.columns));
	expect(toObjects(reImported)).toEqual(toObjects(columnList.columns))
});
