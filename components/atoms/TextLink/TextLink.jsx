import PropTypes from 'prop-types';
import React from 'react';
import styles from './TextLink.module.scss';
import { removeLastTrailingSlash } from '../../../wplib/util';

const TextLink = ({ linkText, target, uri, className }) => {
	if (!uri) {
		console.error(`TextLink: uri was not valid! Defaulting to '/' and setting className to 'bad-link-url'.`);
		uri = '/';
		className = 'bad-link-url';
	}

	// Remove trailing slashes from the link
	uri = removeLastTrailingSlash(uri)
	return (
		<a
			className={`${styles['text-link']} ${styles[`hover-animation-basic`]} ${className ?? ''}`}
			target={target}
			href={uri}
		>
			{linkText}
		</a>
	);
};

TextLink.propTypes = {
	label: PropTypes.string,
	target: PropTypes.oneOf(['_blank', '']),
	url: PropTypes.string,
};

export default TextLink;
