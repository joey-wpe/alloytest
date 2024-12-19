import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { EyeSVG } from '../svg/Eye';
import styles from './AccessibilityToggle.module.scss';

const AccessibilityToggle = ({}) => {
	const [toggleAccessibility, setAccessibilityState] = useState(false);
	const { t } = useTranslation('common');
	const accessibilityBodyClass = 'accessibility-colors';

	const toggleAccessibilityState = (accessibilityValue) => {
		setAccessibilityState(accessibilityValue);
		if (accessibilityValue) {
			document.body.classList.add(accessibilityBodyClass);
		} else {
			document.body.classList.remove(accessibilityBodyClass);
		}
	};

	return (
		<>
			<button
				className={`${styles['accessibility-btn']}`}
				onClick={() => toggleAccessibilityState(!toggleAccessibility)}
				tabIndex={0}
			>
				<div className={`${styles['accessibility-btn__inner']}`}>
					<div className={`${styles['accessibility-btn__inner__text']}`}>
						{toggleAccessibility ? t('accessibilityToggle.turnContrastOff') : t('accessibilityToggle.turnContrastOn')}
					</div>
					<EyeSVG />
				</div>
			</button>
		</>
	);
};

AccessibilityToggle.propTypes = {
	children: PropTypes.node,
};

export default AccessibilityToggle;
