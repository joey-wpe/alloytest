import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';
import { transformToButtonsObject, transformToButtonObject } from '../../../data-mediators/ActionsResponseToButtons';
import { IconColorSelectorFromBackground } from '../../../data-mediators/IconColorSelectorFromBackground';
export function gqlIconFlipCardResponseToIconFlipCard(gqlModuleData, hasPadding) {
	if (!gqlModuleData) {
		console.error('ERROR: gqlIconFlipCardResponseToIconFlipCard: gqlModuleData is undefined');
		return null;
	}
	const { backgroundType, backgroundColor } = transformToBackgroundStructure(gqlModuleData);
	var buttonObject = null;
	if (gqlModuleData.actions) {
		buttonObject = transformToButtonsObject(gqlModuleData.contentAlignment, gqlModuleData.actions);
	}

	let paddings = null;

	if (hasPadding) {
		paddings = {
			verticalPadding: gqlModuleData.paddingTop === 'extra_small' ? 'xsmall' : gqlModuleData.paddingTop,
			bottomPadding: gqlModuleData.paddingBottom === 'extra_small' ? 'xsmall' : gqlModuleData.paddingBottom,
		};
	}

	let flipCards = gqlModuleData.icons.map((icon) => {
		const { backgroundType, backgroundColor, backgroundImage } = transformToBackgroundStructure(icon);

		let parsedIcon = {
			icon: icon.iconWrapper.supportIcon,
			title: icon.titleText,
			description: icon.description,
			frontOverlay: backgroundType === 'solid' ? backgroundColor : icon.backgroundImage.colorOverlay,
			backOverlay: {
				type: 'solid',
				color: 'blue',
			},
			background: {
				type: backgroundType,
				color: backgroundColor,
				paddings,
			},
		};

		if (backgroundImage) {
			parsedIcon.background.desktopBackgroundImage = backgroundImage;
		}

		if (icon.actions && icon.actions.length === 1) {
			const firstAction = icon.actions[0];
			const button = transformToButtonObject(firstAction, 'TertiaryReverse');
			parsedIcon = {
				...parsedIcon,
				button,
			};
		}
		if (icon.backgroundType === 'image') {
			parsedIcon.iconColor = '#ffffff';
		} else {
			parsedIcon.iconColor = IconColorSelectorFromBackground(icon);
		}
		return parsedIcon;
	});

	let flipCardsData = {
		preHeader: gqlModuleData.preheadText,
		preheadType: gqlModuleData.preheadType,
		heading: gqlModuleData.titleText,
		titleType: gqlModuleData.titleType,
		content: gqlModuleData.description,
		columnsPerRow: gqlModuleData.columnFormat === 'three-columns' ? 3 : 2,
		alignment: gqlModuleData.contentAlignment,
		buttons: buttonObject,
		flipCards,
		background: {
			type: backgroundType,
			color: backgroundColor,
			paddings,
		},
	};

	return flipCardsData;
}
