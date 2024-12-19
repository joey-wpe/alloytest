import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './CardPartner.module.scss';
import Image from 'next/image';
import Button from '../../atoms/Button/Button';
import { useTranslation } from 'next-i18next';
import { removeLastTrailingSlash } from '../../../wplib/util';
import { TrophySvg } from '../../atoms/svg/Trophy';

const CardPartner = ({ logoImage, prehead, description, title, button, backgroundImage, partnerCertificate }) => {
	const { t } = useTranslation('common');

	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	// Remove trailing slashes from the link
	button.link = removeLastTrailingSlash(button?.link);

	return (
		<a className={`${styles.card} ${styles['card--default']}`} href={button.link}>
			{logoImage?.src ? (
				<div className={`${styles['logo-image']} ${styles['img-container']}`}>
					<Image {...logoImage} layout="fill" objectFit="cover" alt={t('card.logoImageAlt')} />
				</div>
			) : (
				<div className={styles['img-container']}>
					<Image
						className={styles['hover-animation-basic']}
						src={backgroundImage.src}
						alt={backgroundImage.alt}
						layout="fill"
						objectFit="cover"
					/>
				</div>
			)}
			<div className={`${!logoImage.src ? styles.content : styles['content--default']} ${styles.content}`}>
				{prehead && <div className={styles.subhead} dangerouslySetInnerHTML={{ __html: prehead }} />}
				{title && <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />}
				{description && isClient && (
					<p className={`${styles.description} ${styles.p}`} dangerouslySetInnerHTML={{ __html: description }} />
				)}
				<div className={styles.footer}>
					<Button {...button} buttonStyle='TertiaryDefault' className={styles.cta} isDecorative={true} />
					{partnerCertificate && (
						<div className={styles.certificates}>
								<TrophySvg width="26" height="26" />
							<div className={styles['certificates--text']}>
								{partnerCertificate.length} {partnerCertificate.length === 1 ? 'Certification' : 'Certifications'}
							</div>

							<div className={`${styles.tooltip} ${styles['anim-fade-in-up']} ${styles['anim-play']}`}>
								<div className={styles['tooltip--head']}>Certified Solution Partner</div>
								<div className={styles['tooltip--content']}>{partnerCertificate.join(' . ')}</div>
							</div>
						</div>
					)}
				</div>

			</div>
		</a>
	);
};

CardPartner.propTypes = {
	logoImage: PropTypes.object.isRequired,
	prehead: PropTypes.string,
	description: PropTypes.string,
	button: PropTypes.object,
	partnerCertificate: PropTypes.array,
};

export default CardPartner;
