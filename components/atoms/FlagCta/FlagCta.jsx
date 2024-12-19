import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './FlagCta.module.scss';
import { removeLastTrailingSlash } from '../../../wplib/util';

const FlagCta = ({ flagStyle = 'primary', title, text, className, href }) => {
	// Remove trailing slashes from the link
	href = removeLastTrailingSlash(href)
	return (
		<div className={`${styles['flag-cta']} ${styles[flagStyle]} ${className ?? ''}`}>
			<div className={styles.line}></div>
			<a className={`${styles['title-container']} ${styles['hover-animation-basic']}`} href={href}>
				<p className={styles.title}>{title}</p>
				<div className={styles['content-arrow']}>
					<Image src="/icons/arrow-white.svg" alt="Arrow" width={16} height={16} layout="fixed" />
				</div>
			</a>

			<p className={styles.text}>{text}</p>
		</div>
	);
};

FlagCta.propTypes = {
	flagStyle: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
	title: PropTypes.string,
	text: PropTypes.string,
	className: PropTypes.string,
	href: PropTypes.string,
};

export default FlagCta;
