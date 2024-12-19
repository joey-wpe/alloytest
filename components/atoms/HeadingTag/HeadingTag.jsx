import React from 'react';
import styles from './HeadingTag.module.scss';
import PropTypes from 'prop-types';

const HeadingTag = ({ Tag, className, text }) => {
	// Changing default to div since default will be not recongnize as an html element
	if (Tag === 'default') {
		Tag = 'div';
	}
	return <Tag className={className ?? ''} dangerouslySetInnerHTML={{ __html: text }} />;
};

HeadingTag.propTypes = {
	Tag: PropTypes.string,
	className: PropTypes.string,
	text: PropTypes.string,
};

export default HeadingTag;
