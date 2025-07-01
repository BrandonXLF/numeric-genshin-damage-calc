import DamageGroup from "../types/DamageGroups";
import ReactionType from "../types/ReactionType";

const reactionTypes = new Map<number, ReactionType>([
	[0, {
		name: 'No Reaction',
		secondaryName: 'None',
		canCrit: true,
		baseGroups: DamageGroup.General,
		reactions: new Map([
			[0, { name: 'No Reaction', secondaryName: 'None', color: '#ffffff', element: 'Varies' }]
		]),
		desc: 'No reaction damage is done at all.'
	}],
	[1, {
		name: 'Amplifying',
		canCrit: true,
		rxMode: 'amplifying',
		inlineEMBonus: 'amplifyingEMBonus',
		baseGroups: DamageGroup.Reaction | DamageGroup.General,
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
		canCrit: false,
		baseDamage: 'transformativeLevelMultiplier',
		rxMode: 'amplifying',
		isTransformative: true,
		inlineEMBonus: 'transformativeEMBonus',
		baseGroups: DamageGroup.Reaction,
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
		desc: 'Transformative reactions purely deal reaction damage with their base damage calculated from the character level multiplier and the base reaction multiplier.'
	}],
	[3, {
		name: 'Additive',
		canCrit: true,
		rxMode: 'additive',
		baseGroups: DamageGroup.General | DamageGroup.Reaction,
		reactions: new Map([
			[0, { name: 'Spread', multiplier: 1.25, color: '#00ea53', element: 'Dendro' }],
			[1, { name: 'Aggravate', multiplier: 1.15, color: '#e19bff', element: 'Electro' }]
		]),
		desc: 'Additive reactions add additional damage to the damage being done based on the base reaction multiplier, the EM multiplier, and Reaction Bonus.'
	}]
]);

export default reactionTypes;