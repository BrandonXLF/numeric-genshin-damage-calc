import ReactionType, { BaseDamage, EMBonusType, RxnMode } from "../types/ReactionType";
import { StatType } from "../types/Stat";

const reactionTypes = new Map<number, ReactionType>([
	[0, {
		name: 'No Reaction',
		secondaryName: 'None',
		baseDamage: BaseDamage.Talent,
		rxnMode: RxnMode.None,
		emBonus: EMBonusType.None,
		isTransformative: false,
		transformativeCrit: false,
		reactions: new Map([
			[0, { name: 'No Reaction', secondaryName: 'None', color: '#ffffff', element: 'Varies' }]
		]),
		desc: 'No reaction damage is done at all.'
	}],
	[1, {
		name: 'Amplifying',
		baseDamage: BaseDamage.Talent,
		rxnMode: RxnMode.Multiplicative,
		emBonus: EMBonusType.Amplifying,
		isTransformative: false,
		transformativeCrit: false,
		reactions: new Map([
			[0, { name: 'Melt (Pyro)', multiplier: 2, color: '#ffcc66', element: 'Pyro' }],
			[3, { name: 'Vaporize (Hydro)', multiplier: 2, color: '#33ccff', element: 'Hydro' }],
			[1, { name: 'Melt (Cyro)', multiplier: 1.5, color: '#99ffff', element: 'Cyro' }],
			[2, { name: 'Vaporize (Pyro)', multiplier: 1.5, color: '#ffcc66', element: 'Pyro' }],
		]),
		desc: 'Ampliying reactions multiply the damage being done by a value calculated from the base reaction multiplier, the EM multiplier, and Reaction Bonus.'
	}],
	[3, {
		name: 'Additive',
		baseDamage: BaseDamage.Talent,
		additiveBaseDamage: BaseDamage.Level,
		rxnMode: RxnMode.Additive,
		emBonus: EMBonusType.Additive,
		isTransformative: false,
		transformativeCrit: false,
		reactions: new Map([
			[0, { name: 'Spread', multiplier: 1.25, color: '#00ea53', element: 'Dendro' }],
			[1, { name: 'Aggravate', multiplier: 1.15, color: '#e19bff', element: 'Electro' }]
		]),
		desc: 'Additive reactions add additional damage to the damage being done based on the base reaction multiplier, the EM multiplier, and Reaction Bonus.'
	}],
	[4, {
		name: 'Lunar',
		baseDamage: BaseDamage.Level,
		rxnMode: RxnMode.Multiplicative,
		emBonus: EMBonusType.Lunar,
		isTransformative: true,
		transformativeCrit: false,
		multiContributor: true,
		reactions: new Map([
			[0, { name: 'Lunar-Charged', multiplier: 3, color: '#e6dcfd', element: 'Electro' }],
			[1, { name: 'Lunar-Crystalize', multiplier: 1.6, color: '#f6e9bc', element: 'Geo' }]
		]),
		desc: 'Special transformative reactions that can crit. Enabled by certain Nod-Krai characters.'
	}],
	[5, {
		name: 'Direct Lunar',
		baseDamage: BaseDamage.Talent,
		rxnMode: RxnMode.Multiplicative,
		emBonus: EMBonusType.Lunar,
		isTransformative: true,
		transformativeCrit: false,
		reactions: new Map([
			[0, { name: 'Lunar-Charged (Direct)', multiplier: 3, color: '#e6dcfd', element: 'Electro' }],
			[2, { name: 'Lunar-Crystalize (Direct)', multiplier: 1.6, color: '#f6e9bc', element: 'Geo' }],
			[1, { name: 'Lunar-Bloom', multiplier: 1, color: '#c8ffe6', element: 'Dendro' }]
		]),
		desc: 'Special transformative reactions that can crit and that have their base damage calculated directly from a character\'s talent. Enabled by certain Nod-Krai characters.'
	}],
	[6, {
		name: 'Direct Stellar',
		baseDamage: BaseDamage.Talent,
		rxnMode: RxnMode.Multiplicative,
		emBonus: EMBonusType.Lunar,
		isTransformative: true,
		transformativeCrit: false,
		stellarHit: true,
		reactions: new Map([
			[0, { name: 'Stellar-Conduct', multiplier: (attack) => {
				const hits = attack.getStatAsNumber('stellarElementalHits', StatType.Number);
				if (hits === 0) return 1;
				return Math.min(1.4 + hits * 0.05, 1.9);
			}, color: '#c2c8ff', element: 'Varies' }]
		]),
		desc: 'Special transformative reactions that can crit and that have their base damage calculated directly from a character\'s talent. Enabled when a character with a Stellar Linchpin is present.'
	}],
	[2, {
		name: 'Transformative',
		baseDamage: BaseDamage.Level,
		rxnMode: RxnMode.Multiplicative,
		emBonus: EMBonusType.Transformative,
		isTransformative: true,
		transformativeCrit: true,
		reactions: new Map([
			[0, { name: 'Burgeon', multiplier: 3, color: '#ff9b00', element: 'Dendro' }],
			[1, { name: 'Hyperbloom', multiplier: 3, color: '#e19bff', element: 'Dendro' }],
			[4, { name: 'Shatter', multiplier: 3, color: '#ffffff', element: 'Physical' }],
			[2, { name: 'Overloaded', multiplier: 2.75, color: '#ff809b', element: 'Pyro' }],
			[3, { name: 'Bloom', multiplier: 2, color: '#00ea53', element: 'Dendro' }],
			[5, { name: 'Electro-Charged', multiplier: 2, color: '#e19bff', element: 'Electro' }],
			[7, { name: 'Superconduct', multiplier: 1.5, color: '#b4b4ff', element: 'Cyro' }],
			[6, { name: 'Swirl', multiplier: 0.6, color: '#66ffcc', element: 'Varies', canApply: true }],
			[8, { name: 'Burning', multiplier: 0.25, color: '#ff9b00', element: 'Pyro', canApply: true }]
		]),
		desc: 'Transformative reactions purely deal reaction damage with their base damage calculated from the character level multiplier and the base reaction multiplier. They ignore damage bonus and enemy DEF. They can only crit if explictly enabled by a talent such as Nahida\'s C2.'
	}],
]);

export default reactionTypes;