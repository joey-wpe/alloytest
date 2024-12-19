import { useState } from 'react';

import styles from './Toggle.module.scss';

const Toggle = ({ options, value, onChange, className, ...rest }) => {
	const [selectedOption, setSelectedOption] = useState(value || options.find((o) => o.default_selection));

	const handleChange = (option) => {
		if (option === selectedOption) {
			return;
		}

		setSelectedOption(option);
		onChange(option);
	};

	return (
		<div className={`${styles['toggle-container']} ${className || ''}`} {...rest}>
			{options.map((option) => (
				<div
					key={option.value}
					className={`${styles['toggle-switch']} ${selectedOption === option ? styles['active'] : ''}`}
					onClick={() => handleChange(option)}
				>
					{option.label}
				</div>
			))}
		</div>
	);
};

export default Toggle;
