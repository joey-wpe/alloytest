import React from 'react';
import styles from './Pricing.module.scss';
import Background from '../../atoms/Background/Background';
import Button from '../../atoms/Button/Button';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import CardPrice from '../../molecules/CardPrice/CardPrice';
import { useState, useEffect } from 'react';

const Pricing = ({ imageLogo, description, button, background, cards, setBtnTab, btnTab = 0 }) => {
	const {
		ref: refAnimation,
		inView,
		entry,
	} = useInView({
		threshold: 0,
	});

	const classAnimPlay = inView && styles['anim-play'];
	const classFadeInLeft = styles['anim-fade-in-left'];
	const classFadeInRight = styles['anim-fade-in-right'];

	const [activeBar, setActiveBar] = useState(0);

	const handleScroll = () => setActiveBar(window.pageYOffset);
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
	}, []);

	return (
		<Background type={'solid'} color={'light'} className={styles['m-pricing-table']}>
			<Background className={styles['background-content-card']} {...background}>
				<div className={`${styles.container}`}>
					<div className={`${styles['m-price-content']}`}>
						<div
							className={`
							${styles['m-price-content__information']} 
							${classFadeInLeft} ${classAnimPlay}
						`}
						>
							{imageLogo?.src && (
								<div className={styles['logo-container']}>
									<Image
										className={`${styles['logo-container__logo']}`}
										src={imageLogo.src}
										alt={imageLogo.alt}
										layout="fill"
										priority
										objectFit="contain"
									/>
								</div>
							)}
							<div
								ref={refAnimation}
								className={`${styles['primary-typography']} ${styles['primary-bullet-style']} ${styles['wysiwyg']} ${styles.p}`}
								dangerouslySetInnerHTML={{ __html: description }}
							></div>
							<Button className={styles['content-btn']} {...button} />
						</div>

						<div className={`${styles['m-price-content__cards']} ${classFadeInRight} ${classAnimPlay}`}>
							{cards?.map((card, index) => {
								return <CardPrice className={`${styles.card} light-theme`} key={index} {...card} />;
							})}
						</div>
					</div>
				</div>
			</Background>

			<div className={`${styles['tab-card-table']} ${styles.container} ${activeBar > 350 && styles['active-bg-bar']}`}>
				{cards?.map((card, index) => {
					const title = card.prehead.text;

					return (
						<div
							key={index}
							onClick={() => setBtnTab(index)}
							className={`${styles['title-tab']} ${styles.p} ${btnTab === index ? styles['tab-card-active'] : ''}`}
						>
							{title}
						</div>
					);
				})}
			</div>

			<div className={`${styles.container}`}>
				<div className={`${styles['content-mobile__cards']} `}>
					{cards?.map((card, index) => {
						return (
							<CardPrice
								className={`${styles.card} ${btnTab === index ? styles['card-active'] : ''}`}
								key={index}
								{...card}
							/>
						);
					})}
				</div>
			</div>
		</Background>
	);
};

export default Pricing;
