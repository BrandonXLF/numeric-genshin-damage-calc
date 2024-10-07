import DamageCalculator from "../utils/DamageCalculator";
import { StatType } from "../types/Stat";
import StatData from "../types/StatData";
import evaluateExpression from "../utils/evalulateExpression";
import stats from "../utils/stats";
import attributes, { getAttrStat } from "../utils/attributes";
import Damage from "../types/Damage";
import IDGenerator from "./IDGenerator";
import PartialAttack, { StoredAttack } from "../types/PartialAttack";

export default class Attack implements PartialAttack {
	private readonly calculator = new DamageCalculator(this);
	private dmgCache?: Damage;
	private invalidateDmgCache = true;

    constructor(
        private _reactionType: number,
        private _reaction: number,
        private _label: string,
        private _statData: StatData,
        private _synced: string[],
        private _unmodified: boolean = true,
		public readonly id = IDGenerator.generate()
    ) {}
	
	static fromBase(base?: PartialAttack, copyDataAndId = false) {
        let attack = new this(
            base?.reactionType ?? 0,
			base?.reaction ?? 0,
            base?.label ?? '',
			copyDataAndId ? {...(base as Attack).statData} : {} as StatData,
            base?.synced ? [...base.synced] : ['characterLevel'],
            base === undefined ? true : (base.unmodified ?? false),
			copyDataAndId ? (base as Attack).id : undefined
        );
        
		if (copyDataAndId) {
			return attack;
		}

		let unmodified = attack.unmodified;

        stats.forEach(stat => {
            if (stat.usesAttrs) {
                let anyFound = false;
                
                attributes.forEach(attr => {
                    const prop = getAttrStat(stat.prop, attr);
                    const value = base instanceof Attack
                        ? base.getStat(prop)
                        : base?.statData?.[prop];
                    
                    if (!value) return;
                
                    attack.setStat(prop, value);
   
                    anyFound = true;
                });
                
                if (anyFound)
                    return;
            }

            const value = base instanceof Attack
                ? base.getStat(stat.prop)
                : base?.statData?.[stat.prop];

            attack.setStat(stat.prop, value ?? stat.default.toString());
        });
        
		attack._unmodified = unmodified;
        return attack;
    }

    getStat(name: keyof StatData) {
		return this._statData[name];
	}

	getStatValue(name: keyof StatData, statType: StatType) {
		const value = evaluateExpression(this._statData[name] ?? '');
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

    set synced(synced: string[]) {
        this._synced = synced;
		this._unmodified = false;
    }

    get unmodified() {
        return this._unmodified;
    }

	toObject(): StoredAttack {
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