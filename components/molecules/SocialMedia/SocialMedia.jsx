import React from 'react';
import styles from './SocialMedia.module.scss';
import { FacebookSvg } from '../../atoms/IconSocial/FacebookSvg';
import { LinkedinSvg } from '../../atoms/IconSocial/LinkedinSvg';
import { TwitterSvg } from '../../atoms/IconSocial/Twitter';
import PropTypes from 'prop-types';

const SocialMedia = ({ socials, className }) => {
	const socialIcons = {
		facebook: FacebookSvg,
		twitter: TwitterSvg,
		linkedin: LinkedinSvg,
	};
	const iconsProps = [
		{ width: 20, height: 20, viewBox: '0 0 20 20' },
		{ width: 20, height: 17, viewBox: '0 0 20 17' },
		{ width: 18, height: 18, viewBox: '0 0 18 18' },
	];

	return (
		<div className={`${styles['social-media']} ${className ?? ''}`}>
			{socials &&
				socials
					// we only want to show social icons that have a link specified
					.filter((entry) => {
						return entry.link;
					})
					.map(({ link, target }, index) => {
						let SocialIcon = null;
						const iconProps = iconsProps[index];

						if (link) {
							if (link.toLowerCase().includes('linkedin')) {
								SocialIcon = socialIcons.linkedin;
							} else if (link.toLowerCase().includes('facebook')) {
								SocialIcon = socialIcons.facebook;
							} else if (link.toLowerCase().includes('twitter')) {
								SocialIcon = socialIcons.twitter;
							}
						}

						if (SocialIcon == null) {
							console.error('SocialMedia - unknown social item ', link);
							return <></>;
						}

						return (
							<a key={index} href={link} target={target} className={styles['social-media__icon']}>
								<SocialIcon width={iconProps.width} height={iconProps.height} viewBox={iconProps.viewBox} />
							</a>
						);
					})}
		</div>
	);
};

SocialMedia.propTypes = {
	socials: PropTypes.arrayOf(
		PropTypes.shape({
			link: PropTypes.string,
			target: PropTypes.string,
		})
	).isRequired,
	className: PropTypes.string,
};

export default SocialMedia;
