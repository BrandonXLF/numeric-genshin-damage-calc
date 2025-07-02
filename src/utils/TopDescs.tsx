import { ReactNode } from "react";
import ReactionDesc from "../components/ReactionDesc";

export const topDescs = new Map<string, ReactNode>([
	[
		'Label',
		'A cosmetic name for the column. Makes it easier to identify saved columns.'
	],
	[
		'Attack',
		'Individual damage instances that contribute to the final calculated damage.'
	],
	[
		'Reaction',
		<ReactionDesc key="reaction" />
	],
	[
		'Secondary Reaction',
		'When reactions apply an element to adjacent entities, those applications can trigger reactions. The base damage is the damage of the original reaction. For triggered transformative reactions, add a separate attack instead.'
	],
]);