import React from 'react';
import styles from './BlogWidget.module.scss';
import Image from 'next/image';
import Button from '../../atoms/Button/Button';

const BlogWidget = ({ image, title, description, link, className }) => {
	return (
		<div className={`${styles['blog-widget']} ${className ?? ''}`}>
			{image?.mediaItemUrl && (
				<div className={styles['content-image']}>
					<Image className={styles.imageLogo} src={image.mediaItemUrl} alt={image.altText} width={236} height={175} />
				</div>
			)}
			<div className={styles['content-description']}>
				<h3 className={`${styles.h3}`}>{title}</h3>

				<div className={`${styles['sub-p']}`} dangerouslySetInnerHTML={{ __html: description }} />
			</div>

			<div className={styles['content-button']}>
				<Button
					className={`${styles['button']} ${styles[`button-PrimaryDefault`]}`}
					buttonStyle={'PrimaryDefault'}
					buttonText={`${link.title}`}
					link={`${link.url}`}
				/>
			</div>
		</div>
	);
};

export default BlogWidget;
