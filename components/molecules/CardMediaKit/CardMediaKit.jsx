import Image from 'next/image';
import React from 'react';
import styles from './CardMediaKit.module.scss';
import { DownloadIconSVG } from '../../atoms/svg/DownloadIcon';

const CardMediaKit = ({ image, downloadBtn, className }) => {
	return (
		<div className={`${styles['card-media-kit']} ${className ?? ''}`}>
			<div className={styles['logo-container']}>
				<Image
					className={`${styles['logo-container__logo']}`}
					src={image.src}
					alt={image.alt}
					layout="fill"
					objectFit="contain"
				/>
			</div>
			<div className={styles['btn-download']}>
				<a href={downloadBtn.link}>{downloadBtn.label}</a>
				<DownloadIconSVG />
			</div>
		</div>
	);
};

export default CardMediaKit;
