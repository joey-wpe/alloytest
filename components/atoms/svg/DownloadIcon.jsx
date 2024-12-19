import React from 'react';
import Icon from './Icon';

// Arrow svg goes here
const DownloadIconPath = `<path d="M4.55859 16.3143H16.0967V14.6828H4.55859V16.3143ZM16.0967 7.34142H12.8001V2.44714H7.8552V7.34142H4.55859L10.3277 13.0514L16.0967 7.34142Z" fill="#FF6C0E"/>`;
const DownloadIconSVG = (props) => {
	return (
		<Icon width="19" height="19" viewBox="0 0 24 24" {...props}>
			{props?.path ?? DownloadIconPath}
		</Icon>
	);
};

export { DownloadIconSVG }; //named export each svg module here
