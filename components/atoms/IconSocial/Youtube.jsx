import React from 'react';
import IconSocial from './IconSocial';

const youtube = `<path class="cls-1" d="M8.8,8.2l3.2,1.7-3.2,1.7v-3.4ZM20,10c0,5.5-4.5,10-10,10S0,15.5,0,10,4.5,0,10,0s10,4.5,10,10ZM16.1,10s0-1.9-.3-2.8c-.1-.5-.6-.9-1.1-1-.9-.2-4.7-.2-4.7-.2,0,0-3.8,0-4.7.2-.5,0-.9.5-1.1,1-.3.9-.3,2.8-.3,2.8,0,0,0,1.9.3,2.8.1.5.6.9,1.1,1,.9.2,4.7.2,4.7.2,0,0,3.8,0,4.7-.2.5,0,.9-.5,1.1-1,.3-.9.3-2.8.3-2.8Z" fill="#004C97" />`;

const YoutubeSvg = (props) => {
	return (
		<IconSocial width="26" height="26" viewBox="0 0 26 26" {...props}>
			{youtube}
		</IconSocial>
	);
};

export { YoutubeSvg };
