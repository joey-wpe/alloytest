import React from 'react';
import IconSocial from './IconSocial';

const linkedin = `<path class="cls-1" d="M10,0C4.5,0,0,4.5,0,10s4.5,10,10,10,10-4.5,10-10S15.5,0,10,0ZM7.5,14.9h-2.1v-6.6h2.1v6.6ZM6.5,7.5c-.7,0-1.2-.5-1.2-1.2s.5-1.2,1.2-1.2,1.2.5,1.2,1.2-.5,1.2-1.2,1.2ZM15.4,14.9h-2.1v-3.8c0,0,0-1.1-1.2-1.1s-.7.2-.9.5c-.2.4-.2.9-.2,1.3v3.1h-2.1v-6.6h2v.8c.2-.3.8-.9,2-.9h.4c1.4.1,2.1.9,2.1,2.4v4.3Z" fill="#004C97" />`;

const LinkedinSvg = (props) => {
	return (
		<IconSocial width="26" height="26" viewBox="0 0 24 24" {...props}>
			{linkedin}
		</IconSocial>
	);
};

export { LinkedinSvg };
