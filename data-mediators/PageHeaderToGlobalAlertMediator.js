import { mediateUrlPath } from '../wplib/urlHelpers';

export function pageHeaderToGlobalAlert(globalSettings, pageHeader) {
	// console.log('pageHeaderToGlobalAlert() - globalSettings', globalSettings);
	// console.log('pageHeaderToGlobalAlert() - pageHeader', pageHeader);

	// if there is no pageheader data, or the page wants to use global settings
	if (!pageHeader || pageHeader?.alertSettings === 'global') {
		return globalAlertFromGlobalSettings(globalSettings);
	}
	// if there is page header and we're using page level alerts instead
	else if (pageHeader && pageHeader?.alertSettings === 'on') {
		return globalAlertFromPageSettings(pageHeader);
	}

	//otherwise return null
	return null;
}

function globalAlertFromGlobalSettings(globalSettings) {
	// if global settings are not turned on, then return null
	if (!globalSettings?.settingsAlerts?.globalAlertDisplay) {
		// console.log('globalAlertFromGlobalSettings() - no global settings enabled, returning null');
		return null;
	}

	let globalAlertData = {
		description: globalSettings?.settingsAlerts?.alertGroup?.globalAlertContentMessage,
		background: {
			type: 'gradient',
			color:
				globalSettings?.settingsAlerts?.alertGroup?.globalAlertContentAlertType === 'company_announcements'
					? 'warp'
					: 'accelerate',
		},
	};

	if (globalSettings?.settingsAlerts?.alertGroup?.globalAlertContentActions.length > 0) {
		globalAlertData.buttons = {
			alignment: 'center',
			buttons: [
				{
					buttonStyle: 'TertiaryReverse',
					buttonText: globalSettings?.settingsAlerts?.alertGroup?.globalAlertContentActions[0].link.title,
					link: mediateUrlPath(globalSettings?.settingsAlerts?.alertGroup?.globalAlertContentActions[0].link.url),
					target: globalSettings?.settingsAlerts?.alertGroup?.globalAlertContentActions[0].link.target,
				},
			],
		};
	}

	// console.log('globalAlertFromGlobalSettings() - using global alert', globalAlertData);
	return globalAlertData;
}

// NOTE:: `alertgroup` has no capital `g` like in the global settings
function globalAlertFromPageSettings(pageHeader) {
	// if the description is null or invalid, then there's no global header to show
	if (!pageHeader?.alertgroup?.alertContentMessage) {
		console.log('globalAlertFromPageSettings() - no alert message in page settings, returning null');
		return null;
	}

	let globalAlertData = {
		description: pageHeader?.alertgroup?.alertContentMessage,
		background: {
			type: 'gradient',
			color: pageHeader?.alertgroup?.alertContentAlertType === 'company_announcements' ? 'warp' : 'accelerate',
		},
	};

	if (pageHeader?.alertgroup?.alertContentActions?.length > 0) {
		globalAlertData.buttons = {
			alignment: 'center',
			buttons: [
				{
					buttonStyle: 'TertiaryReverse',
					buttonText: pageHeader?.alertgroup?.alertContentActions[0].link.title,
					link: mediateUrlPath(pageHeader?.alertgroup?.alertContentActions[0].link.url),
					target: pageHeader?.alertgroup?.alertContentActions[0].link.target,
				},
			],
		};
	}

	// console.log('pageHeaderToGlobalAlert() - using page level alert', globalAlertData);
	return globalAlertData;
}
