import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import styles from './IntercomWidget.module.scss';
import { IntercomSVG } from '../../atoms/svg/Intercom';
import GlobalConstants from '../../../GlobalConstants';

const IntercomWidget = () => {
	const [intercomActive, setIntercomActive] = useState(false);
	const [intercomShow, setIntercomShow] = useState(false);
	const [cookieMatch, setCookieMatch] = useState(false);
	const [intercomURL, setIntercomURL] = useState(false);
	const [intercomExcludeURLs, setIntercomExcludeURLs] = useState(false);
	const path = useRouter().asPath;

	// Intercom Widget default URLs for testing. This is the value used if the value is not set coming from GTM.
	let urls = GlobalConstants.intercomURLs;
	let excludeUrls = [];

	// function to set URLs where Intercom Widget is triggered
	const setIntercomTriggerURLs = (urls) => {
		// regex to find exact page URL match within browser set cookie values
		const cookieName = 'intercom-id';
		const match = document.cookie.indexOf(cookieName);
		
		setCookieMatch(match > -1 ? true : false);

		if(match > -1) {
			setIntercomActive(true);
			setIntercomShow(false);
			
			return;
		} else {
			if(window.intercomExcludeURLs !== undefined) {
				// URLs set from GTM will be used over URL defaults from Globalconstants
				setIntercomExcludeURLs(true);
				excludeUrls = window.intercomExcludeURLs;
			}

			if(window.intercomURLs !== undefined) {
				// URLs set from GTM will be used over URL defaults from Globalconstants
				urls = window.intercomURLs;
			}
		}

		const intercomUpdate = (urlsArr, status) => {
			urlsArr.forEach((url) => {
				if((url === path && url.length === 1) || (path.indexOf(url) > -1 && url.length > 1) || (url === '/*')) {
					setIntercomShow(status);
					setIntercomURL(status);
				}
			});
		}

		intercomUpdate(urls, true);
		intercomUpdate(excludeUrls, false);
	};

	useEffect(() => {
		setIntercomTriggerURLs(urls);
	}, []);

	return (
		<>
			{/* Widget will not load Intercom script and shows the icon only until initial click then cookies are set */}
			{intercomShow &&
				<div className={`intercom-btn ${styles['intercom']} ${styles['intercom-icon']} ${intercomActive ? styles['intercom-icon-hide'] : ''}`}
					onClick={() => {
						setIntercomActive(true);
					}}
				>	
					<div className={`${styles['intercom-container']}`} >
						<div className={`${styles['intercom-svg-wrapper']}`} >
							<IntercomSVG className={styles['intercom-svg']} />
						</div>
					</div>
				</div>
			}

			{intercomActive &&
				<Script src="/static/load-intercom.js" onLoad={() => {
					if(cookieMatch) {
						Intercom('update', {
							'hide_default_launcher': false
						});
					}

					Intercom('onHide', function() {
						Intercom('update', {
						'hide_default_launcher': false
						});
					});
				}} />
			}

		</>
	);
};

export default IntercomWidget;
  