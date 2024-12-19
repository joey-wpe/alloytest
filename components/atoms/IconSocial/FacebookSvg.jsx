import React from 'react';
import IconSocial from './IconSocial';

const facebook = `<path class="cls-1" d="M10,0C4.5,0,0,4.5,0,10s4.5,10,10,10,10-4.5,10-10S15.5,0,10,0ZM13.1,4.7v1.9c-.4,0-.5-.1-1-.1s-.8.1-1.1.4-.4.8-.4,1.5v.7h2.4l-.7,1.9h-1.6v4.7h-2.1v-4.7h-1.8v-1.9h1.8v-.7c0-2.6,1.1-3.9,3.3-3.9s.9.1,1.2.2Z" fill="#004C97" />`;

const FacebookSvg = (props) => {
	return (
		<IconSocial width="26" height="26" viewBox="0 0 24 24" {...props}>
			{facebook}
		</IconSocial>
	);
};

export { FacebookSvg };
