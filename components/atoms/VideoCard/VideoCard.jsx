import PropTypes from 'prop-types';
import React from 'react';
import ReactPlayer from 'react-player/lazy';
import styles from './VideoCard.module.scss';
import Background from '../Background/Background';
import Button from '../Button/Button';

const VideoCard = ({ button, video }) => {
	const TitleTag = !video.titleType || video.titleType === 'default' ? 'h6' : video.titleType;
	return (
		<>
			<div className={`${styles['video-card']}`}>
				<div className={styles['video-wrapper']}>
					{video && (
						<ReactPlayer
							className={`${styles.video}`}
							url={video.mediaContent?.video?.url}
							light={video.mediaContent?.video?.thumbnail ?? false}
							playing={false}
							thumbnail={video.mediaContent?.video?.thumbnail}
							controls={true}
						/>
					)}
				</div>
				{(video.title || video.author || video.designation) && (
					<Background color="white">
						<div className={`${styles['card-body']}`}>
							<TitleTag className={styles['body-p']}>{video.title}</TitleTag>
							<b className={styles['sub-p']}>{video.author}</b>
							<div className={styles['sub-p']} dangerouslySetInnerHTML={{ __html: video.designation }} />
							{button && <Button {...button} className={styles['video-body-button']} />}
						</div>
					</Background>
				)}
			</div>
		</>
	);
};

VideoCard.propTypes = {
	mediaContent: PropTypes.shape({
		video: PropTypes.shape({
			url: PropTypes.string,
			thumbnail: PropTypes.string,
		}),
	}),
	button: PropTypes.object,
};

export default VideoCard;
