import SVGButton from "./SVGButton";
import DeleteSVG from "../svgs/DeleteSVG";
import '../less/AttackList.less';

export default function AttackList(props: {
	attacks: unknown[];
    active: number;
    setActive: (index: number) => void;
    deleteAttack?: (index: number) => void;
}) {
	return <>
		{props.attacks.map((_, i) => <span key={i} className={`attack-list-entry ${i === props.active ? 'active-attack' : ''}`}>
            <SVGButton
                mini
                label={`#${i + 1}`}
                onClick={() => props.setActive(i)}
            />
            {props.deleteAttack && props.attacks.length > 1 && <SVGButton
                svg={<DeleteSVG className="neg" />}
                label="Delete Attack"
                mini
                hideLabel
                onClick={() => props.deleteAttack!(i)}
            />}
        </span>)}
	</>;
}