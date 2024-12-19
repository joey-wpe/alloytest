import React from 'react';
import styles from './CardPressSection.module.scss';
import Background from '../../atoms/Background/Background';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';
import CardPress from '../../molecules/CardPress/CardPress';
import Button from '../../atoms/Button/Button';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';

const CardPressSection = ({
	preheadType,
	preHeader,
	heading,
	titleType,
	button,
	stories,
	background,
	children,
	className,
	id,
	scrollRefChild,
}) => {
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

	let childrenActive = children != undefined;

	return (
		<Background {...background} scrollRefGrandChild={scrollRefChild ?? null}>
			<div className={`${styles.container} ${styles['m-press']} ${className ?? ''}`} ref={refAnimation} id={id}>
				<div className={styles['content-copy']}>
					<div className={styles['content-title']}>
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
					<Button {...button} className={`${`anim-delay-2`} ${styles['anim-fade-in-up']} ${classAnimPlay}`} />
				</div>
				<div className={`${childrenActive ? styles['content-grid-children'] : styles['content-cards']}`}>
					{stories.map((storyCard, cardIndex) => {
						const classAnimDelay = `anim-delay-${+cardIndex + 1}`;
						return (
							<CardPress
								key={cardIndex}
								{...storyCard}
								className={`${styles['anim-fade-in-up']} ${classAnimDelay} ${classAnimPlay} ${styles.card}`}
							/>
						);
					})}
					<div className={`${styles['anim-fade-in-up']} ${`anim-delay-3`} ${classAnimPlay} ${styles.children}`}>
						{children}
					</div>
				</div>
			</div>
		</Background>
	);
};

CardPressSection.propTypes = {
	preHeader: PropTypes.string.isRequired,
	heading: PropTypes.string.isRequired,
	titleType: PropTypes.string,
	preheadType: PropTypes.string,
	button: PropTypes.object.isRequired,
	background: PropTypes.object,
	stories: PropTypes.array,
};

export default CardPressSection;
