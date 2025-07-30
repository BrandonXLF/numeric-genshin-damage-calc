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
	secondaryReactionBonus: '10',
	critDamage: '150',
	critRate: '80',
	critDamageTransformative: '0',
	critRateTransformative: '0',
	enemyLevel: '100',
	defenseIgnore: '5',
	defenseDecrease: '5',
	resistanceReduction: '20',
	resistance: '10',
	bowAimedTravelTime: '0'
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
		label: 'Melt (Pyro)',
		statData
	});

	expect(attack.damage.crit?.value).toBeCloseTo(35978.15);
	expect(attack.damage.nonCrit?.value).toBeCloseTo(14391.26);
	expect(attack.damage.avgDmg.value).toBeCloseTo(31660.77);
});

it('computers transformative reaction damage', () => {
	const attack = new Attack({
		reactionType: 2,
		reaction: 3,
		label: 'Bloom',
		statData: {
			...statData,
			talentDamageBonus: '0',
			flatDamage: '0',
			baseDamageMultiplier: '100',
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

it('computers critical transformative reaction damage', () => {
	const attack = new Attack({
		reactionType: 2,
		reaction: 3,
		label: 'Bloom',
		statData: {
			...statData,
			talentDamageBonus: '0',
			flatDamage: '0',
			baseDamageMultiplier: '100',
			characterLevel: '90',
			em: '1000',
			reactionBonus: '100',
			resistance: '10',
			resistanceReduction: '30',
			critRateTransformative: '50',
			critDamageTransformative: '100'
		}
	});

	expect(attack.damage.crit?.value).toBeCloseTo(23342.57 * 2);
	expect(attack.damage.nonCrit?.value).toBeCloseTo(23342.57);
	expect(attack.damage.avgDmg.value).toBeCloseTo(23342.57 * 1.5);
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

it('computes secondary transformative reaction damage', () => {
	const attack = new Attack({
		reactionType: 2,
		reaction: 6,
		secondaryType: 1,
		secondary: 2,
		label: 'Vaporized (Pyro) Swirl',
		statData: {
			...statData,
			talentDamageBonus: '0',
			flatDamage: '0',
			baseDamageMultiplier: '100',
			characterLevel: '72',
			em: '236',
			reactionBonus: '0',
			secondaryReactionBonus: '0',
			resistance: '10',
			resistanceReduction: '35'
		}
	});

	expect(attack.damage.crit?.value).toBe(undefined);
	expect(attack.damage.nonCrit?.value).toBe(undefined);
	expect(attack.damage.avgDmg.value).toBeCloseTo(3145.38);
});

it('computes secondary transformative reaction damage', () => {
	const attack = new Attack({
		reactionType: 2,
		reaction: 6,
		secondaryType: 3,
		secondary: 1,
		label: 'Aggravated Swirl',
		statData: {
			...statData,
			talentDamageBonus: '0',
			flatDamage: '0',
			baseDamageMultiplier: '100',
			characterLevel: '72',
			em: '236',
			reactionBonus: '0',
			secondaryReactionBonus: '0',
			resistance: '10',
			resistanceReduction: '20'
		}
	});

	expect(attack.damage.crit?.value).toBe(undefined);
	expect(attack.damage.nonCrit?.value).toBe(undefined);
	expect(attack.damage.avgDmg.value).toBeCloseTo(3210.99);
});

it('accounts for bow charged attack damage drop-off', () => {
	const multipliers = {
		0: 1,
		0.5: 1,
		0.7: 1,
		0.7499: 1,
		0.75: 0.9,
		0.76: 0.9,
		0.79: 0.9,
		0.8: 0.8,
		0.85: 0.7,
		0.9: 0.6,
		0.95: 0.5,
		1: 0.4,
		1.05: 0.3,
		1.1: 0.2,
		1.1499: 0.2,
		1.15: 0.1,
		1.2: 0.1,
		2: 0.1,
		1000: 0.1
	};
	
	const attackInfo = {
		reactionType: 0,
		reaction: 0,
		label: 'Non-Reaction',
		statData
	};

	const baseAttack = new Attack(attackInfo);

	for (const [travelTime, multiplier] of Object.entries(multipliers)) {
		const attack = new Attack({
			...attackInfo,
			statData: {
				...baseAttack.statData,
				bowAimedTravelTime: travelTime
			}
		});

		expect(attack.damage.crit?.value).toBeCloseTo(baseAttack.damage.crit?.value! * multiplier);
		expect(attack.damage.nonCrit?.value).toBeCloseTo(baseAttack.damage.nonCrit?.value! * multiplier);
		expect(attack.damage.avgDmg.value).toBeCloseTo(baseAttack.damage.avgDmg.value * multiplier);
	}
});
