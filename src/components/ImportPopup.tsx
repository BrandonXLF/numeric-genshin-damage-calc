import React, { ChangeEvent, useState } from "react";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import SVGButton from "./SVGButton";
import '../less/ImportPopup.less';
import Column from "../utils/Column";
import PopupHeader from "./PopupHeader";
import ImportSVG from "../svgs/ImportSVG";
import GameImportArea from "./GameImportArea";
import ColumnListUtils from "../utils/ColumnListUtils";
import { csvImport } from "../utils/csv";

export default function ImportPopup(props: Readonly<{
	setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}>) {
	const ref = React.useRef<PopupActions>(null);
	const [fileImportError, setFileImportError] = useState<string | undefined>();

	async function importFile(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files![0];

		if (!file) return;

		const text = await file.text();

		let importedColumns: Column[];

		try {
			importedColumns = csvImport(text);
		} catch (e) {
			setFileImportError((e as Error).message);
			return;
		}
		
		ref.current?.close();
		props.setColumns(columns => ColumnListUtils.transfer(columns, ...importedColumns));
	}
	
	return <Popup trigger={
		<SVGButton svg={<ImportSVG />} label="Import" title="Import from CSV or In-Game" />
	} ref={ref} modal onClose={() => setFileImportError(undefined)}>
		<div className="import-popup">
			<PopupHeader title="Import" ref={ref} />
			<h3>File</h3>
			<div>
				<input type="file" accept=".csv" onChange={importFile} />
			</div>
			{fileImportError && <div>Error: {fileImportError}</div>}
			<hr className="import-sep" />
			<h3>In-Game Stats</h3>
			<GameImportArea setColumns={columns => {
				ref.current?.close();
				props.setColumns(columns);
			}} />
		</div>
	</Popup>
}