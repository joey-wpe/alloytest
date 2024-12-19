import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';
import { transformToButtonsObject, transformToButtonObject } from '../../../data-mediators/ActionsResponseToButtons';

export function gqlDataBoxLargeResponseToDataBoxLarge(gqlModuleData, hasPadding) {
	if (!gqlModuleData) {
		console.error('ERROR: gqlDataBoxLargeResponseToDataBoxLarge: gqlModuleData is undefined');
		return null;
	}
	const { backgroundType, backgroundColor } = transformToBackgroundStructure(gqlModuleData);
	var buttonsObject = null;
	if (gqlModuleData.actions) {
		buttonsObject = transformToButtonsObject(gqlModuleData.contentAlignment, gqlModuleData.actions);
	}

	let paddings = null;

	if (hasPadding) {
		paddings = {
			verticalPadding: gqlModuleData.paddingTop === 'extra_small' ? 'xsmall' : gqlModuleData.paddingTop,
			bottomPadding: gqlModuleData.paddingBottom === 'extra_small' ? 'xsmall' : gqlModuleData.paddingBottom,
		};
	}

	let boxes = gqlModuleData.boxes.map((box) => {
		const parsedBox = {
			number: box.statNumber,
			statTrailingCharacter: box.statTrailingCharacter,
			title: box.statSubTitle,
			prehead: box.statMainTitle,
			description: box.statDescription,
			buttonData: box.buttonData,
		};

		// if there is 1 and only 1 action passed in, then manually parse it out
		if (box.actions && box.actions.length === 1) {
			const firstAction = box.actions[0];
			parsedBox.buttonData = transformToButtonObject(firstAction, 'TertiaryDefault');
		}

		return parsedBox;
	});

	let dataBoxLargeData = {
		alignment: gqlModuleData.contentAlignment,
		commonHeaderDetails: {
			prehead: gqlModuleData.preheadText,
			title: gqlModuleData.titleText,
			description: gqlModuleData.description,
		},
		background: {
			type: backgroundType,
			color: backgroundColor,
			paddings,
		},
		buttons: buttonsObject,
		description: gqlModuleData.description,
		boxes,
	};

	return dataBoxLargeData;
}
