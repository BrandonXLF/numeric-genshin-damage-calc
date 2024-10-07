import Attack, { PartialAttack } from "./Attack";

type CopyMode = 'copyAttacks' | 'copyData' | 'copyNone';

export default class Column {
    attacks: Attack[] = [];
    activeIndex = 0;

    constructor(attacks: PartialAttack[] | Column = [], mode: CopyMode = 'copyNone') {
        if (attacks instanceof Column) {
            this.activeIndex = attacks.activeIndex;
            attacks = attacks.attacks;
        }

        if (mode === 'copyAttacks') {
            this.attacks.push(...attacks as Attack[]);
        } else {
            attacks.forEach(attack => this.addAttackFromBase(attack, mode === 'copyData'));
        }
        
        if (this.attacks.length === 0) this.addAttackFromBase();
    }

    addAttackFromBase(base?: PartialAttack, copyData = false) {
        this.attacks.push(Attack.fromBase(base, copyData));
        this.activeIndex = this.attacks.length - 1;
    }

    removeAttack(attack: Attack) {
        this.attacks = this.attacks.filter(iteratedAttack => iteratedAttack !== attack);
        this.activeIndex = Math.min(this.activeIndex, this.attacks.length - 1);
    }

    setActiveAttack(attack: Attack) {
        const atkIndex = this.attacks.indexOf(attack);
        if (atkIndex === -1) return;

        this.activeIndex = atkIndex;
    }

    get active() {
        return this.attacks[this.activeIndex];
    }

    get first() {
        return this.attacks[0];
    }

    get last() {
        return this.attacks[this.attacks.length - 1];
    }

    get unmodified() {
        return this.attacks.length === 1 && this.first.unmodified;
    }
}