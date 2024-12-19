import React from 'react';
import PropTypes from 'prop-types';
import styles from './AvatarCard.module.scss';
import Image from 'next/image';
import Button from '../../atoms/Button/Button';

const AvatarCard = ({ image, name, position, button, className }) => {
	const placeholderImageUri = '/img/generic-placeholder.png';
	if (!image) {
		image = {
			src: placeholderImageUri,
			alt: 'Team Member',
		};
	} else if (!image.src) {
		image.src = placeholderImageUri;
	}

	return (
		<div className={`${styles['avatar-card']} ${className ?? ''}`}>
			<div className={styles['content-image']}>
				<Image {...image} layout="fill" alt={name} />
			</div>
			<h5 className={styles.h5}>{name}</h5>
			<span className={styles['sub-p']}>{position}</span>
			{button && (
				<div>
					<Button {...button} />
				</div>
			)}
		</div>
	);
};

AvatarCard.propTypes = {
	image: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	position: PropTypes.string,
	button: PropTypes.object,
};

export default AvatarCard;
