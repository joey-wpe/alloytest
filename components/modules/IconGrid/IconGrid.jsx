import React from 'react';
import Background from '../../atoms/Background/Background';
import styles from './IconGrid.module.scss';
import IconCard from '../../molecules/IconCard/IconCard';
import ButtonGroup from '../../molecules/ButtonGroup/ButtonGroup';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';

const IconGrid = ({ content, iconEntries, background, buttons, columnFormat, contentAlignment, iconColor }) => {
	const { prehead, preheadType, title, titleType, description } = content;
	const basicGrid = columnFormat === 'two-columns';
	const centerAlignCardText = contentAlignment === 'center';
	// what prehead and heading should to default to if left at default or not passed in
	const preHeadSEODefault = 'h4';
	const titleSEODefault = 'h3';

	const { ref: refAnimation, inView } = useInView({
		threshold: 0,
	});

	const classAnimPlay = inView && styles['anim-play'];
	const classAnimDelayprehead = `anim-delay-2`;
	const classAnimDelaytitle = `anim-delay-3`;
	const classAnimDelaydescription = `anim-delay-4`;
	// use the preHeadType prop if it's defined, otherwise use the preHeadSEODefault
	const preheadTag = !preheadType || preheadType === 'default' ? preHeadSEODefault : preheadType;
	const titleTag = !titleType || titleType === 'default' ? titleSEODefault : titleType;

	return (
		<Background {...background}>
			<div
				className={`${styles.container} ${basicGrid ? styles['basic-grid'] : styles['grid-active']}`}
				ref={refAnimation}
			>
				<div
					className={`${styles[`content-information-${contentAlignment}`]}  ${
						title || description ? styles['content-padding'] : styles['prehead-only']
					}`}
				>
					<div>
						<HeadingTag
							Tag={preheadTag}
							className={`${styles.span} ${styles['subhead']} ${styles['anim-fade-in-up']} ${classAnimDelayprehead} ${classAnimPlay}`}
							text={prehead}
						/>
						<HeadingTag
							Tag={titleTag}
							className={`${styles.h2} ${styles['anim-fade-in-up']} ${classAnimDelaytitle} ${classAnimPlay}`}
							text={title}
						/>
						<div
							className={`${styles.p} ${styles['anim-fade-in-up']} ${classAnimDelaydescription} ${classAnimPlay}`}
							dangerouslySetInnerHTML={{ __html: description }}
						/>
					</div>
				</div>
				<div
					className={`${
						columnFormat === 'two-columns' && contentAlignment === 'center' && iconEntries.length % 2 != 0
							? styles['column-center']
							: styles[columnFormat]
					}`}
					ref={refAnimation}
				>
					{iconEntries.map((item, index) => {
						const classAnimDelay = `anim-delay-${index + 1}`;
						const delay = {
							animationDelay: `${index + 1}00ms`,
						};

						return (
							<IconCard
								className={`${styles['anim-fade-in-up']} ${classAnimPlay} ${
									centerAlignCardText ? styles['card-text-center'] : styles.card
								}  ${styles['primary-bullet-style']}`}
								key={index}
								{...item}
								style={delay}
								fill={iconColor}
							/>
						);
					})}
				</div>
				{buttons && (
					<div className={`${styles['buttons']}`}>
						<ButtonGroup alignment={buttons.alignment} buttons={buttons.buttons} />
					</div>
				)}
			</div>
		</Background>
	);
};

IconGrid.propTypes = {
	content: PropTypes.object.isRequired,
	iconEntries: PropTypes.array.isRequired,
	background: PropTypes.object,
	buttons: PropTypes.object,
};

export default IconGrid;
