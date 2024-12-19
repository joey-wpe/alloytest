import styles from './EventCard.module.scss';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button/Button';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { removeLastTrailingSlash } from '../../../wplib/util';

const EventCard = ({
	className,
	prehead,
	title,
	description,
	uri,
	featuredImage,
	type,
	insetImage,
	eventDate,
	resourceType,
}) => {
	const { t } = useTranslation('common');
	// Remove trailing slashes from the link
	uri = removeLastTrailingSlash(uri);
	return (
		<article className={`${styles['event-card']} ${styles[type] ?? ''} ${className ?? ''}`}>
			<a className={styles.content} href={uri}>
				{insetImage || featuredImage ? (
					<div className={styles['img-container']}>
						<>
							{insetImage && (
								<div className={styles['featured-image-container']}>
									<Image
										className={styles['featured-image']}
										src={insetImage.src}
										alt={insetImage.alt}
										layout="fill"
										objectFit="cover"
									/>
								</div>
							)}

							{featuredImage && (
								<Image
									className={`${styles['featured-image-background']}  ${styles['hover-animation-basic']}`}
									src={featuredImage.src}
									alt={featuredImage.alt}
									layout="fill"
									objectFit="cover"
								/>
							)}
						</>

						{insetImage && title && <p className={styles['title-image']} dangerouslySetInnerHTML={{ __html: title }} />}
					</div>
				) : null}

				<div className={styles['text-container']}>
					{resourceType ? <span className={styles.prehead}>{resourceType}</span> : null}
					{(prehead && (
						<span className={styles.prehead}>
							<div dangerouslySetInnerHTML={{ __html: prehead }} />
						</span>
					)) ||
						(eventDate && (
							<span className={styles.prehead}>
								<div dangerouslySetInnerHTML={{ __html: eventDate }} />
							</span>
						))}
					<h2 className={styles['title']}>
						<a href={uri} dangerouslySetInnerHTML={{ __html: title }} />
					</h2>
					<div className={`${styles.p} ${styles.description}`} dangerouslySetInnerHTML={{ __html: description }} />

					<div className={styles['button-container']}>
						<Button
							className={styles['button-component']}
							buttonStyle="TertiaryDefault"
							buttonText={t('generic.readMore')}
							isDecorative={true}
						/>
					</div>
				</div>
			</a>
		</article>
	);
};

EventCard.propTypes = {
	className: PropTypes.string,
	prehead: PropTypes.string,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	actionGroup: PropTypes.object,
	type: PropTypes.string,
	uri: PropTypes.string,
	featuredImage: PropTypes.object,
	backgroundImage: PropTypes.string,
	eventDate: PropTypes.string,
};

export default EventCard;
