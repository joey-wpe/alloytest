import React from 'react';
import styles from './PricingCards.module.scss';
import PricingCard from '../../molecules/PricingCard/PricingCard';
import Background from '../../atoms/Background/Background';
import { useInView } from 'react-intersection-observer';

const PricingCards = ({ cards, className }) => {
	//Animation
	const { ref: refAnimation, inView } = useInView({
		threshold: 0,
	});

	const classAnimPlay = inView && styles['anim-play'];

	return (
		<div className={className}>
			<Background type={'pattern'} color={'rainbow'} className={styles['pricing-cards__background']}>
				<div className={styles['pricing-cards']}>
					<div className={styles.container}>
						<div className={styles['pricing-cards__cards']} ref={refAnimation}>
							{cards.map((card, index) => {
								const classAnimDelay = `anim-delay-${+index + 1}`;
								return (
									<PricingCard
										key={index}
										{...card}
										className={`${styles['anim-fade-in-up']} ${classAnimDelay} ${classAnimPlay} ${styles.card}`}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</Background>
		</div>
	);
};

export default PricingCards;
