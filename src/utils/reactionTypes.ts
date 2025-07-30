import ReactionType, { BaseDamage, EMBonusType, RxnMode } from "../types/ReactionType";

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
		reactions: new Map([
			[0, { name: 'Lunar-Charged', multiplier: 1.8, color: '#e6dcfd', element: 'Electro' }]
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
			[0, { name: 'Lunar-Charged (Direct)', multiplier: 3, color: '#e6dcfd', element: 'Electro' }]
		]),
		desc: 'Special transformative reactions that can crit and that have their base damage calculated directly from a character\'s talent. Enabled by certain Nod-Krai characters.'
	}]
]);

export default reactionTypes;