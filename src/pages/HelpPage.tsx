import "../less/index.less";
import "reactjs-popup/dist/index.css";
import "../less/popup.less";
import stats from "../utils/stats";
import { Link } from "react-router";
import { Fragment } from "react/jsx-runtime";
import { topDescs } from "../utils/TopDescs";
import '../less/HelpPage.less';
import Page from "../components/Page";
import damageTypes from "../utils/damageTypes";

const entries = [
	{
		name: 'Column Options',
		section: 'general',
		data: [...topDescs.entries()].map(([name, desc]) => ({ name, desc }))
	},
	{
		name: 'Stat Information',
		section: 'stats',
		data: stats
	},
	{
		name: 'Damage Types',
		section: 'damage',
		data: damageTypes
	}
];

export default function HelpPage() {
	return <Page title="Form Information and Help">
		<div className="help-page">
			<h2>Form Information and Help</h2>
			<Link to="/">&larr; Back to Calculator</Link>
			<nav aria-labelledby="toc-label">
				<span id="toc-label">Sections:</span>{''}
				<ol className="toc">
					{entries.map(entry => <li key={entry.name}>
						<a href={`#${entry.section}`}>{entry.name}</a>
					</li>)}
				</ol>
			</nav>
			{entries.map(entry => <Fragment key={entry.name}>
				<h3 id={entry.section}>{entry.name}</h3>
				<dl aria-labelledby={entry.section}>
					{entry.data.map(({ name, desc }) =>
						<Fragment key={name}>
							<dt>{name}</dt>
							<dd>{desc ?? '-'}</dd>
						</Fragment>
					)}
				</dl>
			</Fragment>)}
		</div>
	</Page>;
}
