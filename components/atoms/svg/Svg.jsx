import React from 'react';
import Icon from './Icon';

// Arrow svg goes here
const ArrowPath = `<path d="M4 11.0001V13.0001H16L10.5 18.5001L11.92 19.9201L19.84 12.0001L11.92 4.08008L10.5 5.50008L16 11.0001H4Z"/>`;
const ArrowSVG = (props) => {
	return (
		<Icon width="26" height="19" viewBox="0 0 24 24" {...props}>
			{props?.path ?? ArrowPath}
		</Icon>
	);
};

export { ArrowSVG }; //named export each svg module here
