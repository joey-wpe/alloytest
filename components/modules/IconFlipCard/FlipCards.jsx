import PropTypes from 'prop-types';
import React from 'react';
import styles from './FlipCards.module.scss';
import ButtonGroup from '../../molecules/ButtonGroup/ButtonGroup';
import Background from '../../atoms/Background/Background';
import FlipCard from '../../atoms/FlipCard/FlipCard';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';
import { useInView } from 'react-intersection-observer';

const FlipCards = ({
	preHeader,
	preheadType,
	heading,
	titleType,
	content,
	alignment,
	buttons,
	background,
	flipCards,
	columnsPerRow,
}) => {
	const { color } = background;
	const { ref: refAnimation, inView } = useInView({
		threshold: 0,
	});

	// what prehead and heading should to default to if left at default or not passed in
	const preHeadSEODefault = 'h4';
	const titleSEODefault = 'h3';

	const classAnimPlay = inView && styles['anim-play'];
	// use the preHeadType prop if it's defined, otherwise use the preHeadSEODefault
	const preheadTag = !preheadType || preheadType === 'default' ? preHeadSEODefault : preheadType;
	const titleTag = !titleType || titleType === 'default' ? titleSEODefault : titleType;
	return (
		<Background {...background} className={styles[color]}>
			<div className={`${styles['plain-text']} ${styles['anim-fade-in-up']} ${classAnimPlay}`} ref={refAnimation}>
				<div className={styles['container']}>
					<div className={alignment === 'left' ? styles['flip-content-wrapper'] : styles['text-wrapper']}>
						<div className={styles['flip-content']}>
							<HeadingTag Tag={preheadTag} className={`${styles.span} ${styles['subhead']}`} text={preHeader} />
							<HeadingTag Tag={titleTag} className={`${styles.h2}`} text={heading} />
							<div className={`${styles.p}`} dangerouslySetInnerHTML={{ __html: content ?? '' }} />
						</div>
						{buttons && (
							<div className={styles['button-group']}>
								<ButtonGroup alignment={buttons.alignment} buttons={buttons?.buttons} />
							</div>
						)}
					</div>
					<div
						className={`${styles['flip-cards-wrapper']}`}
						ref={refAnimation}
						style={{ gridTemplateColumns: `repeat(${columnsPerRow}, 1fr)` }}
					>
						{flipCards?.map((item, index) => {
							const classAnimDelay = `anim-delay-${+index + 1}`;
							return (
								<FlipCard
									{...item}
									key={index}
									className={`${styles['anim-fade-in-up']} ${classAnimDelay} ${classAnimPlay}`}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</Background>
	);
};

FlipCards.propTypes = {
	preHeader: PropTypes.string,
	preheadType: PropTypes.string,
	heading: PropTypes.string,
	titleType: PropTypes.string,
	content: PropTypes.string,
	backgroundImage: PropTypes.string,
	buttons: PropTypes.object,
	alignment: PropTypes.oneOf(['left', 'center']),
	background: PropTypes.object,
	flipCards: PropTypes.array,
	columnsPerRow: PropTypes.number,
};

export default FlipCards;
