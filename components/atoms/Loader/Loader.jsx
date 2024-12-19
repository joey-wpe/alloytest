import React from 'react';
import styles from './Loader.module.scss';

const Loader = ({ className }) => {
	return (
		<div className={`${styles['loader-wrapper']} ${className ?? ''}`}>
			<div className={styles['loader']}></div>
		</div>
	);
};

export default Loader;
