import '../less/FormInput.less';
import SelectOptions from './SelectOptions';
import SelectOption from '../types/SelectOption';
import Popup from 'reactjs-popup';
import PopupHeader from './PopupHeader';
import React from 'react';
import { PopupActions } from 'reactjs-popup/dist/types';
import SVGButton from './SVGButton';

export default function FormInput(props: {
	value: string;
	onChange: (val: string) => void;
	options?: SelectOption[];
	type?: string;
	disabled?: boolean;
	expandIcon?: React.ReactNode | boolean,
	expandIconLabel?: string;
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
	const popupRef = React.useRef<PopupActions>(null);
	
	return <div className={`form-input ${props.class ?? ''}`}>
		{!props.disabled && props.expandIcon &&
			<div className="input-icon" role="img" title={props.expandIconLabel}>
				<Popup trigger={<SVGButton mini label={props.expandIconLabel!} svg={props.expandIcon} hideLabel></SVGButton>} ref={popupRef} modal>
					<PopupHeader title="Equation Input" ref={popupRef} />
					<div className="calc">
						<textarea
							className="popup-textarea"
							value={props.value}
							rows={3}
							onChange={e => props.onChange(e.target.value)}
							placeholder={props.placeholder}
						/>
					</div>
				</Popup>
			</div>
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
		{!props.disabled && props.backIcon &&
			<div className="input-icon" role="img" title={props.backIconLabel}>{props.backIcon}</div>
		}
		{!props.disabled && props.unit &&
			<select className="mini-select" value={props.unit} onChange={e => props.onUnitChange!(e.target.value)}>
				<SelectOptions options={props.unitOptions!} />
			</select>
		}
	</div>;
};