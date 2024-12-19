import React from 'react';
import styles from './NewsListItem.module.scss';
import Button from '../../atoms/Button/Button';
import PropTypes from 'prop-types';
import { decodeHtmlEntities } from '../../../wplib/util';

const NewsListItem = ({ date, title, button, className }) => {
	const decodedTitle = decodeHtmlEntities(title) || '';
	return (
		<div className={`${styles['content-list-news']} ${className ?? ''}`}>
			<div className={`${styles['news']} `}>
				<span className={`${styles['sub-p']}`}>{date}</span>
				<h5 className={`${styles.h5}`}>{decodedTitle}</h5>
				<Button {...button} className={styles['button-card-press']} />
			</div>
		</div>
	);
};

NewsListItem.propTypes = {
	date: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	button: PropTypes.object.isRequired,
};
export default NewsListItem;
