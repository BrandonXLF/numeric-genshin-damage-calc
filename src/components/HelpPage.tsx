import "../less/index.less";
import "reactjs-popup/dist/index.css";
import "../less/popup.less";
import stats from "../utils/stats";
import { Link } from "react-router";
import { Fragment } from "react/jsx-runtime";
import { topDescs } from "../utils/TopDescs";
import '../less/HelpPage.less';

export default function HelpPage() {
	return <div className="help-page">
		<h2>Form Information and Help</h2>
		<Link to="/">&larr; Back to Calculator</Link>
		<h3>Column Options</h3>
		<dl>
			{[...topDescs.entries()].map(([name, desc]) =>
				<Fragment key={name}>
					<dt>{name}</dt>
					<dd>{desc ?? '-'}</dd>
				</Fragment>
			)}
		</dl>
		<h3>Stat Information</h3>
		<dl>
			{stats.map(stat =>
				<Fragment key={stat.name}>
					<dt>{stat.name}</dt>
					<dd>{stat.desc ?? '-'}</dd>
				</Fragment>
			)}
		</dl>
	</div>;
}
