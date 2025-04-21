import { Reaction } from "../types/ReactionType";
import { elementColors } from "../utils/elements";
import reactionTypes from "../utils/reactionTypes";
import '../less/ReactionDesc.less';

function getElementColor(element: Reaction['element']) {
	if (element === 'Varies')
		return 'White;'

	return elementColors[element];
}

export default function ReactionDesc() {
	const spreadingReactions = [...reactionTypes.get(2)!.reactions.values().filter(reaction => reaction.canApply)];

	return <div className="reaction-desc">
		<div>
			The reaction type of the attack. Different reactions have different properties and multipliers.
		</div>
		<div>
			{spreadingReactions.map((reaction, i, arr) => {
				return <>{i == arr.length - 1 ? ' and ' : i > 0 && ', '}<span key={reaction.name} style={{ color: reaction.color }}>{reaction.name}</span></>;
			})}{' '}
			can trigger a further reaction when spread to another enemy. An additional input will be shown to calculate the additional damage from this secondary reaction.
		</div>
		{[...reactionTypes.entries().map(([id, damageType]) =>
			<div key={id}>
				<h2>{damageType.name}</h2>
				<div>{damageType.desc}</div>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Damage Type</th>
							<th>Multiplier</th>
						</tr>
					</thead>
					<tbody>
						{[...damageType.reactions.entries().map(([subID, damageSubType]) => 
							<tr key={subID}>
								<td style={{ color: damageSubType.color }}>{damageSubType.name}</td>
								<td style={{ color: getElementColor(damageSubType.element) }}>{damageSubType.element}</td>
								<td>{damageSubType.multiplier ?? 'N/A'}</td>
							</tr>
						)]}
					</tbody>
				</table>
			</div>
		)]}
	</div>;
}