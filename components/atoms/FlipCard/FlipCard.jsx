import PropTypes from 'prop-types';
import React from 'react';
import styles from './FlipCard.module.scss';
import Button from '../Button/Button';
import Background from '../Background/Background';
import Icon from '../svg/Icon';
import ColorVariables from '../../../styles/_variables.module.scss';

const FlipCard = ({
	background,
	button,
	icon,
	title,
	description,
	frontOverlay,
	backOverlay,
	className,
	iconColor,
}) => {
	const iconColorLightBlue = ColorVariables.LightBlueColor;

	return (
		<>
			<div className={`${styles['flip-card']} ${className ?? ''}`}>
				<div className={styles['flip-card-inner']}>
					<div className={styles['flip-card-front']}>
						<Background {...background} className={background.type === 'image' ? styles['bg-image'] : null}>
							<div className={styles['front-inner']}>
								<div className={styles['flip-icon']}>
									<Icon
										width="68"
										height="68"
										viewBox="0 0 1024 1024"
										fill={frontOverlay === 'none' || frontOverlay === 'white' ? iconColorLightBlue : iconColor}
									>
										{icon}
									</Icon>
								</div>
								<h5
									className={`${styles.h4} ${
										frontOverlay === 'none' || frontOverlay === 'white' ? styles['text-blue'] : styles['text-white']
									}`}
								>
									{title}
								</h5>
								<div className={`${styles[frontOverlay]} ${styles['front-overlay']}`}></div>
							</div>
						</Background>
					</div>

					<div className={`${styles['flip-card-back']}`}>
						<Background {...backOverlay}>
							<div className={styles['back-inner']}>
								<div className={`${styles['sub-p']}`} dangerouslySetInnerHTML={{ __html: description }} />
								<div className={styles['button-wrapper']}>
									{button && (
										<Button
											className={styles['button']}
											buttonStyle={button.buttonStyle}
											buttonText={button.buttonText}
											link={button.link}
											target={button.target}
											adaText={button.adaText}
											seoText={button.seoText}
										/>
									)}
								</div>
							</div>
						</Background>
					</div>
				</div>
			</div>
		</>
	);
};

FlipCard.propTypes = {
	title: PropTypes.string,
	icon: PropTypes.string,
	description: PropTypes.string,
	frontOverlay: PropTypes.oneOf(['white', 'warp', 'blaze', 'tricentis-blue', 'velocity']),
	backOverlay: PropTypes.object,
	background: PropTypes.object,
	button: PropTypes.object,
	className: PropTypes.string,
};

export default FlipCard;
