import Attack, { PartialAttack } from "./Attack";
import IDGenerator from "./IDGenerator";

type CopyMode = 'copyAttacks' | 'copyDataAndId' | 'copyNone';

export default class Column {
    attacks: Attack[] = [];
    readonly id = IDGenerator.generate();

    private _activeIndex = 0;

    constructor(attacks: PartialAttack[] | Column = [], mode: CopyMode = 'copyNone') {
        let fromColumn = false;

        if (attacks instanceof Column) {
            fromColumn = true;
            this._activeIndex = attacks.activeIndex;
            this.id = attacks.id;
            attacks = attacks.attacks;
        }

        if (mode === 'copyAttacks') {
            this.attacks.push(...attacks as Attack[]);
        } else {
            attacks.forEach(attack => this.addAttackFromBase(attack, mode === 'copyDataAndId'));
        }
        
        if (this.attacks.length === 0) this.addAttackFromBase();

        if (!fromColumn) {
            this._activeIndex = 0;
        }
    }

    addAttackFromBase(base?: PartialAttack, copyDataAndId = false) {
        this.attacks.push(Attack.fromBase(base, copyDataAndId));
        this._activeIndex = this.attacks.length - 1;
    }

    removeAttack(atkId: number) {
        this.attacks = this.attacks.filter(atk => atk.id !== atkId);
        this._activeIndex = Math.min(this.activeIndex, this.attacks.length - 1);
    }

    setActiveAttack(atkId: number) {
        const atkIndex = this.attacks.findIndex(atk => atk.id === atkId);
        if (atkIndex === -1) return;
        this._activeIndex = atkIndex;
    }

    get activeIndex() {
        return this._activeIndex;
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