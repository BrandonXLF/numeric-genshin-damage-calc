import StatData from "./StatData";

interface PartialAttack {
	reactionType?: number;
	reaction?: number;
	label?: string;
	statData?: Partial<Record<keyof StatData, string>>;
	synced?: string[];
	unmodified?: boolean;
}

export interface StoredAttack extends PartialAttack {
	shown?: boolean;
	group?: number;
}

export default PartialAttack;