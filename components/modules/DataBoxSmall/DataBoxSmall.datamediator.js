import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';
import { transformToButtonsObject } from '../../../data-mediators/ActionsResponseToButtons';

export function gqlDataBoxSmallResponseToDataBoxSmall(gqlModuleData, hasPadding) {
	if (!gqlModuleData) {
		console.error('ERROR: gqlDataBoxSmallResponseToDataBoxSmall: gqlModuleData is undefined');
		return null;
	}

	const { backgroundType, backgroundColor } = transformToBackgroundStructure(gqlModuleData);

	let boxes = gqlModuleData.boxes.map((box) => {
		return {
			number: box.dataStatNumber,
			description: box.statDescription,
		};
	});

	let paddings = null;

	if (hasPadding) {
		paddings = {
			verticalPadding: gqlModuleData.paddingTop === 'extra_small' ? 'xsmall' : gqlModuleData.paddingTop,
			bottomPadding: gqlModuleData.paddingBottom === 'extra_small' ? 'xsmall' : gqlModuleData.paddingBottom,
		};
	}

	// parse out the buttons data (if actions exist)
	var buttonsObject = null;
	if (gqlModuleData.actions) {
		if (gqlModuleData.actions.length > 2) {
			console.warn(`DataBoxSmall.datamediator - DataBoxSmall had more than 2 actions - clipping to 2!`);
		}
		buttonsObject = transformToButtonsObject('left', gqlModuleData.actions.slice(0, 2));
	}

	let dataBoxSmallData = {
		prehead: gqlModuleData.preheadText,
		preheadType: gqlModuleData.preheadType,
		title: gqlModuleData.titleText,
		titleType: gqlModuleData.titleType,
		description: gqlModuleData.description,
		boxes,
		buttons: buttonsObject,
		background: {
			type: backgroundType,
			color: backgroundColor,
			paddings,
		},
	};

	return dataBoxSmallData;
}
