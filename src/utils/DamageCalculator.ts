import Damage from "../types/Damage";
import DamageGroup from "../types/DamageGroup";
import DamageType from "../types/DamageType";
import StatData from "../types/StatData";

export default class DamageCalculator {
	static damageTypes: DamageType[] = [
		{
			name: 'No Reaction',
			canCrit: true,
			calc: (self: DamageCalculator) => self.generalDamage(),
			group: DamageGroup.NoReaction
		},
		{
			name: 'Melt (Pyro on Cyro)',
			canCrit: true,
			calc: (self: DamageCalculator) => self.amplifyingReaction(2),
			group: DamageGroup.Amplifying
		},
		{
			name: 'Melt (Cyro on Pyro)',
			canCrit: true,
			calc: (self: DamageCalculator) => self.amplifyingReaction(1.5),
			group: DamageGroup.Amplifying
		},
		{
			name: 'Vaporize (Pyro on Hydro)',
			canCrit: true,
			calc: (self: DamageCalculator) => self.amplifyingReaction(1.5),
			group: DamageGroup.Amplifying
		},
		{
			name: 'Vaporize (Hydro on Pyro)',
			canCrit: true,
			calc: (self: DamageCalculator) => self.amplifyingReaction(2),
			group: DamageGroup.Amplifying
		},
		{
			name: 'Overloaded',
			canCrit: false,
			calc: (self: DamageCalculator) => self.transformativeReaction(4),
			group: DamageGroup.Transformative
		},
		{
			name: 'Shattered',
			canCrit: false,
			calc: (self: DamageCalculator) => self.transformativeReaction(3),
			group: DamageGroup.Transformative
		},
		{
			name: 'Electro-Charged',
			canCrit: false,
			calc: (self: DamageCalculator) => self.transformativeReaction(2.4),
			group: DamageGroup.Transformative
		},
		{
			name: 'Swirl',
			canCrit: false,
			calc: (self: DamageCalculator) => self.transformativeReaction(1.2),
			group: DamageGroup.Transformative
		},
		{
			name: 'Superconduct',
			canCrit: false,
			calc: (self: DamageCalculator) => self.transformativeReaction(1),
			group: DamageGroup.Transformative
		}
	];
	
	constructor(
		private statData: StatData
	) {}
	
	private enemyDefense() {
		return (this.statData.characterLevel.value + 100) / ((this.statData.characterLevel.value + 100) + (this.statData.enemyLevel.value + 100) * (1 - this.statData.defenseDecrease.value) * (1 - this.statData.defenseIgnore.value));
	}
	
	private enemyResistance() {
		let enemyResistance = this.statData.resistance.value - this.statData.resistanceReduction.value;
		return enemyResistance < 0
			? 1 - enemyResistance / 2
			: enemyResistance < 0.75
				? 1 - enemyResistance
				: 1 / (4 * enemyResistance + 1);
	}

	private generalDamage() {
		let talentScale = this.statData.baseTalentScale.value * (1 + this.statData.additionalBonusTalentScale.value) + this.statData.bonusTalentScale.value;
		let baseDamage = (this.statData.talent.value * talentScale * this.statData.baseDamageMultiplier.value) + this.statData.flatDamage.value;
		
		return baseDamage * (1 + this.statData.damageBonus.value) * this.enemyDefense() * this.enemyResistance();
	}
	
	private transformativeReaction(multiplier: number) {
		let emBonus = (16 * this.statData.em.value) / (2000 + this.statData.em.value);
		let levelMultiplier = this.statData.characterLevel.value < 60
			? 0.0002325 * Math.pow(this.statData.characterLevel.value, 3) + 0.05547 * Math.pow(this.statData.characterLevel.value, 2) - 0.2523 * this.statData.characterLevel.value + 14.47
			: 0.00194 * Math.pow(this.statData.characterLevel.value, 3) - 0.319 * Math.pow(this.statData.characterLevel.value, 2) + 30.7 * this.statData.characterLevel.value - 868;
		
		return multiplier * (1 + emBonus + this.statData.reactionBonus.value) * levelMultiplier * this.enemyResistance();
	}
	
	private amplifyingReaction(multiplier: number) {
		let emBonus = (2.78 * this.statData.em.value) / (1400 + this.statData.em.value);
		let amp = multiplier * (1 + emBonus + this.statData.reactionBonus.value);
		
		return this.generalDamage() * amp;
	}
	
	private crit(nonCrit: number) {
		return nonCrit * (1 + this.statData.critDamage.value);
	}
	
	private avgCrit(nonCrit: number) {
		return nonCrit * (1 + Math.max(0, Math.min(this.statData.critRate.value, 1)) * this.statData.critDamage.value);
	}
	
	calculateDamage(damageTypeIndex: number): Damage {
		let damageType = DamageCalculator.damageTypes[damageTypeIndex];
		let damage = damageType.calc(this);
		
		if (damageType.canCrit) {
			return {
				nonCrit: damage,
				crit: this.crit(damage),
				avgDmg: this.avgCrit(damage)
			};
		}
		
		return {
			avgDmg: damage
		};
	}
}