import DamageData from "../types/DamageData";
import Attack from "../utils/Attack";

const colors = ['#6dd0fc', '#fc6d85', '#befc6d'];

export default function AttacksExpr(props: Readonly<{
	attacks: Attack[];
	prop: keyof DamageData;
}>) {
	return props.attacks.map((attack, i) => {
		let level = 0;

		return [
			i > 0 ? ' + ' : '',
			attack.damage.getWithDefault(props.prop).fullRawExpr
				.replace(/\*/g, '×')
				.split(/([()])/g)
				.map((m, j) => {
					if (m !== '(' && m !== ')')
						return <span key={j}>{m}</span>;

					if (m === ')') level--;
					const out = <span key={j} style={{ color: colors[level % colors.length] }}>{m}</span>;
					if (m === '(') level++;

					return out;
				})
		];
	}).flat();
}
