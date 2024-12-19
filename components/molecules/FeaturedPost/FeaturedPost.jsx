import styles from './FeaturedPost.module.scss';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Button from '../../atoms/Button/Button';
import { useTranslation } from 'next-i18next';

const FeaturedPost = ({ prehead, title, excerpt, image, link }) => {
	const { t } = useTranslation('common');
	return (
		<div className={`${styles['featured-post']}`}>
			<div className={styles['featured-post__image']}>
				{image && image.src && <Image src={image?.src} layout="fill" alt={image?.alt ?? ''} />}
			</div>
			<p className={`${styles['featured-post__prehead']}`}>{prehead ?? ''}</p>
			<div className={`${styles['featured-post__title']}`}>{title ?? ''}</div>
			<p className={`${styles['featured-post__excerpt']}`}>{excerpt ?? ''}</p>
			{link.href && (
				<Button
					className={`${styles['featured-post__cta']} button`}
					link={link.href}
					buttonStyle="TertiaryDefault"
					buttonText={t('generic.learnMore')}
				/>
			)}
		</div>
	);
};

FeaturedPost.propTypes = {
	preheader: PropTypes.string,
	title: PropTypes.string,
	excerpt: PropTypes.string,
};

export default FeaturedPost;
