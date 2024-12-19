import React from 'react';
import Icon from './Icon';

// Arrow svg goes here
const closePath = (fill = '#004C97') => `
	<path d="M-1.59833e-06 19.6842L17.3684 2.31579L22 2.31578L4.63158 19.6842L-1.59833e-06 19.6842Z" fill="${fill}"/>
	<path d="M22 19.6842L4.63158 2.31579L3.61901e-06 2.31578L17.3684 19.6842L22 19.6842Z" fill="${fill}" />
`;
const CloseSVG = (props) => {
	return (
		<Icon width="22" height="22" viewBox="0 0 22 22" {...props}>
			{closePath(props.fill)}
		</Icon>
	);
};

export { CloseSVG }; //named export each svg module here
