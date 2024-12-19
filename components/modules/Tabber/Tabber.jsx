import React from 'react';
import styles from './Tabber.module.scss';
import Background from '../../atoms/Background/Background';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';
import ButtonGroup from '../../molecules/ButtonGroup/ButtonGroup';
import Image from 'next/image';
import ArrowDown from '../../../public/icons/arrow-down-blue.svg';

const Tabber = ({ background, className, contentTabber, orientation = 'horizontal', TabberTitleTag = 'h6' }) => {
	//active card - when index button and card tabber coincidence
	const [altTabber, setAltTabber] = useState(0);
	//active dropdown in event onClick
	const [dropDown, setDropDown] = useState(false);
	//change Background
	const [backgroundDynamic, setBackgroundDynamic] = useState(background);

	const preHeadSEODefault = 'h4';
	const titleSEODefault = 'h3';

	const { ref, inView } = useInView({
		threshold: 0,
	});

	if (!background) {
		background = {
			type: 'solid',
			color: 'light',
		};
	}

	useEffect(() => {
		const isMobile = window.innerWidth < 710;
		if (isMobile) {
			setBackgroundDynamic({ type: 'pattern', color: 'blaze' });
		}
	}, []);

	const classAnimPlay = inView && styles['anim-play'];

	return (
		<Background {...backgroundDynamic}>
			<div className={`${styles.container} ${styles['component-tabber']}`} ref={ref}>
				<div
					className={`${className ?? ''} ${orientation === 'vertical' ? styles['tabber-vertical'] : styles['tabber']}`}
				>
					<div
						className={`
						${styles['button-tabber']} 
						${styles['anim-fade-in-up']} 
						${classAnimPlay}
					`}
						onClick={() => {
							setDropDown(!dropDown);
						}}
					>
						{contentTabber.map(({ tabTitle, title, subTitle }, index) => {
							const titleTab = tabTitle ?? title.text;
							return (
								<div
									key={index}
									onClick={() => setAltTabber(index)}
									className={`${styles['title-button']} ${dropDown && styles['title-button--active']}`}
								>
									<TabberTitleTag
										key={index}
										className={`
											${styles.h6} 
											${styles['button-tabber-heading']}
											${altTabber === index && styles['active-button-tabber']}
											${dropDown && styles['dropdown-active']}
										`}
									>
										{titleTab}
										{subTitle && <span className={`${styles['dividing-line']}`}> | </span>}
									</TabberTitleTag>
									{subTitle && (
										<span
											className={`${styles['sub-p']} ${altTabber === index && styles['sub-p--active']} ${
												dropDown && styles['dropdown-active']
											} ${styles['anim-fade-in-up']} ${classAnimPlay}`}
										>
											{subTitle}
										</span>
									)}
								</div>
							);
						})}
						<div className={`${styles['arrow-down']} ${dropDown && styles['arrow-down--active']}`}>
							<Image src={ArrowDown} alt="Icon Arrow" width={10} height={16} />
						</div>
					</div>

					<div className={`${styles['content-tabber']}`}>
						{contentTabber.map(({ prehead, preheadLogo, title, description, action, image }, index) => {
							// use the preHeadType prop if it's defined, otherwise use the preHeadSEODefault
							const preheadTag = !prehead?.Tag || prehead?.Tag === 'default' ? preHeadSEODefault : prehead?.Tag;
							const titleTag = !title?.Tag || title?.Tag === 'default' ? titleSEODefault : title?.Tag;

							return (
								<div
									key={index}
									className={`${styles['tabber-card']} ${!image.src && styles['full-description']} ${
										altTabber === index && styles['tabber-card-active']
									}`}
								>
									<div
										className={`${styles['content-information']} ${'anim-delay-1'} ${
											styles['anim-fade-in-up']
										} ${classAnimPlay}`}
									>
										{preheadLogo?.src && (
											<div className={styles['logo-container']}>
												<Image
													className={`${styles['logo-container__logo']}`}
													src={preheadLogo.src}
													alt={preheadLogo.alt}
													layout="fill"
												/>
											</div>
										)}
										{title && <HeadingTag Tag={titleTag} className={`${styles.h3}`} {...title} text={title.text} />}
										{description && (
											<div
												className={`${styles['body-p']}  ${styles['primary-bullet-style']}`}
												dangerouslySetInnerHTML={{ __html: description.text }}
											/>
										)}
										{action && (
											<ButtonGroup
												className={`${styles['buttons-content']}`}
												alignment={action.alignment}
												buttons={action.buttons}
											/>
										)}
									</div>
									<div className={styles['image-tabber__wrapper']}>
										<div className={` ${'anim-delay-4'} ${styles['anim-fade-in-up']} ${classAnimPlay}`}>
											{image.src && (
												<div className={styles['image-tabber']}>
													<Image
														className={styles['image-tabber__image']}
														src={image.src}
														alt={image.alt ?? 'Feature Image'}
														layout="fill"
													/>
												</div>
											)}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</Background>
	);
};

export default Tabber;
