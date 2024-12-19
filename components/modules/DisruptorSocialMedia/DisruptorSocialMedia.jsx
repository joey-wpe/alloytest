import PropTypes from 'prop-types';
import Background from '../../atoms/Background/Background';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';
import FacebookBlazeSvg from '../../atoms/IconSocial/FacebookBlazeSvg';
import TwitterBlazeSvg from '../../atoms/IconSocial/TwitterBlaze';
import LinkedinBlazeSvg from '../../atoms/IconSocial/LinkedinBlazeSvg';
import ShiftSyncBlazeSvg from '../../atoms/IconSocial/ShiftSyncBlaze';

import styles from './DisruptorSocialMedia.module.scss';

const DisruptorSocialMedia = ({ title, description, socials, background }) => {
	const titleTag = 'h4';
	// const titleTag = !titleType || titleType === 'default' ? titleSEODefault : titleType;
	let textColor = '';
	if (background.type === 'image') {
		textColor = background.colorScheme;
	}
	return (
		<div className={styles.disruptor}>
			<div className={styles.container}>
				<Background {...background} className={`${styles[background.color] ?? ''}`}>
					<div className={`${styles['container']} ${styles['anim-fade-in-up']} ${styles['anim-play']}`}>
						<div className={styles['disruptor-wrapper']}>
							<div className={styles['disruptor-content']}>
								<HeadingTag Tag={titleTag} className={`${styles['h4']} ${styles[textColor] ?? ''}`} text={title} />
								{description && (
									<div
										className={`${styles['p']} ${styles[textColor] ?? ''}`}
										dangerouslySetInnerHTML={{ __html: description }}
									/>
								)}
							</div>
							{socials && (
								<div className={styles['button-group']}>
									{socials.map(({ link, type }, index) => {
										switch (type) {
											case 'facebook':
												return (
													<a key={index} href={link} target="_blank" rel="noreferrer">
														<FacebookBlazeSvg />
													</a>
												);
											case 'twitter':
												return (
													<a key={index} href={link} target="_blank" rel="noreferrer">
														<TwitterBlazeSvg />
													</a>
												);
											case 'linkedin':
												return (
													<a key={index} href={link} target="_blank" rel="noreferrer">
														<LinkedinBlazeSvg />
													</a>
												);
											case 'shiftsync':
												return (
													<a key={index} href={link} target="_blank" rel="noreferrer">
														<ShiftSyncBlazeSvg />
													</a>
												);
											default:
												return null;
										}
									})}
								</div>
							)}
						</div>
					</div>
				</Background>
			</div>
		</div>
	);
};

DisruptorSocialMedia.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	socials: PropTypes.array,
	background: PropTypes.object,
};

export default DisruptorSocialMedia;
