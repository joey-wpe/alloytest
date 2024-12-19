import PropTypes from 'prop-types';
import React from 'react';
import Button from '../../atoms/Button/Button';
import styles from './ButtonGroup.module.scss';

const ButtonGroup = ({ alignment, buttons, className }) => {
	return (
		<div className={`${styles[`button-group`]} ${styles[`align-${alignment}`] ?? ''} ${className ?? ''}`}>
			{/* show buttons (if there are any) */}
			{buttons
				? buttons.map((button, index) => {
						return <Button key={index} {...button} />;
				  })
				: null}
		</div>
	);
};

ButtonGroup.propTypes = {
	alignment: PropTypes.oneOf(['left', 'center', 'right']),
	buttons: PropTypes.array,
};

export default ButtonGroup;
