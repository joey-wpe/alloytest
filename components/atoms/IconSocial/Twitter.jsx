import React from 'react';
import IconSocial from './IconSocial';

const twitter = `<path class="cls-1" d="M6.3,6.1l6.1,8.1h1L7.3,6.1h-1ZM10,0C4.5,0,0,4.5,0,10s4.5,10,10,10,10-4.5,10-10S15.5,0,10,0ZM11.9,15.1h-.1l-2.6-3.5-3,3.5h-1.6l3.8-4.5-4-5.4h3.4l2.5,3.3,2.8-3.3h1.7l-3.7,4.3,4.2,5.6h-3.4Z" fill="#004C97" />`;

const TwitterSvg = (props) => {
	return (
		<IconSocial width="26" height="26" viewBox="0 0 26 26" {...props}>
			{twitter}
		</IconSocial>
	);
};

export { TwitterSvg };
