import React from 'react';
import IconSocial from './IconSocial';

const twitter = `
	<circle cx="32.9824" cy="32" r="32" fill="#1B365D"/>
	<path d="M36.4577 30.5237L48.2047 16.7187H42.8104L33.9223 27.1605L26.0534 16.7187H15.313L28.2258 33.853L16.0657 48.1372L16.3035 48.341H21.292L30.7594 37.2162L39.1432 48.341H49.8837L36.4577 30.5255V30.5237ZM21.1436 19.508H24.4263L43.9619 45.4302H40.6791L21.1436 19.508Z" fill="white"/>
`;

const TwitterBlazeSvg = (props) => {
	return (
		<IconSocial width="65" height="64" viewBox="0 0 65 64" fill="none" {...props}>
			{twitter}
		</IconSocial>
	);
};

export default TwitterBlazeSvg;
