import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';
import { transformToButtonsObject } from '../../../data-mediators/ActionsResponseToButtons';

// Takes GraphQL module specific response and turns it in the structure the module wants (see *.gqlresponse.json and *.sampledata.js for input and output examples)
export function gqlPlainTextResponseToPlainText(gqlModuleData, hasPadding) {
	if (!gqlModuleData) {
		console.error('ERROR: gqlPlainTextResponseToPlainText: gqlModuleData is undefined');
		return null;
	}

	let paddings = null;

	if (hasPadding) {
		paddings = {
			verticalPadding: gqlModuleData.paddingTop === 'extra_small' ? 'xsmall' : gqlModuleData.paddingTop,
			bottomPadding: gqlModuleData.paddingBottom === 'extra_small' ? 'xsmall' : gqlModuleData.paddingBottom,
		};
	}

	// console.log('---------- PlainText GraphQL response -------------');
	// console.log(gqlModuleData);
	// console.log('---------------------------------------------------');

	// uniform way of handling background info from a module
	const { backgroundType, backgroundColor } = transformToBackgroundStructure(gqlModuleData);
	var buttonsObject = null;
	if (gqlModuleData.actions) {
		buttonsObject = transformToButtonsObject(gqlModuleData.contentAlignment, gqlModuleData.actions);
	}

	let plainTextData = {
		preHeader: gqlModuleData.preheadText,
		preHeadType: gqlModuleData.preHeadType,
		heading: gqlModuleData.titleText,
		headingType: gqlModuleData.titleType,
		content: gqlModuleData.description,
		background: {
			type: backgroundType,
			color: backgroundColor,
			paddings,
		},
		buttons: buttonsObject,

		alignment: gqlModuleData.contentAlignment,
	};

	return {
		...plainTextData,
	};
}
