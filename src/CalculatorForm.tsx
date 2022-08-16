import React from "react";
import DamageCalculator, { EnemyData, CharacterData } from "./DamageCalculator";
import DamageOutputGroup from "./DamageOutputGroup";
import StatInputGroup from "./StatInputGroup";
import Stats, {  CharacterStatProp, EnemyStatProp, ValueTypes } from "./Stats";

let defaultCharacterData = {
	_meta: {}
} as CharacterData;

Stats.characterStats.forEach(stat => {
	defaultCharacterData[stat.attr] = stat.default;
	defaultCharacterData._meta[stat.attr] = stat;
});

let defaultEnemyData = {
	_meta: {}
} as EnemyData;

Stats.enemyStats.forEach(stat => {
	defaultEnemyData[stat.attr] = stat.default;
	defaultEnemyData._meta[stat.attr] = stat;
});

let percentProxyHandler = {
	get(target: EnemyData & CharacterData, prop: CharacterStatProp & EnemyStatProp, reciever: any): number {
		if (target._meta[prop].type === ValueTypes.Percent) return target[prop] / 100;
		
		return target[prop];
	},
	set(target: CharacterData & EnemyData, prop: CharacterStatProp & EnemyStatProp, value: number) {
		throw new Error('This stat data proxy is readonly.');
	}
};

export default function CalculatorForm() {
	let [characterData, setCharacterData] = React.useState<CharacterData>(defaultCharacterData);
	let [enemyData, setEnemyData] = React.useState<EnemyData>(defaultEnemyData);
	let [damageType, setDamageType] = React.useState(0);
	
	let damageCalculator = new DamageCalculator(
		new Proxy(characterData, percentProxyHandler),
		new Proxy(enemyData, percentProxyHandler)
	);

	let damageGroup = damageCalculator.getDamageGroup(damageType);

	return <div>
		<select value={damageType} onChange={e => setDamageType(+e.target.value)}>
			{damageCalculator.getDamageTypes().map(([name, i]) => {
				return <option value={i} key={name}>{name}</option>;
			})}
		</select>
		<StatInputGroup title="Character Stats" stats={Stats.characterStats} setter={setCharacterData} data={characterData} damageGroup={damageGroup} />
		<StatInputGroup title="Enemy Stats" stats={Stats.enemyStats} setter={setEnemyData} data={enemyData} damageGroup={damageGroup} />
		<DamageOutputGroup damageCalculator={damageCalculator} damageType={damageType} />
	</div>;
}