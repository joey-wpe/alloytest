import React from 'react';
import styles from './CardPrice.module.scss';
import Button from '../../atoms/Button/Button';
import PropTypes from 'prop-types';

const CardPrice = ({ prehead, subHead, price, description, itemsTitle, items, button, className }) => {
	const symbolString = price.search('/');
	const numberPrice = price.slice(0, symbolString);
	const timePrice = price.slice(symbolString);

	return (
		<div className={`${styles['component-card-price']} ${className ?? ''}`}>
			<div className={styles['title-content']}>
				<h4 className={`${styles.h4} ${styles[prehead.color]}`}>{prehead.text}</h4>
				{subHead && <span className={styles['span-subhead']}>{subHead}</span>}
			</div>
			<div className={styles['card-content']}>
				<div className={styles['card-content__information']}>
					<div className={styles['card-content__information-price']}>
						<h2 className={styles['card-content__information-number']}>{numberPrice}</h2>
						<h6 className={styles.h6}>{timePrice}</h6>
					</div>

					{description && <p className={styles['sub-p']}>{description}</p>}
				</div>
				<div className={`${styles['card-content__items']}`}>
					<h6 className={`${styles.h6}`}>{itemsTitle}</h6>
					{items && (
						<ul className={styles.p}>
							{items.map(({ item }, index) => {
								return (
									<li key={index}>
										<p className={styles.p}>{item}</p>
									</li>
								);
							})}
						</ul>
					)}
				</div>
				<Button className={styles['card-content__button']} {...button} />
			</div>
		</div>
	);
};
CardPrice.propTypes = {
	prehead: PropTypes.object.isRequired,
	subHead: PropTypes.string,
	price: PropTypes.string.isRequired,
	description: PropTypes.string,
	titleItems: PropTypes.string,
	items: PropTypes.array,
	button: PropTypes.object,
};
export default CardPrice;
