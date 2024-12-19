import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import styles from './PlainText.module.scss';
import ButtonGroup from '../../molecules/ButtonGroup/ButtonGroup';
import Background from '../../atoms/Background/Background';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';

const PlainText = ({ preHeader, preHeadType, heading, headingType, content, alignment, buttons, background }) => {
	const { color } = background;

	const [heightAttemptCounter, setHeightAttemptCounter] = useState(0);
	const contentRef = useRef(null);

	const setContainerHeight = () => {
		window.setTimeout(() => {
			if (contentRef.current.querySelector('.tr-card')) {
				let height = 0;
				// loop through all the cards and find the tallest one
				contentRef.current.querySelectorAll('.tr-card').forEach((card) => {
					if (card.offsetHeight > height) {
						height = card.offsetHeight;
					}
				});
				// add 50px to the height to account for the padding
				height += 50;
				// set the height of the container to the height of the tallest card
				contentRef.current.querySelector('.tr-reviews-viewport').style.height = `${height}px`;
				contentRef.current.querySelector('.trustradius-tqw').style.height = 'auto';
			} else {
				if (heightAttemptCounter < 10) {
					setHeightAttemptCounter(heightAttemptCounter + 1);
					setContainerHeight();
				}
			}
		}, 100);
	};

	useEffect(() => {
		// if there is a trustradius widget added via inline script, set the height of the container to the height of the tallest card
		if (contentRef.current.querySelector('.trustradius-tqw')) {
			setContainerHeight();
		}
	}, [contentRef.current]);

	// what prehead and heading should to default to if left at default or not passed in
	const preHeadSEODefault = 'h4';
	const headingSEODefault = 'h3';

	// use the preHeadType prop if it's defined, otherwise use the preHeadSEODefault
	const preheadTag = !preHeadType || preHeadType === 'default' ? preHeadSEODefault : preHeadType;
	const headingTag = !headingType || headingType === 'default' ? headingSEODefault : headingType;

	return (
		<Background {...background} className={styles[color]}>
			<div className={`${styles['plain-text']}`}>
				<div className={styles['container']}>
					<div className={alignment == 'left' ? styles[`align-${alignment}`] : styles['text-wrapper']}>
						<HeadingTag Tag={preheadTag} className={`${styles.span}  ${styles.subhead}`} text={preHeader} />
						<HeadingTag Tag={headingTag} className={styles.h2} text={heading} />
						<div ref={contentRef} className={styles.p} dangerouslySetInnerHTML={{ __html: content ?? '' }} />
						{buttons ? (
							<div className="button-group">
								<ButtonGroup alignment={buttons.alignment} buttons={buttons.buttons} />
							</div>
						) : null}
					</div>
				</div>
			</div>
		</Background>
	);
};

PlainText.propTypes = {
	preHeader: PropTypes.string,
	preHeadType: PropTypes.string,
	heading: PropTypes.string,
	headingType: PropTypes.string,
	content: PropTypes.string,
	backgroundImage: PropTypes.string,
	buttons: PropTypes.object,
	alignment: PropTypes.oneOf(['left', 'center']),
	background: PropTypes.object,
};

export default PlainText;
