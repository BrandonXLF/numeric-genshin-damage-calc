import DamageCalculator from "../utils/DamageCalculator";
import { StatType } from "../types/Stat";
import StatData from "../types/StatData";
import evaluateExpression from "../utils/evalulateExpression";
import stats from "../utils/stats";
import attributes, { getAttrStat } from "../utils/attributes";
import Damage from "../types/Damage";
import IDGenerator from "./IDGenerator";
import PartialAttack from "../types/PartialAttack";

export default class Attack implements PartialAttack {
	readonly id: number;

    private readonly valueCache: Map<keyof StatData, number> = new Map();
	private readonly calculator = new DamageCalculator(this);
	private dmgCache?: Damage;
    private invalidateDmgCache = true;

    private _reactionType: number;
    private _reaction: number;
    private _label: string;
    private _statData: StatData;
    private _synced: (keyof StatData)[];
    private _unmodified: boolean = true;

    /**
     * @param base The attack to base this one off of. All data is deeply copied.
     * @param copyDataAndId Copy the stat data without verification and the ID.
     */
    constructor(base?: PartialAttack, copyDataAndId = false) {
        this._reactionType = base?.reactionType ?? 0;
        this._reaction = base?.reaction ?? 0;
        this._label = base?.label ?? '';
        this._statData = copyDataAndId ? {...(base as Attack).statData} : {} as StatData;
        this._synced = base?.synced ? [...base.synced] : ['characterLevel'];
        this._unmodified = base === undefined ? true : (base.unmodified ?? false);
        
        this.id = copyDataAndId ? (base as Attack).id : IDGenerator.generate();
        
		if (copyDataAndId) {
			return;
		}

        stats.forEach(stat => {
            if (stat.usesAttrs) {
                let anyFound = false;
                
                attributes.forEach(attr => {
                    const prop = getAttrStat(stat.prop, attr);
                    const value = base instanceof Attack
                        ? base.getStat(prop)
                        : base?.statData?.[prop];
                    
                    if (!value) return;
                
                    this._statData[prop] = value;
                    anyFound = true;
                });
                
                if (anyFound)
                    return;
            }

            const value = base instanceof Attack
                ? base.getStat(stat.prop)
                : base?.statData?.[stat.prop];

            this._statData[stat.prop] = value ?? stat.default.toString();
        });
    }

    getStat(name: keyof StatData) {
		return this._statData[name];
	}

	getStatAsNumber(name: keyof StatData, statType: StatType) {
		if (!this.valueCache.has(name)) {
			const computed = evaluateExpression(this._statData[name] ?? '');
			this.valueCache.set(name, computed);
		}		

		const value = this.valueCache.get(name)!;
		return statType === StatType.Percent ? value / 100 : value;
	}

	hasStat(name: keyof StatData) {
		return name in this._statData;
	}

	setStat(name: keyof StatData, value: string | undefined) {
		if (value === undefined) {
			delete this._statData[name];
		} else {
			this._statData[name] = value;
		}

		this.valueCache.delete(name);
		this._unmodified = false;
		this.invalidateDmgCache = true;
	}

	get statData(): Readonly<StatData> {
		return this._statData;
	}

	get damage() {
		if (this.invalidateDmgCache || !this.dmgCache) {
			this.dmgCache = this.calculator.calculateDamage();
			this.invalidateDmgCache = false;
		}

		return this.dmgCache;
	}

    get reactionType() {
        return this._reactionType;
    }

    set reactionType(reactionType: number) {
        this._reactionType = reactionType;
		this._unmodified = false;
		this.invalidateDmgCache = true;
    }

    get reaction() {
        return this._reaction;
    }

    set reaction(reaction: number) {
        this._reaction = reaction;
		this._unmodified = false;
		this.invalidateDmgCache = true;
    }

    get label() {
        return this._label;
    }

    set label(label: string) {
        this._label = label;
		this._unmodified = false
    }

    get synced() {
        return this._synced;
    }

    set synced(synced: (keyof StatData)[]) {
        this._synced = synced;
		this._unmodified = false;
    }

    get unmodified() {
        return this._unmodified;
    }

    /**
     * @returns An object representation of this attack. `statData` and `synced` are readonly!
     */
	toObject(): Readonly<PartialAttack> {
		return {
			reactionType: this.reactionType,
			reaction: this.reaction,
			label: this.label,
			statData: this.statData,
			synced: this.synced,
			unmodified: this.unmodified
		};
	}
}
