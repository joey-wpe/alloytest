import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';
import Image from 'next/image';
import Button from '../../atoms/Button/Button';
import { useTranslation } from 'next-i18next';

const Card = ({ logoImage, prehead, description, button, className }) => {
	const { t } = useTranslation('common');

	return (
		<div className={styles.card}>
			{logoImage?.src && <Image {...logoImage} width={290} height={80} alt={t('card.logoImageAlt')} />}
			<div>
				<div className={styles.subhead}>{prehead}</div>
				<p className={styles.description}>{description}</p>
			</div>
			<Button {...button} />
		</div>
	);
};

Card.propTypes = {
	logoImage: PropTypes.object.isRequired,
	prehead: PropTypes.string.isRequired,
	description: PropTypes.string,
	button: PropTypes.object,
};

export default Card;
