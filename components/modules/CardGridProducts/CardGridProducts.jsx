import React from 'react';
import styles from './CardGridProducts.module.scss';
import Background from '../../atoms/Background/Background';
import CardProduct from '../../molecules/CardProduct/CardProduct';
import Heading from '../../molecules/Heading/Heading';

const CardGridProducts = ({ commonHeaderDetails, stories, background, type }) => {
	const orientationText = commonHeaderDetails.contentAlignment;
	// console.log(type);
	return (
		<Background {...background}>
			<div className={`${styles.container} ${styles[type]}`}>
				<div className={`${styles['content-information']}  ${styles[`text-orientation-${orientationText}`]}`}>
					<Heading {...commonHeaderDetails} />
				</div>
				<div className={styles['grid-product']}>
					{stories?.map((item, index) => {
						return <CardProduct className={`${styles.card}  light-theme`} key={index} {...item} />;
					})}
				</div>
			</div>
		</Background>
	);
};

export default CardGridProducts;
