import React, { useState } from "react";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import SVGButton from "./SVGButton";
import '../less/ExportPopup.less';
import PopupHeader from "./PopupHeader";
import ExportSVG from "../svgs/ExportSVG";
import { csvExport } from "../utils/csv";
import ColumnState from "../types/ColumnState";

export default function ExportPopup(props: Readonly<{
	state: ColumnState;
}>) {
	const ref = React.useRef<PopupActions>(null);
    const [includeClosed, setIncludeClosed] = useState(false);

    function runExport() {
        const str = csvExport(
            includeClosed
                ? [...props.state.shown.columns, ...props.state.closed.columns]
                : props.state.shown.columns
        );

        const blob = new Blob([str], {
            type: 'text/csv'
        });

        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob);
        link.download = 'genshin-damage-calcs.csv';
        link.style.display = 'none'
        
        document.body.append(link);
        link.click();
        link.remove();
        
        URL.revokeObjectURL(link.href);
        ref.current?.close();
    }
	
	return <Popup trigger={
		<SVGButton svg={<ExportSVG />} label="Export" title="Export as CSV" />
	} ref={ref} modal>
        <div className="export">
            <PopupHeader title="Export" ref={ref} />
            <label className="export-check">
                <input
                    type="checkbox"
                    checked={includeClosed}
                    onChange={() => setIncludeClosed(!includeClosed)}
                />
                <span>Include Closed</span>
            </label>
            <div>
                <SVGButton
                    svg={<ExportSVG />}
                    label="Export CSV"
                    onClick={runExport}
                    mini
                />
            </div>
        </div>
	</Popup>
}