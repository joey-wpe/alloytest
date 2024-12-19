import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';
import { transformToButtonsObject } from '../../../data-mediators/ActionsResponseToButtons';

export function gqlProductTabberResponseToProductTabber(gqlModuleData, hasPadding) {
	if (!gqlModuleData) {
		console.error('ERROR: gqlProductTabberResponseToProductTabber: gqlModuleData is undefined');
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
	let copyItems = gqlModuleData?.secondaryContentColumns?.map((column) => {
		return {
			item: {
				title: column.title,
				description: column.description,
			},
		};
	});
	let product = gqlModuleData.tabs.map((tab) => {
		let parsedTab = {
			preheadLogo: {
				src: tab.productLogo?.mediaItemUrl,
				alt: tab.productLogo?.altText,
			},
			tabTitle: tab.tabTitle,
			title: {
				text: tab.titleText,
				Tag: tab.titleType,
			},
			subTitle: tab.teaser,
			description: {
				text: tab.description,
				Tag: 'p',
			},
			image: {
				src: tab.image?.mediaItemUrl,
				alt: tab.image?.altText,
			},
			orientation: 'vertical',
		};
		if (tab.actions && tab.actions.length > 0) {
			const buttonObject = transformToButtonsObject('left', tab.actions);
			parsedTab.action = buttonObject;
		}
		return parsedTab;
	});
	let productTabber = {
		copyTop: {
			prehead: gqlModuleData.preheadText,
			preheadType: gqlModuleData.preheadType,
			title: gqlModuleData.titleText,
			titleType: gqlModuleData.titleType,
			description: gqlModuleData.description,
		},
		copyItems,
		product,
		background: {
			type: backgroundType,
			color: backgroundColor,
			paddings,
		},
	};

	return productTabber;
}
