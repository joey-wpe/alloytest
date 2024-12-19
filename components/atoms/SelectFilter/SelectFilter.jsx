import { useState, useEffect } from 'react';
import Select from 'react-select';

import { filterSelectStyles } from '../../../styles/selects/filterSelectStyles';

const SelectFilter = (props) => {
	const { action, reset, defaultValue } = props;
	const [isOpen, setIsOpen] = useState(false);
	const [value, setValue] = useState(defaultValue);

	useEffect(() => {
		setValue(defaultValue);
	}, [reset]);

	return (
		<Select
			styles={filterSelectStyles(isOpen)}
			onMenuOpen={() => setIsOpen(true)}
			onMenuClose={() => setIsOpen(false)}
			components={{
				IndicatorSeparator: () => null,
			}}
			value={value}
			onChange={(option) => {
				action(option);
				setValue(option);
			}}
			instanceId={value.value} // Fix hydration id mismatch: https://github.com/JedWatson/react-select/issues/5459#issuecomment-1312245530
			{...props}
		/>
	);
};

export default SelectFilter;
