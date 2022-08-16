import React from "react";
import DamageCalculator from "./DamageCalculator";
import OutputElement from "./DamageOutput";

export default function DamageOutputGroup(props: {
	damageCalculator: DamageCalculator,
	damageType: number
}) {
	let damage = props.damageCalculator.calculateDamage(props.damageType);
	
	return <section>
		<h2>Result</h2>
		<div className="output form-grid">
			{typeof damage == 'number'
				? <OutputElement label='Damage' value={damage} />
				: <React.Fragment>
					<OutputElement label='Crit Hit Damage' value={damage.crit} />
					<OutputElement label='Non-Crit Damage' value={damage.nonCrit} />
					<OutputElement label='Average Damage' value={damage.avgCrit} />
				</React.Fragment>
			}
		</div>
	</section>;
}