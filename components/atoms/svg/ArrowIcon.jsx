import React from 'react';
import Icon from './Icon';

// Arrow svg goes here
const ArrowIconPath = `<path fill-rule="evenodd" clip-rule="evenodd" d="M8 8L16 -9.53674e-07L11.4741 -8.98881e-08L7.99976 3.4743L4.52545 2.48945e-07L5.72802e-08 6.35904e-07L8 8Z" fill="#1B365D"/>`;
const ArrowIcon = (props) => {
	return (
		<Icon width="19" height="19" viewBox="0 0 24 24" {...props}>
			{props?.path ?? ArrowIconPath}
		</Icon>
	);
};

export { ArrowIcon }; //named export each svg module here
