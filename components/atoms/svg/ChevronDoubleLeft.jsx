import React from 'react';
import Icon from './Icon';

// Arrow svg goes here
const iconPath = `<path id="Vector" d="M9.20508 3.705L8.50008 3L5.50008 6L8.50008 9L9.20508 8.295L6.91508 6L9.20508 3.705ZM6.20508 3.705L5.50008 3L2.50008 6L5.50008 9L6.20508 8.295L3.91508 6L6.20508 3.705Z" fill="#004C97"/>`;
const ChevronDoubleLeftSVG = (props) => {
	return (
		<Icon width="12" height="12" viewBox="0 0 12 12" {...props}>
			{iconPath}
		</Icon>
	);
};

export { ChevronDoubleLeftSVG }; // named export each svg module here
