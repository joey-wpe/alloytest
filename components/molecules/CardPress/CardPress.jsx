import React from 'react';
import styles from './CardPress.module.scss';
import Button from '../../atoms/Button/Button';
import PropTypes from 'prop-types';
import { decodeHtmlEntities } from '../../../wplib/util';

const CardPress = ({ date, title, subTitle, description, button, className, id }) => {
	const decodedTitle = decodeHtmlEntities(title) || '';
	return (
		<div className={`${styles['content-card-press']} ${className ?? ''}`} id={id}>
			<span className={`${styles['sub-p']}`}>{date}</span>
			<h5 className={`${styles.h5}`} dangerouslySetInnerHTML={{ __html: decodedTitle }}></h5>
			<p className={`${styles.subhead}`}>{subTitle}</p>
			<div className={`${styles['sub-p']}`} dangerouslySetInnerHTML={{ __html: description }}></div>
			<Button {...button} className={styles['button-card-press']} />
		</div>
	);
};

CardPress.propTypes = {
	date: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subTitle: PropTypes.string,
	description: PropTypes.string.isRequired,
	button: PropTypes.object.isRequired,
};
export default CardPress;
