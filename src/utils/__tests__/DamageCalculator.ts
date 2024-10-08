import StatData from '../../types/StatData';
import Attack from '../Attack';

const statData: StatData = {
	baseTalentScale: '600',
	additionalBonusTalentScale: '20',
	bonusTalentScale: '800',
	talent: '200',
	talentDamageBonus: '100',
	baseDamageMultiplier: '150',
	flatDamage: '500',
	damageBonus: '46.6',
	em: '100',
	characterLevel: '90',
	reactionBonus: '20',
	critDamage: '150',
	critRate: '80',
	enemyLevel: '100',
	defenseIgnore: '5',
	defenseDecrease: '5',
	resistanceReduction: '20',
	resistance: '10'
};

it('computers non-reaction damage', () => {
	const attack = new Attack({
		reactionType: 0,
		reaction: 0,
		label: 'Non-Reaction',
		statData
	});

	expect(attack.damage.crit?.value).toBeCloseTo(12985.38);
	expect(attack.damage.nonCrit?.value).toBeCloseTo(5194.15);
	expect(attack.damage.avgDmg.value).toBeCloseTo(11427.13);
});

it('computers amplifying reaction damage', () => {
	const attack = new Attack({
		reactionType: 1,
		reaction: 0,
		label: 'Pyro Melt',
		statData
	});

	expect(attack.damage.crit?.value).toBeCloseTo(35978.15);
	expect(attack.damage.nonCrit?.value).toBeCloseTo(14391.26);
	expect(attack.damage.avgDmg.value).toBeCloseTo(31660.77);
});

it('computers transformation reaction damage', () => {
	const attack = new Attack({
		reactionType: 2,
		reaction: 3,
		label: 'Pyro Melt',
		statData: {
			...statData,
			characterLevel: '90',
			em: '1000',
			reactionBonus: '100',
			resistance: '10',
			resistanceReduction: '30'
		}
	});

	expect(attack.damage.crit?.value).toBe(undefined);
	expect(attack.damage.nonCrit?.value).toBe(undefined);
	expect(attack.damage.avgDmg.value).toBeCloseTo(23342.57);
});

it('computers additive reaction damage', () => {
	const attack = new Attack({
		reactionType: 3,
		reaction: 0,
		label: 'Spread',
		statData
	});

	expect(attack.damage.crit?.value).toBeCloseTo(18641.09);
	expect(attack.damage.nonCrit?.value).toBeCloseTo(7456.43);
	expect(attack.damage.avgDmg.value).toBeCloseTo(16404.16);
});

it('computes multi-stat talents', () => {
	const attack = new Attack({
		reactionType: 0,
		reaction: 0,
		label: 'Non-Reaction',
		statData: {
			...statData,
			baseHP: '15000',
			additionalBonusHP: '200',
			bonusHP: '800',
			talentHP: '10',
			talentDamageBonusHP: '5',
		}
	});

	expect(attack.damage.crit?.value).toBeCloseTo(31062.28);
	expect(attack.damage.nonCrit?.value).toBeCloseTo(12424.91);
	expect(attack.damage.avgDmg.value).toBeCloseTo(27334.81);
});