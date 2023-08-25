import '../less/FormInput.less';
import SelectOptions from './SelectOptions';
import SelectOption from '../types/SelectOption';

export default function FormInput(props: {
	value: string;
	onChange: (val: string) => void;
	options?: SelectOption[];
	type?: string;
	disabled?: boolean;
	frontIcon?: React.ReactNode | boolean,
	frontIconLabel?: string;
	backIcon?: React.ReactNode | boolean,
	backIconLabel?: string;
	unit?: string;
	unitOptions?: SelectOption[];
	onUnitChange?: (val: string) => void;
	style?: React.CSSProperties;
	class?: string;
	id?: string;
	placeholder?: string;
}) {
	const Tag = props.options ? 'select' : 'input' as const;
	
	return <div className={`form-input ${props.class || ''}`}>
		{props.frontIcon &&
			<div className="input-icon" role="img" title={props.frontIconLabel}>{props.frontIcon}</div>
		}
		<Tag
			type={props.type ?? Tag === 'select' ? '' : 'text'}
			disabled={props.disabled}
			value={props.disabled ? '' : props.value}
			onChange={e => props.onChange(e.target.value)}
			style={props.style}
			id={props.id}
			placeholder={props.placeholder}
		>
			{props.options ? <SelectOptions options={props.options} /> : undefined}
		</Tag>
		{props.backIcon &&
			<div className="input-icon" role="img" title={props.backIconLabel}>{props.backIcon}</div>
		}
		{props.unit &&
			<select className="mini-select" value={props.unit} onChange={e => props.onUnitChange!(e.target.value)}>
				<SelectOptions options={props.unitOptions!} />
			</select>
		}
	</div>;
};