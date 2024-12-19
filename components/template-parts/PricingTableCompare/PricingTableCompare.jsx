import React from 'react';
import styles from './PricingTableCompare.module.scss';
import Background from '../../atoms/Background/Background';
import { useState, useEffect } from 'react';
import Pricing from '../Pricing/Pricing';
import TableCompare from '../../molecules/TableCompare/TableCompare';
import Image from 'next/image';

const PricingTableCompare = ({ price, tableCompare }) => {
	const [btnTab, setBtnTab] = useState(0);
	const card = price.cards;
	const imageLogo = price.imageLogo;
	const bgNav = {
		type: 'pattern',
		color: 'blue',
	};

	const backgroundPrice = {
		type: 'pattern',
		color: 'blue',
	};

	const [activeBar, setActiveBar] = useState(0);

	const handleScroll = () => setActiveBar(window.pageYOffset);
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
	}, []);

	return (
		<Background type={'solid'} color={'light'} className={styles['m-pricing-table']}>
			<div className={`${styles['bar-price-top']} ${activeBar > 200 && styles['active-bar']}`}>
				<div className={`${styles['price-nav']}`}>
					<div className={styles.container}>
						{imageLogo?.src && (
							<div className={styles['logo-container']}>
								<Image
									className={`${styles['logo-container__logo']}`}
									src={imageLogo?.src}
									alt={imageLogo.alt}
									layout="fill"
									priority
									objectFit="contain"
								/>
							</div>
						)}

						<div className={styles['content-title-nav']}>
							{card?.map(({ prehead, price }, index) => {
								//price = string containing price and month (ex: "$20K/year")
								const amountDetails = price.search('/'); // indicates the position of the backslash
								let priceValueExtraction = price.substring(amountDetails, -1); // gets the value expressed before the backslash  (ex: "$20K")
								let detailExtraction = price.substring(amountDetails); //get the monthly detail including backslash (ex: "/year")

								return (
									<div className={`${styles['title-nav']} ${styles[prehead.color] ?? ''}`} key={index}>
										{prehead.text}
										<span>
											<span className={styles['dividing-line']}>|</span> {priceValueExtraction}
											<span className={styles['amount-detail']}>{detailExtraction}</span>
										</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			<Pricing {...price} background={backgroundPrice} setBtnTab={setBtnTab} btnTab={btnTab} />
			<div className={styles['table-compare-desktop']}>
				<TableCompare {...tableCompare} btnTab={btnTab} />
			</div>
		</Background>
	);
};

export default PricingTableCompare;
