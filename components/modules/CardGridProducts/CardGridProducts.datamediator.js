import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';
import { transformToButtonsObject } from '../../../data-mediators/ActionsResponseToButtons';

export function gqlCardGridProductsResponseToCardGridProducts(gqlModuleData, hasPadding) {
	if (!gqlModuleData) {
		console.error('ERROR: gqlCardGridProductsResponseToCardGridProducts: gqlModuleData is undefined');
		return null;
	}
	const { backgroundType, backgroundColor } = transformToBackgroundStructure(gqlModuleData);

	let paddings = null;

	if (hasPadding) {
		paddings = {
			verticalPadding: gqlModuleData.paddingTop === 'extra_small' ? 'xsmall' : gqlModuleData.paddingTop,
			bottomPadding: gqlModuleData.paddingBottom === 'extra_small' ? 'xsmall' : gqlModuleData.paddingBottom,
		};
	}

	const stories =
		gqlModuleData.cards?.map((card) => {
			let parsedCard = {
				image: {
					src: card.image?.mediaItemUrl,
					alt: card.image?.altText,
				},
				title: card.titleText,
				description: card.description,
			};
			if (card.actions) {
				const buttonObject = transformToButtonsObject(gqlModuleData.contentAlignment, card.actions, 'button--default');
				parsedCard.buttons = buttonObject.buttons;
			}
			return parsedCard;
		}) ?? [];
	let cardGridData = {
		commonHeaderDetails: {
			prehead: gqlModuleData.preheadText,
			preheadType: gqlModuleData.preheadType,
			title: gqlModuleData.titleText,
			titleType: gqlModuleData.titleType,
			description: gqlModuleData.description,
			contentAlignment: gqlModuleData.contentAlignment
		},
		stories,
		background: {
			type: backgroundType,
			color: backgroundColor,
			paddings,
		},
		type: gqlModuleData.columnFormat,
	};
	return cardGridData;
}
