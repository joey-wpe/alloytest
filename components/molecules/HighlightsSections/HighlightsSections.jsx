import React from 'react';
import styles from './HighlightsSections.module.scss';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import Heading from '../../molecules/Heading/Heading';
import ArrowDouble from '../../../public/icons/arrow-double-right-thruster.png';

const HighlightsSections = ({ repeaterItem, checkImage }) => {
	const [refImage, inViewImage] = useInView();
	const [refHeading, inViewHeading] = useInView();
	const classAnimPlay2 = inViewImage && styles['anim-play'];
	const classAnimPlay3 = inViewHeading && styles['anim-play'];
	const classFadeInUp = styles['anim-fade-in-up'];

	return (
		<div className={`${styles['container']} ${styles['container-override']}`}>
			<div
				className={`${styles['content-wrapper']} ${
					checkImage ? styles['next-section-without-image'] : styles['next-section-with-image']
				} ${!repeaterItem.image ? styles['no-image'] : ''}`}
			>
				{repeaterItem.image && (
					<div className={`${styles['content-image']} ${classAnimPlay2} ${classFadeInUp}`} ref={refImage}>
						<Image
							src={repeaterItem.image.mediaItemUrl}
							alt={repeaterItem.image.altText ?? 'section divider image'}
							width={1231}
							height={275}
							layout="responsive"
						/>
					</div>
				)}
				<div
					className={`${repeaterItem.image && styles['repeater-image']} ${
						repeaterItem.showBulletPoints ? styles.repeaterSection : styles['contetnt-only-description']
					} ${styles.repeaterSection}`}
				>
					<div className={`${styles.repeaterSectionLeft} ${styles['primary-bullet-style']}`}>
						<Heading className={`${styles.h3}`} Tag={repeaterItem.type} title={repeaterItem.text} />

						<Heading className={`${styles['p']} `} description={repeaterItem.description} />
					</div>
					{repeaterItem.showBulletPoints && (
						<div
							className={`${styles.repeaterSectionRight} ${`anim-delay-2`} ${classAnimPlay3} ${classFadeInUp}`}
							ref={refHeading}
						>
							<ul className={`${styles['list']} ${styles['p']}`}>
								{Array.isArray(repeaterItem.bulletPoints) &&
									repeaterItem.bulletPoints?.map((bulletPoint, bulletIndex) => {
										return (
											<li key={bulletIndex}>
												<span>
													<Image src={ArrowDouble} alt="Arrow Icon" width={10} height={10} />
												</span>
												{bulletPoint.bullet}
											</li>
										);
									})}
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default HighlightsSections;
