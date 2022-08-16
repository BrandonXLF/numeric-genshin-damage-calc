import { Stat } from "./Stats";

type DamageType = {
	name: string;
	canCrit: boolean;
	calc: () => number;
	group: DamageGroup;
};

export type CritDamage = {
	nonCrit: number;
	crit: number;
	avgCrit: number;
};

export type StatData = {
	_meta: {
		[attr: string]: Stat
	};
}

export type AnyStatData = StatData & {
	[prop: string]: number | {
		[attr: string]: Stat
	};
}

export type CharacterData = StatData & {
	baseTalentScale: number;
	additionalBonusTalentScale: number;
	bonusTalentScale: number;
	talent: number;
	talentScale: number;
	baseDamageMultiplier: number;
	flatDamage: number;
	damageBonus: number;
	em: number;
	level: number;
	reactionBonus: number;
	critDamage: number;
	critRate: number;
};

export type EnemyData = StatData & {
	level: number;
	defenseIgnore: number;
	defenseDecrease: number;
	resistanceReduction: number;
	resistance: number;
};

export enum DamageGroup {
	NoReaction = 1,
	Amplifying = 2,
	Transformative = 4
}

export default class DamageCalculator {
	private damageTypes: DamageType[] = [
		{
			name: 'No Reaction',
			canCrit: true,
			calc: this.generalDamage,
			group: DamageGroup.NoReaction
		},
		{
			name: 'Melt (Pyro on Cyro)',
			canCrit: true,
			calc: () => this.amplifyingReaction(2),
			group: DamageGroup.Amplifying
		},
		{
			name: 'Melt (Cyro on Pyro)',
			canCrit: true,
			calc: () => this.amplifyingReaction(1.5),
			group: DamageGroup.Amplifying
		},
		{
			name: 'Vaporize (Pyro on Hydro)',
			canCrit: true,
			calc: () => this.amplifyingReaction(1.5),
			group: DamageGroup.Amplifying
		},
		{
			name: 'Vaporize (Hydro on Pyro)',
			canCrit: true,
			calc: () => this.amplifyingReaction(2),
			group: DamageGroup.Amplifying
		},
		{
			name: 'Overloaded',
			canCrit: false,
			calc: () => this.transformativeReaction(4),
			group: DamageGroup.Transformative
		},
		{
			name: 'Shattered',
			canCrit: false,
			calc: () => this.transformativeReaction(3),
			group: DamageGroup.Transformative
		},
		{
			name: 'Electro-Charged',
			canCrit: false,
			calc: () => this.transformativeReaction(2.4),
			group: DamageGroup.Transformative
		},
		{
			name: 'Swirl',
			canCrit: false,
			calc: () => this.transformativeReaction(1.2),
			group: DamageGroup.Transformative
		},
		{
			name: 'Superconduct',
			canCrit: false,
			calc: () => this.transformativeReaction(1),
			group: DamageGroup.Transformative
		}
	];
	
	constructor(
		private character: CharacterData,
		private enemy: EnemyData
	) {}
	
	private enemyDefense() {
		return  (this.character.level + 100) / ((this.character.level + 100) + (this.enemy.level + 100) * (1 - this.enemy.defenseDecrease) * (1 - this.enemy.defenseIgnore));
	}
	
	private enemyResistance() {
		let enemyResistance = this.enemy.resistance - this.enemy.resistanceReduction;
		return enemyResistance < 0
			? 1 - enemyResistance / 2
			: enemyResistance < 0.75
				? 1 - enemyResistance
				: 1 / (4 * enemyResistance + 1);
	}

	private generalDamage() {
		let talentScale = this.character.baseTalentScale * (1 + this.character.additionalBonusTalentScale) + this.character.bonusTalentScale;
		let baseDamage = (this.character.talent * talentScale * this.character.baseDamageMultiplier) + this.character.flatDamage;
		
		return baseDamage * (1 + this.character.damageBonus) * this.enemyDefense() * this.enemyResistance();
	}
	
	private transformativeReaction(multiplier: number) {
		let emBonus = (16 * this.character.em) / (2000 + this.character.em);
		let levelMultiplier = this.character.level < 60
			? 0.0002325 * Math.pow(this.character.level, 3) + 0.05547 * Math.pow(this.character.level, 2) - 0.2523 * this.character.level + 14.47
			: 0.00194 * Math.pow(this.character.level, 3) - 0.319 * Math.pow(this.character.level, 2) + 30.7 * this.character.level - 868;
		
		return multiplier * (1 + emBonus + this.character.reactionBonus) * levelMultiplier * this.enemyResistance();
	}
	
	private amplifyingReaction(multiplier: number) {
		let emBonus = (2.78 * this.character.em) / (1400 + this.character.em);
		let amp = multiplier * (1 + emBonus + this.character.reactionBonus);
		
		return this.generalDamage() * amp;
	}
	
	private crit(nonCrit: number) {
		return nonCrit * (1 + this.character.critDamage);
	}
	
	private avgCrit(nonCrit: number) {
		return nonCrit * (1 + Math.max(0, Math.min(this.character.critRate, 1)) * this.character.critDamage);
	}
	
	calculateDamage(damageTypeIndex: number): CritDamage | number {
		let damageType = this.damageTypes[damageTypeIndex];
		let damage = damageType.calc.apply(this);
		
		if (damageType.canCrit) {
			return {
				nonCrit: damage,
				crit: this.crit(damage),
				avgCrit: this.avgCrit(damage)
			};
		}
		
		return damage;
	}
	
	getDamageGroup(damageTypeIndex: number): DamageGroup {
		return this.damageTypes[damageTypeIndex].group;
	}
	
	getDamageTypes(): [string, number][] {
		return this.damageTypes.map((damageType, i) => [damageType.name, i]);
	}
}