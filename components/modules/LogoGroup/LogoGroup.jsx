import PropTypes from 'prop-types';
import React from 'react';
import styles from './LogoGroup.module.scss';
import LogoSlider from '../../molecules/LogoSlider/LogoSlider';
import LogoGrid from '../../molecules/LogoGrid/LogoGrid';
import Background from '../../atoms/Background/Background';
import { useInView } from 'react-intersection-observer';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';

const LogoGroup = ({
	preHeader,
	preheadType,
	heading,
	titleType,
	content,
	alignment,
	slides,
	logosPerRow,
	carouselOrGrid,
	background,
}) => {
	const { ref: refAnimation, inView } = useInView({
		threshold: 0,
	});

	const preHeadSEODefault = 'h4';
	const titleSEODefault = 'h3';

	const classAnimPlay = inView && styles['anim-play'];

	// use the preHeadType prop if it's defined, otherwise use the preHeadSEODefault
	const preheadTag = !preheadType || preheadType === 'default' ? preHeadSEODefault : preheadType;
	const titleTag = !titleType || titleType === 'default' ? titleSEODefault : titleType;
	return (
		<Background {...background}>
			<div className={`${styles['plain-text']} ${styles['anim-fade-in-up']} ${classAnimPlay}`} ref={refAnimation}>
				<div className={styles.container}>
					{preHeader && (
						<HeadingTag Tag={preheadTag} className={`${styles.span} ${styles['subhead']}`} text={preHeader ?? ''} />
					)}
					{heading && <HeadingTag Tag={titleTag} className={styles.h2} text={heading ?? ''} />}
					<div className={`${styles.p} `} dangerouslySetInnerHTML={{ __html: content }} />
				</div>
				{carouselOrGrid && carouselOrGrid === 'carousel' ? (
					<div
						className={`${styles['carousel-wrapper']} ${styles['anim-fade-in-up']} anim-delay-5 ${classAnimPlay}`}
					>
						<LogoSlider alignment={alignment} slides={slides} logosPerRow={parseInt(logosPerRow)} />
					</div>
				) : (
					<div className={`$${styles['anim-fade-in-up']} anim-delay-7 ${classAnimPlay}`}>
						<LogoGrid alignment={alignment} logosPerRow={logosPerRow} Grid={slides} carouselOrGrid={carouselOrGrid} />
					</div>
				)}
			</div>
		</Background>
	);
};

LogoGroup.propTypes = {
	preHeader: PropTypes.string,
	preheadType: PropTypes.string,
	heading: PropTypes.string,
	titleType: PropTypes.string,
	content: PropTypes.string,
	alignment: PropTypes.oneOf(['left', 'center', 'right']),
	slides: PropTypes.array,
	logosPerRow: PropTypes.oneOf([2, 3, 4, 5]),
	carouselOrGrid: PropTypes.oneOf(['carousel', 'grid']),
	background: PropTypes.object,
};

LogoGroup.defaultProps = {
	alignment: 'center',
	logosPerRow: 5,
};

export default LogoGroup;
