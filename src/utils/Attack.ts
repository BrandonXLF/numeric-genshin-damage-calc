import DamageCalculator from "./DamageCalculator";
import { StatTypes } from "../types/Stat";
import StatData from "../types/StatData";
import evaluateExpression from "./evalulateExpression";
import stats, { statTypes } from "./stats";
import attributes, { getAttrStat } from "./attributes";
import Damage from "../types/Damage";

export interface PartialAttack {
	reactionType?: number;
	reaction?: number;
	label?: string;
	statData?: Partial<Record<keyof StatData, string>>;
	synced?: string[];
	unmodified?: boolean;
	shown?: boolean;
	group?: number;
}

export interface StoredAttack extends PartialAttack {
	shown?: boolean;
	group?: number;
}

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
        private _unmodified: boolean = true
    ) {}
	
	static fromBase(base?: PartialAttack, copyData = false) {
        let attack = new this(
            base?.reactionType ?? 0,
			base?.reaction ?? 0,
            base?.label ?? '',
			copyData ? {...(base as Attack).statData} : {} as StatData,
            base?.synced ? [...base.synced] : [],
            base === undefined ? true : (base.unmodified ?? false)
        );
        
		if (copyData) {
			return attack;
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
        
        return attack;
    }

    getStat(name: keyof StatData) {
		return this._statData[name];
	}

	getStatValue(name: keyof StatData) {
		const type = statTypes[name];
		const value = evaluateExpression(this._statData[name] ?? '');
		return type === StatTypes.Percent ? value / 100 : value;
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