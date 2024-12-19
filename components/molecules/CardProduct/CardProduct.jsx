import React from 'react';
import styles from './CardProduct.module.scss';
import Background from '../../atoms/Background/Background';
import Image from 'next/image';
import Button from '../../atoms/Button/Button';

const CardProduct = ({ image, title, description, buttons, className }) => {
	return (
		<div className={`${styles['card-product']} ${className ?? ''}`}>
			{image?.src && (
				<div className={styles['content-image']}>
					<Image className={styles.imageLogo} layout="fill" src={image.src} alt={image.alt} />
				</div>
			)}
			<div className={styles['content-description']}>
				<h3 className={`${styles.h3}`}>{title}</h3>

				<div className={`${styles['sub-p']}`} dangerouslySetInnerHTML={{ __html: description }} />
			</div>

			<div className={styles['content-button']}>
				{buttons?.map(({ buttonStyle, buttonText, link, adaText, seoText, target }, index) => {
					return (
						<Button
							className={`${styles['button']} ${styles[`button-${buttonStyle}`]}`}
							key={index}
							buttonStyle={buttonStyle}
							buttonText={buttonText}
							link={link}
							adaText={adaText}
							seoText={seoText}
							target={target}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default CardProduct;
