import React, { useState, useEffect } from 'react';

import styles from './ShareButtons.module.scss';
import { FacebookSvg } from '../../atoms/IconSocial/FacebookSvg';
import { LinkedinSvg } from '../../atoms/IconSocial/LinkedinSvg';
import { TwitterSvg } from '../../atoms/IconSocial/Twitter';
import PropTypes from 'prop-types';
import { TwitterButton, LinkedInButton } from 'react-social';

const ShareButtons = ({ className }) => {
	const [url, setUrl] = useState();

	useEffect(() => {
		setUrl(window.location);
	}, []);

	return (
		<div className={`${styles['share-buttons']} ${className ?? ''}`}>
			<div className={styles['share-buttons__icon']}>
				<a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} rel="noreferrer">
					<FacebookSvg width={20} height={20} viewBox={'0 0 20 20'} sharer={true} />
				</a>
			</div>
			<TwitterButton className={styles['share-buttons__icon']}>
				<a>
					<TwitterSvg width={20} height={20} viewBox={'0 0 20 20'} />
				</a>
			</TwitterButton>
			<LinkedInButton className={styles['share-buttons__icon']}>
				<a>
					<LinkedinSvg width={20} height={20} viewBox={'0 0 20 20'} />
				</a>
			</LinkedInButton>
		</div>
	);
};

ShareButtons.propTypes = {
	className: PropTypes.string,
};

export default ShareButtons;
