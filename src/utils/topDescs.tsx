import { ReactNode } from "react";
import ReactionDesc from "../components/ReactionDesc";

export const topDescs = new Map<string, ReactNode>([
	[
		'Label',
		'A cosmetic name for the column. Makes it easier to identify saved columns.'
	],
	[
		'Attack Number',
		'Individual damage instances that contribute to the final calculated damage. Can be used for Lunar-Reactions.'
	],
	[
		'Reaction',
		<ReactionDesc key="reaction" />
	],
	[
		'Secondary Reaction',
		'When reactions apply an element to adjacent entities, those applications can trigger reactions. The base damage is the damage of the original reaction. For triggered transformative reactions, add a separate attack instead.'
	],
	[
		'Contributor',
		'Choose which contributor to the reaction this attack is. 1st is the contributor that did the most damage, 2nd 2nd most, etc.'
	]
]);