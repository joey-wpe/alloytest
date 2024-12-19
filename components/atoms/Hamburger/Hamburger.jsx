import React from 'react';
import styles from './Hamburger.module.scss';
import { HamburgerSVG } from '../svg/Hamburger';
import { CloseSVG } from '../svg/Close';

const Hamburger = ({ className }) => {
	return (
		<div className={`${styles.hamburger} ${className ?? ''}`}>
			{/* Hamburger Icon */}
			<HamburgerSVG className={styles['hamburger__hamburger']} />
			{/* Close Icon */}
			<CloseSVG className={styles['hamburger__close']} />
		</div>
	);
};

export default Hamburger;
