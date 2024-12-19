import React from 'react';
import IconSocial from './IconSocial';

const facebook = `
	<circle cx="32" cy="32" r="32" fill="#1B365D"/>
	<path
		d="M34.3955 35.0981V50.0706H27.5355V35.0981H21.8364V29.0271H27.5355V26.8182C27.5355 18.6177 30.9523 14.3059 38.1817 14.3059C40.3981 14.3059 40.9521 14.663 42.1658 14.954V20.9589C40.807 20.7208 40.4244 20.5885 39.0129 20.5885C37.3374 20.5885 36.4404 21.0647 35.6224 22.0038C34.8045 22.9428 34.3955 24.5697 34.3955 26.8976V29.0403H42.1658L40.0814 35.1113H34.3955V35.0981Z"
		fill="white"
	/>
`;

export const FacebookBlazeSvg = (props) => {
	return (
		<IconSocial width="64" height="64" viewBox="0 0 64 64" fill="none" {...props}>
			{facebook}
		</IconSocial>
	);
};

export default FacebookBlazeSvg;
