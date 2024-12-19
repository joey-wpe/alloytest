import React from 'react';
import Background from '../../atoms/Background/Background';
import styles from './MediaKit.module.scss';
import PropTypes from 'prop-types';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';
import { useInView } from 'react-intersection-observer';
import CardMediaKit from '../../molecules/CardMediaKit/CardMediaKit';

const MediaKit = ({ preHeader, preheadType, heading, titleType, mediaStories, background, id, scrollRefChild }) => {
	const { ref: refAnimation, inView } = useInView({
		threshold: 0,
	});

	const classAnimPlay = inView && styles['anim-play'];
	// what prehead and heading should to default to if left at default or not passed in
	const preHeadSEODefault = 'h4';
	const titleSEODefault = 'h3';
	// use the preHeadType prop if it's defined, otherwise use the preHeadSEODefault
	const preheadTag = !preheadType || preheadType === 'default' ? preHeadSEODefault : preheadType;
	const titleTag = !titleType || titleType === 'default' ? titleSEODefault : titleType;
	return (
		<Background {...background} scrollRefGrandChild={scrollRefChild ?? null}>
			<div className={`${styles.container} ${styles['component-media']}`} ref={refAnimation} id={id}>
				<div className={styles['c-media']}>
					<div className={styles['media-title-content']}>
						<HeadingTag
							Tag={preheadTag}
							text={preHeader}
							className={`${styles.subhead} ${`anim-delay-1`} ${styles['anim-fade-in-up']} ${classAnimPlay}`}
						/>
						<HeadingTag
							Tag={titleTag}
							text={heading}
							className={`${styles.h2} ${`anim-delay-2`} ${styles['anim-fade-in-up']} ${classAnimPlay}`}
						/>
					</div>
					<div className={`${styles['media-kit-content']}`}>
						{mediaStories.map((mediaCard, mediaCardindex) => {
							const classAnimDelay = `anim-delay-${mediaCardindex + 1}`;
							return (
								<CardMediaKit
									key={mediaCardindex}
									{...mediaCard}
									className={`${styles['anim-fade-in-up']} ${classAnimDelay} ${classAnimPlay} ${styles.card}`}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</Background>
	);
};

export default MediaKit;
