import React from 'react';
import styles from './PricingCard.module.scss';
import Button from '../../atoms/Button/Button';
import PropTypes from 'prop-types';

const PricingCard = ({ title, subhead, pricing, highlights, className }) => {
	return (
		<div className={`${styles['pricing-card']} ${className ?? ''}`}>
			<div className={styles['pricing-card__heading']}>
				{title && <h4 className={`${styles.h4} ${styles['pricing-card__title']}`}>{title}</h4>}
				{subhead && <p className={styles['pricing-card__subhead']}>{subhead}</p>}
			</div>
			<div className={styles['pricing-card__body']}>
				{pricing?.package && pricing?.description && (
					<div className={styles['pricing-card__pricing']}>
						<div className={styles['pricing-card__pricing-head']}>
							{pricing?.package?.price && (
								<p className={styles['pricing-card__pricing-price']}>{`$${pricing?.package?.price}`}</p>
							)}
							{pricing?.package?.info && (
								<span className={styles['pricing-card__pricing-package']}>{pricing?.package?.info}</span>
							)}
						</div>
						{pricing?.description && (
							<p className={styles['pricing-card__pricing-description']}>{pricing?.description}</p>
						)}
					</div>
				)}
				{highlights && (
					<div className={styles['pricing-card__highlights']}>
						<p className={`${styles.h6} ${styles['pricing-card__highlights-title']}`}>Highlights:</p>
						{highlights?.description && (
							<div
								className={styles['pricing-card__highlights-description']}
								dangerouslySetInnerHTML={{ __html: highlights?.description }}
							></div>
						)}
						<Button
							link={highlights?.link?.uri}
							buttonText={highlights?.link?.buttonText}
							buttonStyle={'TertiaryDefault'}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

PricingCard.propTypes = {
	title: PropTypes.string,
	subhead: PropTypes.string,
	pricing: PropTypes.shape({
		package: PropTypes.shape({
			price: PropTypes.string,
			info: PropTypes.string,
		}),
		description: PropTypes.string,
	}),
	highlights: PropTypes.shape({
		description: PropTypes.string,
	}),
};

export default PricingCard;
