import ColumnCopyMode from "../types/ColumnCopyMode";
import PartialAttack from "../types/PartialAttack";
import Attack from "./Attack";
import IDGenerator from "./IDGenerator";

export default class Column {
    attacks: Attack[] = [];
    readonly id = IDGenerator.generate();

    private _activeAttackIdx = 0;

    /**
     * @param baseAttacks Array of attacks or column to base the column's attacks on.
     * @param mode The copying mode to use for attacks:
     * * `CopyNone` - Copy nothing. Default.
     * * `CopyAttacks` - Directly copy the base attacks.
     * * `CopyDataAndId` - Copy stat data without verification and IDs.
     */
    constructor(baseAttacks: PartialAttack[] | Column = [], mode = ColumnCopyMode.CopyNone) {
        let fromColumn = false;

        if (baseAttacks instanceof Column) {
            fromColumn = true;
            this._activeAttackIdx = baseAttacks.activeIndex;
            this.id = baseAttacks.id;
            baseAttacks = baseAttacks.attacks;
        }

        if (mode === ColumnCopyMode.CopyAttacks) {
            this.attacks.push(...baseAttacks as Attack[]);
        } else {
            baseAttacks.forEach(attack => this.addAttackFromBase(attack, mode === ColumnCopyMode.CopyDataAndId));
        }
        
        if (this.attacks.length === 0) this.addAttackFromBase();

        if (!fromColumn) {
            this._activeAttackIdx = 0;
        }
    }

    addAttackFromBase(base?: PartialAttack, copyDataAndId = false) {
        this.attacks.push(new Attack(base, copyDataAndId));
        this._activeAttackIdx = this.attacks.length - 1;
    }

    removeAttack(atkId: number) {
        this.attacks = this.attacks.filter(atk => atk.id !== atkId);
        this._activeAttackIdx = Math.min(this.activeIndex, this.attacks.length - 1);
    }

    setActiveAttack(atkId: number) {
        const atkIndex = this.attacks.findIndex(atk => atk.id === atkId);
        if (atkIndex === -1) return;
        this._activeAttackIdx = atkIndex;
    }

    get activeIndex() {
        return this._activeAttackIdx;
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