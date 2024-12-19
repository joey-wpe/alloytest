import React from 'react';
import styles from './CardLink.module.scss';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Button from '../../atoms/Button/Button';
import { removeLastTrailingSlash } from '../../../wplib/util';

const CardLink = ({ title, description, button, image, type, className }) => {
	// NOTE:: button?.link is optional - they do not have to link out (based on BE), so we only use a cursor pointer when
	// there is a valid button?.link, and we only wrapp it in a <Link> when a valid button?.link

	// Remove trailing slashes from the link
	button.link = removeLastTrailingSlash(button?.link)
	const innerMarkup = (
		<a
			className={`${styles['card']} ${button?.link && styles['card-tappable']} styles['card']} ${styles[type] ?? ''} ${
				className ?? ''
			}`}
			href={button.link}
		>
			<div className={styles['bg-content-image']}>
				<Image src={image.src} alt={image.alt} width={397} height={540} layout="intrinsic" objectFit="cover" />
			</div>

			<div className={styles['card-information']}>
				<h4 className={`${styles.h4}`}>{title}</h4>
				<div className={`${styles['sub-p']}`} dangerouslySetInnerHTML={{ __html: description }} />
				<div className={styles['button-content']}>
					<Button buttonStyle="TertiaryDefault" target="_blank" isDecorative={true} buttonText={button.buttonText} />
				</div>
			</div>
		</a>
	);

	if (button?.link) {
		return <>{innerMarkup}</>;
	}

	return innerMarkup;
};

CardLink.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	image: PropTypes.object,
	button: PropTypes.object,
};

export default CardLink;
