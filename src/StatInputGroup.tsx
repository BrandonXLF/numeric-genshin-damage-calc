import { DamageGroup, EnemyData, CharacterData, StatData, AnyStatData } from "./DamageCalculator";
import StatInput from "./StatInput";
import { CharacterStat, EnemyStat, Stat, ValueTypes } from "./Stats";

export default function StatInputGroup(props: {
	title: string,
	stats: CharacterStat[],
	damageGroup: DamageGroup,
	setter: (value: any) => any,
	data: CharacterData
}): JSX.Element;

export default function StatInputGroup(props: {
	title: string,
	stats: EnemyStat[],
	damageGroup: DamageGroup,
	setter: (value: any) => any,
	data: EnemyData
}): JSX.Element;

export default function StatInputGroup(props: {
	title: string,
	stats: Stat[],
	damageGroup: DamageGroup,
	setter: (value: any) => any,
	data: AnyStatData
}) {
	return <section>
		<h2>{props.title}</h2>
		<div className="form-grid">
			{props.stats.map(stat => {
				return <StatInput key={stat.name} stat={stat} value={props.data[stat.attr] as number} damageGroup={props.damageGroup} onChange={val => {
					props.setter({
						...props.data,
						[stat.attr]: val
					});
				}} />
			})}
		</div>
	</section>;
}