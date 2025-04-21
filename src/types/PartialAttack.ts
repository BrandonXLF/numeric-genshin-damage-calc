import StatData from "./StatData";

interface PartialAttack {
	reactionType?: number;
	reaction?: number;
	secondaryType?: number;
	secondary?: number;
	label?: string;
	statData?: Partial<Record<keyof StatData, string>>;
	synced?: (keyof StatData)[];
	unmodified?: boolean;
}

export interface StoredAttack extends PartialAttack {
	shown?: boolean;
	group?: number;
}

export default PartialAttack;