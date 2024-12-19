import React from 'react';
import styles from './AwardsGrid.module.scss';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';
import Background from '../../atoms/Background/Background';
import { useInView } from 'react-intersection-observer';
import CardAwards from '../../molecules/CardAwards/CardAwards';
import { useRef } from 'react';

const AwardsGrid = ({ preHeader, preheadType, heading, titleType, cards, background, id, scrollRefChild }) => {
	const { ref: refAnimation, inView } = useInView({
		threshold: 0,
	});
	const sectionReference = useRef(null);
	const classAnimPlay = inView && styles['anim-play'];
	// what prehead and heading should to default to if left at default or not passed in
	const preHeadSEODefault = 'h4';
	const titleSEODefault = 'h3';
	// use the preHeadType prop if it's defined, otherwise use the preHeadSEODefault
	const preheadTag = !preheadType || preheadType === 'default' ? preHeadSEODefault : preheadType;
	const titleTag = !titleType || titleType === 'default' ? titleSEODefault : titleType;

	return (
		<Background {...background} scrollRefGrandChild={scrollRefChild ?? null}>
			<div className={`${styles.container} ${styles['content-awards']}`} ref={refAnimation} id={id}>
				<div className={styles['awards-title-content']}>
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
				<div className={`${styles['content-cards-award']}`}>
					{cards.map((card, index) => {
						const classAnimDelay = `anim-delay-${index}`;
						return (
							<CardAwards
								key={index}
								{...card}
								className={`${styles['anim-fade-in-up']} ${classAnimDelay ?? ''} ${classAnimPlay} ${styles.card}`}
							/>
						);
					})}
				</div>
			</div>
		</Background>
	);
};

export default AwardsGrid;
