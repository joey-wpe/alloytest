import React from 'react';

const IconSocial = (props) => {
	let newProps = {
		width: props.width ? props.width : '20',
		height: props.height ? props.height : '20',
		fill: props.fill ? props.fill : 'white',
		style: props.style ? props.style : {},
		xmlns: 'http://www.w3.org/2000/svg',
		viewBox: props.viewBox ? props.viewBox : '0 0 1024 1024',
		dangerouslySetInnerHTML: { __html: props.children },
	};
	return React.createElement('svg', newProps);
};

export default IconSocial;
