import React from 'react';
import styles from './LocationCard.module.scss';
import { useTranslation } from 'next-i18next';

const LocationCard = ({ locationName, address, city, country, email, phone, fax, className }) => {
	const { t } = useTranslation('common');

	return (
		<div className={`${className ?? ''}`}>
			<h4 className={`${styles['location-card__country']} ${styles.h4}`}>{country ?? ''}</h4>
			<p className={`${styles['subhead']} ${styles['location-card__city']}`}>{city ?? ''}</p>
			<p className={styles['location-card__location-name']}>{locationName ?? ''}</p>
			<div className={styles['location-card__contact']}>
				{address && (
					<div
						className={`${styles['location-card__address']} ${styles['wysiwyg']}`}
						dangerouslySetInnerHTML={{ __html: address }}
					/>
				)}
				{email && (
					<p>
						{t('generic.email') + ': '}
						<a className={styles['location-card__email']} href={`mailto:${email}`}>
							{email}
						</a>
					</p>
				)}
				{phone && (
					<p>
						{t('generic.tel') + ': '}
						<a className={styles['location-card__phone']} href={`tel:${phone}`}>
							{phone}
						</a>
					</p>
				)}
				{fax && <p className={styles['location-card__fax']}>{`Fax: ${fax}`}</p>}
			</div>
		</div>
	);
};

export default LocationCard;
