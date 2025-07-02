import React from 'react';
import SVGButton from "./SVGButton";
import AddSVG from "../svgs/AddSVG";
import LoadSavedPopup from "./LoadSavedPopup";
import '../less/TopButtonRow.less';
import ImportPopup from "./ImportPopup";
import ExportPopup from "./ExportPopup";
import ColumnState, { ColumnStateAction } from '../types/ColumnState';
import HelpSVG from '../svgs/HelpSVG';
import { Link } from 'react-router';

export default function TopButtonRow(props: Readonly<{
	state: ColumnState;
	dispatch: React.Dispatch<ColumnStateAction>;
}>) {
	return <div className="form-top">
		<Link to="/help">
			<SVGButton
				svg={<HelpSVG />}
				label="Help"
				title="Form Information and Help"
			/>
		</Link>
		<SVGButton
			svg={<AddSVG className="pos" />}
			label="Add"
			title="Add Column"
			onClick={() => props.dispatch({type: 'addEmpty'})}
		/>
		<LoadSavedPopup closedColumns={props.state.closed.columns} dispatch={props.dispatch} />
		<ImportPopup dispatch={props.dispatch} />
		<ExportPopup state={props.state} />
	</div>;
}