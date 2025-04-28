import ColumnCopyMode from "../types/ColumnCopyMode";
import DamageData from "../types/DamageData";
import PartialAttack from "../types/PartialAttack";
import Attack from "./Attack";
import IDGenerator from "./IDGenerator";

export default class Column {
    attacks: Attack[] = [];
    readonly id = IDGenerator.generate();

    private _activeAttackIdx = 0;

    /**
     * @param baseAttacks Array of attacks or column to base the column's attacks on.
     *     If a column is provided, the ID and active index are also copied.
     * @param mode The copying mode to use for attacks:
     * - `CopyNone` - Copy nothing. Default.
     * - `CopyAttacks` - Directly copy the base attacks.
     * - `CopyDataAndId` - Copy stat data without verification and IDs.
     */
    constructor(baseAttacks: (PartialAttack | undefined)[] | Column = [], mode = ColumnCopyMode.CopyNone) {
        if (baseAttacks instanceof Column) {
            this._activeAttackIdx = baseAttacks.activeIndex;
            this.id = baseAttacks.id;
            baseAttacks = baseAttacks.attacks;
        }

        // Ensure there is at least one attack
        if (!baseAttacks.length) baseAttacks.push(undefined);

        if (mode === ColumnCopyMode.CopyAttacks) {
            this.attacks.push(...baseAttacks as Attack[]);
        } else {
            const copyDataAndId = mode === ColumnCopyMode.CopyDataAndId;
            baseAttacks.forEach(base => this.attacks.push(new Attack(base, copyDataAndId)));
        }
    }

    addAttack(base?: PartialAttack) {
        this.attacks.push(new Attack(base));
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

    sumDamage(type: keyof DamageData) {
        let damage = 0;
        let hadError = false;
        let anyWithValue = false;

        for (let attack of this.attacks) {
            let attackDamage = attack.damage[type]?.value;

            if (attackDamage !== undefined) {
                anyWithValue = true;
            } else {
                attackDamage = attack.damage.avgDmg.value;
            }
    
            if (Number.isNaN(attackDamage)) {
                hadError = true;
            }

            damage += attackDamage;
        }

        return {
            damage,
            hadError,
            anyWithValue
        };
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