import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';
import { transformToButtonsObject } from '../../../data-mediators/ActionsResponseToButtons';

// Takes GraphQL module specific response and turns it in the structure the module wants (see *.gqlresponse.json and *.sampledata.js for input and output examples)
export function gqlDisruptorResponseToDisruptor(gqlModuleData) {
	if (!gqlModuleData) {
		console.error('ERROR: gqlDisruptorResponseToDisruptor: gqlModuleData is undefined');
		return null;
	}

	// console.log('---------- Disruptor GraphQL response -------------');
	// console.log(gqlModuleData);
	// console.log('---------------------------------------------------');

	// uniform way of handling background info from a module
	const { backgroundType, backgroundColor, backgroundImage } = transformToBackgroundStructure(gqlModuleData);
	// The disruptor Actions collection does not include 'color', so we manually force that for all actions
	var buttonsObject = null;
	if (gqlModuleData.actions) {
		buttonsObject = transformToButtonsObject('right', gqlModuleData.actions, 'button--reverse');
	}

	let DisruptorData = {
		title: gqlModuleData.titleText,
		titleType: gqlModuleData.titleType,
		description: gqlModuleData.description,
		buttons: buttonsObject,
	};
	if (backgroundType === 'image') {
		DisruptorData.background = {
			type: backgroundType,
			desktopBackgroundImage: backgroundImage,
			color: backgroundColor,
			colorScheme: gqlModuleData?.backgroundImage?.colorScheme,
		};
	} else {
		DisruptorData.background = {
			type: backgroundType,
			color: backgroundColor,
		};
	}

	return DisruptorData;
}
