import SelectOption from '../types/SelectOption';

export default function SelectOptions(props: { options: SelectOption[] }) {
	return <>{props.options.map(option => {
		if ('label' in option)
			return <optgroup key={`GROUP-${option.label}`} label={option.label}>
				<SelectOptions options={option.options} />
			</optgroup>
			
		return <option
			key={option.value ?? option.name}
			value={option.value ?? option.name}
			disabled={option.disabled}
			style={option.style}
		>
			{option.name}
		</option>;
	})}</>;
};