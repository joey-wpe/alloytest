import React from 'react';
import styles from './SearchResultItem.module.scss';
import Button from '../../atoms/Button/Button';
import { useTranslation } from 'next-i18next';

const SearchResultItem = ({ contentType, title, excerpt, url }) => {
	const { t } = useTranslation('common');

	if (!url) {
		console.error('SearchResultItem.url is required to render');
		return <></>;
	}
	return (
		<div className={styles['result-item']}>
			<h3 className={styles['result-item__subhead']}>{contentType}</h3>
			<h2 className={`${styles['result-item__title']} ${styles.h4}`} dangerouslySetInnerHTML={{ __html: title }} />
			<div
				className={`${styles['primary-typography']} ${styles['primary-bullet-style']} ${styles['wysiwyg']}`}
				dangerouslySetInnerHTML={{ __html: excerpt }}
			/>
			<Button
				buttonStyle={'TertiaryReverse'}
				buttonText={t('generic.readMore')}
				link={url}
				className={styles['result-item__cta']}
			/>
			<hr />
		</div>
	);
};

export default SearchResultItem;
