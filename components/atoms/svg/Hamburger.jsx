import React from 'react';
import Icon from './Icon';

// Arrow svg goes here
const hamburgerPath = `<path d="M8 0H25V3H6L8 0Z" fill="#1B365D" />
<path d="M5 6H25V9H3L5 6Z" fill="#1B365D" />
<path d="M2 12H25V15H0L2 12Z" fill="#1B365D" />`;
const HamburgerSVG = (props) => {
	return (
		<Icon width="25" height="15" viewBox="0 0 25 15">
			{hamburgerPath}
		</Icon>
	);
};

export { HamburgerSVG }; //named export each svg module here
