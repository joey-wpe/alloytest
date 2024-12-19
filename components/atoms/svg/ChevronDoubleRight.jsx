import React from 'react';
import Icon from './Icon';

// Arrow svg goes here
const iconPath = `<path id="Vector" d="M2.79492 3.705L3.49992 3L6.49992 6L3.49992 9L2.79492 8.295L5.08492 6L2.79492 3.705ZM5.79492 3.705L6.49992 3L9.49992 6L6.49992 9L5.79492 8.295L8.08492 6L5.79492 3.705Z" fill="#004C97"/>`;
const ChevronDoubleRightSVG = (props) => {
	return (
		<Icon width="12" height="12" viewBox="0 0 12 12" {...props}>
			{iconPath}
		</Icon>
	);
};

export { ChevronDoubleRightSVG }; // named export each svg module here
