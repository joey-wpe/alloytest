import React, { useRef } from 'react';
import styles from './CaseStudySlider.module.scss';
import PropTypes from 'prop-types';
import Background from '../../atoms/Background/Background';
import Image from 'next/image';
import ButtonGroup from '../../molecules/ButtonGroup/ButtonGroup';
import Slider from 'react-slick';
import { useInView } from 'react-intersection-observer';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const CaseStudySlider = ({ stories, background }) => {
	const { ref, inView } = useInView();
	const sliderRef = useRef(null);

	const classAnimPlay = inView && styles['anim-play'];
	const isCarousel = stories.length !== 1;

	const sliderSettings = {
		dots: false,
		arrows: false,
		infinite: true,
		autoplaySpeed: 5000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		fade: true,
		pauseOnHover: false,
	};

	return (
		<Background {...background}>
			<div className={styles['customer-success']} ref={ref}>
				<div className={styles['container']}>
					<div className={styles['angled-background']}></div>
					<div className={styles['slider-wrapper']}>
						<Slider ref={sliderRef} {...sliderSettings}>
							{stories?.map(({ prehead, title, description, image, logo, list, buttons }, index) => {
								if (!image?.src) {
									image = {
										src: '/img/generic-placeholder.png',
										alt: 'Case study image',
									};
								}
								return (
									<div key={index} className={styles['slide']}>
										<div className={styles.content}>
											<div className={styles['img-container']}>
												<div className={`${styles['img-content']} ${styles['anim-fade-in-left']} ${classAnimPlay}`}>
													{image?.src && <Image src={image.src} alt={image.alt} layout="fill" objectFit="cover" />}
													{ isCarousel && (
														<>
															<div
																className={`swiper-button-prev ${styles['button-prev']}`}
																onClick={sliderRef?.current?.slickPrev}
															/>
															<div
																className={`swiper-button-next ${styles['button-next']}`}
																onClick={sliderRef?.current?.slickNext}
															/>
														</>
													)}
												</div>
											</div>

											<div className={`${styles['anim-fade-in-right']} ${classAnimPlay}`}>
												<div className={styles['heading']}>
													<span className={styles.subhead}>{prehead}</span>
													<div className={styles['logo-container']}>
														{logo?.src && <Image className={styles.logo} src={logo.src} alt={logo.alt} layout="fill" />}
													</div>
													<h4 className={styles.h4}>{title}</h4>
													<div className={styles.p} dangerouslySetInnerHTML={{ __html: description }} />
												</div>

												{list.items.length > 1 && (
													<div className={styles['list-container']}>
														<p className={styles['list-title']}>{list.title}</p>
														<ul className={styles.list}>
															{list.items?.map(({ data }, index) => {
																return (
																	<li key={index} className={`${styles['list-element']} ${styles.p}`}>
																		{data}
																	</li>
																);
															})}
														</ul>
													</div>
												)}

												<ButtonGroup className={styles['button-group']} {...buttons} />

												<div
													className={`${styles['button-mobile']} ${!isCarousel && styles['button-mobile-disabled']}`}
												>
													<div
														className={`swiper-button-prev ${styles['button-prev']} ${styles['button-prev-mobile']}`}
														onClick={sliderRef?.current?.slickPrev}
													/>
													<div
														className={`swiper-button-next ${styles['button-next']} ${styles['button-next-mobile']}`}
														onClick={sliderRef?.current?.slickNext}
													/>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</Slider>
					</div>
				</div>
			</div>
		</Background>
	);
};

CaseStudySlider.propTypes = {
	stories: PropTypes.arrayOf(
		PropTypes.shape({
			prehead: PropTypes.string,
			title: PropTypes.string.isRequired,
			description: PropTypes.string,
			buttons: PropTypes.object,
			image: PropTypes.object,
			logo: PropTypes.object,
			list: PropTypes.object,
		})
	).isRequired,
	background: PropTypes.object,
};

export default CaseStudySlider;
