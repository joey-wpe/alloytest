import PropTypes from 'prop-types';
import React from 'react';
import styles from './Video.module.scss';
import Background from '../../atoms/Background/Background';
import VideoCard from '../../atoms/VideoCard/VideoCard';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';
import ButtonGroup from '../../molecules/ButtonGroup/ButtonGroup';

const VideoModule = ({ preHeader, preheadType, heading, titleType, description, video, background, buttons }) => {
	const { color } = background;
	// what prehead and heading should to default to if left at default or not passed in
	const preHeadSEODefault = 'h4';
	const titleSEODefault = 'h3';

	// use the preHeadType prop if it's defined, otherwise use the preHeadSEODefault
	const preheadTag = !preheadType || preheadType === 'default' ? preHeadSEODefault : preheadType;
	const titleTag = !titleType || titleType === 'default' ? titleSEODefault : titleType;

	return (
		<Background {...background} className={styles[color]}>
			<div className={`${styles['video-module']}`}>
				<div className={styles.container}>
					<div className={styles.content}>
						<HeadingTag
							Tag={preheadTag}
							className={`${styles.subhead} ${styles['anim-fade-in-up']}  ${styles['anim-play']} `}
							text={preHeader}
						/>
						<HeadingTag
							Tag={titleTag}
							className={`${styles.h2} ${styles['anim-fade-in-up']} ${styles['anim-play']}`}
							text={heading}
						/>
						{description && (
							<div
								className={`${styles.p} ${styles['description']}`}
								dangerouslySetInnerHTML={{ __html: description ?? '' }}
							/>
						)}
					</div>
					<div
						className={`${styles['video-card-wrapper']} ${styles['anim-fade-in-up']} ${'anim-delay-3'} ${
							styles['anim-play']
						} ${video.length === 1 ? styles['video-one'] : null}`}
					>
						{video.map((item, index) => (
							<VideoCard video={item} key={index} button={video[index].button} />
						))}
					</div>
					<div>{buttons ? <ButtonGroup className={`${styles['content-button']}`} {...buttons} /> : ''}</div>
				</div>
			</div>
		</Background>
	);
};

VideoModule.propTypes = {
	preHeader: PropTypes.string,
	preheadType: PropTypes.string,
	heading: PropTypes.string,
	titleType: PropTypes.string,
	description: PropTypes.string,
	background: PropTypes.object,
	button: PropTypes.object,
	video: PropTypes.array,
};

export default VideoModule;
