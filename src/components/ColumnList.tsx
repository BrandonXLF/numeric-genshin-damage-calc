import SVGButton from "./SVGButton";
import DeleteSVG from "../svgs/DeleteSVG";
import '../less/ColumnList.less';

export default function ColumnList(props: {
	columns: unknown[];
    active: number;
    setActive: (index: number) => void;
    deleteColumn?: (index: number) => void;
}) {
	return <>
		{props.columns.map((_, i) => <span key={i} className={`column-list-entry ${i === props.active ? 'active-column' : ''}`}>
            <SVGButton
                mini
                label={(i + 1).toString()}
                onClick={() => props.setActive(i)}
            />
            {props.deleteColumn && props.columns.length > 1 && <SVGButton
                svg={<DeleteSVG className="neg" />}
                label="Delete Attack"
                mini
                hideLabel
                onClick={() => props.deleteColumn!(i)}
            />}
        </span>)}
	</>;
}