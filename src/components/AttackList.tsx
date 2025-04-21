import SVGButton from "./SVGButton";
import DeleteSVG from "../svgs/DeleteSVG";
import '../less/AttackList.less';
import Attack from "../utils/Attack";

export default function AttackList(props: Readonly<{
	attacks: Attack[];
    activeIndex: number;
    setActive: (id: number, index: number) => void;
    deleteAttack?: (id: number) => void;
}>) {
	return <>
		{props.attacks.map((attack, i) => <span
            key={attack.id}
            className={`attack-list-entry ${i === props.activeIndex ? 'active-attack' : ''}`}
        >
            <SVGButton
                mini
                label={`#${i + 1}`}
                onClick={() => props.setActive(attack.id, i)}
            />
            {props.deleteAttack && props.attacks.length > 1 && <SVGButton
                svg={<DeleteSVG className="neg" />}
                label="Delete Attack"
                mini
                hideLabel
                onClick={() => props.deleteAttack!(attack.id)}
            />}
        </span>)}
	</>;
}