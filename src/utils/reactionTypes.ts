import DamageGroup from "../types/DamageGroups";
import ReactionType from "../types/ReactionType";

const reactionTypes = new Map<number, ReactionType>([
	[0, {
		name: 'No Reaction',
		canCrit: true,
		equation: 'generalDamage',
		groups: DamageGroup.General,
		reactions: new Map([
			[0, { name: 'No Reaction' }]
		])
	}],
	[1, {
		name: 'Amplifying',
		canCrit: true,
		equation: 'amplifyingReaction',
		groups: DamageGroup.Reaction | DamageGroup.General,
		reactions: new Map([
			[0, { name: 'Melt (Pyro)', var: 2, color: '#ffcc66' }],
			[3, { name: 'Vaporize (Hydro)', var: 2, color: '#33ccff' }],
			[1, { name: 'Melt (Cyro)', var: 1.5, color: '#99ffff' }],
			[2, { name: 'Vaporize (Pyro)', var: 1.5, color: '#ffcc66' }],
		])
	}],
	[2, {
		name: 'Transformative',
		canCrit: false,
		equation: 'transformativeReaction',
		groups: DamageGroup.Reaction,
		reactions: new Map([
			[0, { name: 'Burgeon', var: 3, color: '#ff9b00' }],
			[1, { name: 'Hyperbloom', var: 3, color: '#e19bff' }],
			[4, { name: 'Shatter', var: 3 }],
			[2, { name: 'Overloaded', var: 2.75, color: '#ff809b' }],
			[3, { name: 'Bloom', var: 2, color: '#00ea53' }],
			[5, { name: 'Electro-Charged', var: 2, color: '#e19bff' }],
			[7, { name: 'Superconduct', var: 1.5, color: '#b4b4ff' }],
			[6, { name: 'Swirl', var: 0.6, color: '#66ffcc' }],
			[8, { name: 'Burning', var: 0.25, color: '#ff9b00' }]
		])
	}],
	[3, {
		name: 'Additive',
		canCrit: true,
		equation: 'generalDamage',
		flatDamage: 'flatDamageAdded',
		groups: DamageGroup.General | DamageGroup.Reaction,
		reactions: new Map([
			[0, { name: 'Spread', var: 1.25, color: '#00ea53' }],
			[1, { name: 'Aggravate', var: 1.15, color: '#e19bff' }]
		])
	}]
]);

export default reactionTypes;