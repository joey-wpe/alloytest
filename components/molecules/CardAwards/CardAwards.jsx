import React from 'react';
import styles from './CardAwards.module.scss';
import Button from '../../atoms/Button/Button';
import PropTypes from 'prop-types';
import Image from 'next/image';

const CardAwards = ({ image, date, title, subTitle, className }) => {
	return (
		<div className={`${styles['content-card-press']} ${className ?? ''}`}>
			<div className={styles['content-image']}>
				<Image src={image.src} alt={image.atl} width={157} height={110} objectFit="contain" />
			</div>
			<span className={styles.date}>{date}</span>
			<p className={styles['sub-p']}>{title}</p>
			<p className={styles['sub-p']}>{subTitle}</p>
		</div>
	);
};

CardAwards.propTypes = {
	date: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subTitle: PropTypes.string.isRequired,
	image: PropTypes.object.isRequired,
};
export default CardAwards;
