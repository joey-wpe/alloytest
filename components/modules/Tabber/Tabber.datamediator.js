import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';
import { transformToButtonsObject } from '../../../data-mediators/ActionsResponseToButtons';

export function gqlTabberResponseToTabber(gqlModuleData, hasPadding) {
	if (!gqlModuleData) {
		console.error('ERROR: gqlTabberResponseToTabber: gqlModuleData is undefined');
		return null;
	}
	let paddings = null;

	if (hasPadding) {
		paddings = {
			verticalPadding: gqlModuleData.paddingTop === 'extra_small' ? 'xsmall' : gqlModuleData.paddingTop,
			bottomPadding: gqlModuleData.paddingBottom === 'extra_small' ? 'xsmall' : gqlModuleData.paddingBottom,
		};
	}

	const { backgroundType, backgroundColor } = transformToBackgroundStructure(gqlModuleData);
	let contentTabber = gqlModuleData.tabs.map((tab) => {
		let parsedTab = {
			prehead: {
				text: tab.preheadText,
				Tag: tab.preheadType,
			},
			tabTitle: tab.tabTitle,
			title: {
				text: tab.titleText,
				Tag: tab.titleType,
			},
			description: {
				text: tab.description,
				Tag: 'p',
			},
			image: {
				src: tab.image?.mediaItemUrl,
				alt: tab.image?.altText,
			},
		};
		if (tab.actions && tab.actions.length > 0) {
			const buttonObject = transformToButtonsObject('left', tab.actions);

			parsedTab.action = buttonObject;
		}
		return parsedTab;
	});

	let tabberData = {
		contentTabber,
		background: {
			type: backgroundType,
			color: backgroundColor,
			paddings,
		},
	};

	return tabberData;
}
