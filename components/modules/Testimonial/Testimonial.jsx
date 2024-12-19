import React, { Fragment, useRef } from 'react';
import styles from './Testimonial.module.scss';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Background from '../../atoms/Background/Background';
import ButtonGroup from '../../molecules/ButtonGroup/ButtonGroup';
import Slider from 'react-slick';
import { useInView } from 'react-intersection-observer';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const Testimonial = ({ testimonials }) => {
	const sliderRef = useRef(null);

	const { ref, inView } = useInView();
	if (!testimonials) {
		console.error('Testimonial: No testimonials found!');
		return <></>;
	}

	const classAnimPlay = inView && styles['anim-play'];
	const isSlider = testimonials.length !== 1;

	const sliderSettings = {
		dots: false,
		arrows: false,
		infinite: true,
		autoplaySpeed: 5000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		fade: true,
		pauseOnHover: false,
	};

	return (
		<>
				<Background type="pattern" color="blaze" className={styles.bgSlider}>
					<div className={`${styles.container}`} ref={ref}>
						<Slider ref={sliderRef} className={`${styles.swiperWrapper}`} {...sliderSettings}>
							{testimonials.map(
								({ testimonialText, logo, image, authorName, authorTitle, authorCompany, buttons }, index) => {
									return (
										<Fragment key={index}>
											<div className={`${!image ? styles['full-text-width'] : styles.slide}`}>
												<div
													className={`${styles['text-container']} ${styles.swiper} ${styles['anim-fade-in-left']} ${classAnimPlay}`}
												>
													<blockquote
														className={`${styles.quote} ${styles.p} ${styles['primary-bullet-style']}`}
														dangerouslySetInnerHTML={{ __html: testimonialText }}
													/>

													{logo && (
														<div className={styles.logo}>
															<Image
																className={styles.logoImage}
																src={logo.src}
																alt={logo.alt}
																width={125}
																height={50}
																layout="intrinsic"
																objectFit="contain"
															/>
														</div>
													)}

													{(authorName || authorTitle || authorCompany) && (
														<div className={styles['author-container']}>
															{authorName && (
																<p className={`${styles.author} ${styles.p} ${styles['author-name']}`}>
																	{authorName}
																	<span className={styles['first-line-vertical']}></span>
																</p>
															)}

															{authorTitle && (
																<p className={`${styles.author} ${styles.p} ${styles.postion}`}>{authorTitle}</p>
															)}

															{authorCompany && (
																<p className={`${styles.author} ${styles.p} ${styles.postion}`}>
																	<span className={styles['second-line-vertical']}></span>
																	{authorCompany}
																</p>
															)}
														</div>
													)}

													{buttons && <ButtonGroup {...buttons} className={styles['btn-view']} />}
												</div>

												{image && (
													<div
														className={`${styles['img-container']} ${styles['anim-fade-in-right']} ${classAnimPlay}`}
													>
														<Image
															className={styles.image}
															src={image.src}
															alt={image.alt}
															width={518}
															height={480}
															layout="intrinsic"
															objectFit="contain"
														/>
													</div>
												)}
											</div>
										</Fragment>
									);
								}
							)}
						</Slider>
						{isSlider && (
							<div className={`${styles['arrow-content']}`}>
								<div
									className={`swiper-button-prev ${styles['arrow-prev']} ${styles['arrow-prev-mobile']}`}
									onClick={sliderRef?.current?.slickPrev}
								/>
								<div
									className={`swiper-button-next ${styles['arrow-next']} ${styles['arrow-next-mobile']}`}
									onClick={sliderRef?.current?.slickNext}
								/>
							</div>
						)}
					</div>
				</Background>
		</>
	);
};

Testimonial.propTypes = {
	testimonial: PropTypes.array,
};

export default Testimonial;
