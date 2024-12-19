import React from 'react';
import styles from './ProductTabber.module.scss';
import Tabber from '../Tabber/Tabber';
import Background from '../../atoms/Background/Background';
import Heading from '../../molecules/Heading/Heading';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const ProductTabber = ({ copyTop, copyItems, product, background }) => {
	const { ref: refAnimation, inView } = useInView({
		threshold: 0,
	});
	const classAnimPlay = inView && styles['anim-play'];
	const orientation = 'vertical';

	const [backgroundDynamic, setBackgroundDynamic] = useState(background);
	useEffect(() => {
		const isMobile = window.innerWidth < 710;

		if (isMobile) {
			setBackgroundDynamic({ type: 'solid', color: 'light' });
		}
	}, []);
	const copyBasic = copyItems?.length <= 2;
	const noCopyItems = copyItems?.some(({ item }) => !item.title || !item.description);

	// Get heading tag for title and bump up to next heading tag for item titles (~~ is a faster Math.floor)
	const ItemTitleTag =
		copyTop.titleType?.length === 2 && copyTop.titleType !== 'h6' ? `h${~~copyTop.titleType.substring(1) + 1}` : 'h4';
	const TabberTitleTag = `h${~~ItemTitleTag.substring(1) + 1}`;

	return (
		<Background {...backgroundDynamic}>
			<div className={styles.container}>
				<div className={styles['content-information']}>
					{copyTop.prehead || copyTop.title || copyTop.description ? (
						<Heading
							className={`${styles['header-copy']} ${!noCopyItems && styles['header-copy__no-basic']}`}
							{...copyTop}
						/>
					) : null}

					<div
						className={`${copyBasic && styles['basic-copy']} ${copyItems?.length > 0 && styles['content-items-copy']} ${
							noCopyItems && styles['basic-copy__none']
						}`}
						ref={refAnimation}
					>
						{copyItems?.map(({ item }, index) => {
							const classAnimDelay = `anim-delay-${+index + 1}`;

							return (
								(item.title || item.description) && (
									<div
										key={index}
										className={`${styles['items-copy']} ${styles['anim-fade-in-up']} ${classAnimDelay} ${classAnimPlay}`}
									>
										{item.title && <ItemTitleTag className={styles.h6}>{item.title}</ItemTitleTag>}
										{item.description && <p className={styles.p}>{item.description}</p>}
									</div>
								)
							);
						})}
					</div>
				</div>
				<Tabber
					className={styles['product-tabber-tab']}
					contentTabber={product}
					orientation={orientation}
					TabberTitleTag={TabberTitleTag}
				/>
			</div>
		</Background>
	);
};

export default ProductTabber;
