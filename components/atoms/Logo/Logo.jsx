import PropTypes from 'prop-types';
import React from 'react';
import styles from './Logo.module.scss';
import Image from 'next/image';

const Logo = ({ image_path, image_width, image_height, alt, logosPerRow, classGrid, logoURL, isFirstLoad }) => {
	return (
		<>
			<div className={`${classGrid === 'Grid' && styles['grid-logo-wrapper']} ${styles[`logos-${logosPerRow}`] ?? ''}`}>
				{image_path && (
					<a href={logoURL}>
						<Image
							src={image_path}
							alt={alt}
							width={image_width}
							height={image_height}
							priority={isFirstLoad}
							loading={isFirstLoad ? 'eager' : 'lazy'}
							layout="fixed"
						/>
					</a>
				)}
			</div>
		</>
	);
};

Logo.propTypes = {
	image_path: PropTypes.string,
	image_width: PropTypes.string,
	image_height: PropTypes.string,
	logoURL: PropTypes.string,
	alt: PropTypes.string,
};

export default Logo;
