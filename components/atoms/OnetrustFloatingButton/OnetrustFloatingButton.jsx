import React from 'react';
import styles from './OnetrustFloatingButton.module.scss';

const OnetrustFloatingButton = () => {
	return (
		<button
			id="ot-sdk-btn"
			dataTitle="Adjust my preferences"
			className={`ot-sdk-show-settings ${styles['onetrust-floating-button']}`}
		></button>
	);
};

export default OnetrustFloatingButton;
