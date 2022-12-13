import InputDetails from "../types/InputDetails";
import createInputDetails from "../utils/createInputDetails";
import React from 'react';
import SVGButton from "./SVGButton";
import AddSVG from "../svgs/AddSVG";
import { PopupActions } from "reactjs-popup/dist/types";
import LoadColumnsPopup from "./LoadColumnsPopup";
import '../css/LoadColumnsPopup.css';

export default function TopButtonRow(props: {
	columns: InputDetails[];
	setColumns: React.Dispatch<React.SetStateAction<InputDetails[]>>;
}) {
	return <div className="form-top">
		<LoadColumnsPopup columns={props.columns} setColumns={props.setColumns} />
		<SVGButton
			svg={<AddSVG className="pos" />}
			label="Add Column"
			onClick={() => props.setColumns(
				[...props.columns, createInputDetails(props.columns.find(inputDetails => inputDetails.shown))]
			)}
		/>
	</div>;
}