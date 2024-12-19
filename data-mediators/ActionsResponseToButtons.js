import { transformToButtonStyle } from './ActionResponseToButtonStyle';
import { mediateUrlPath } from '../wplib/urlHelpers';

export function transformToButtonsObject(alignmentResponse, actionsResponse, forcedColor) {
	// sanity check inputs
	if (!alignmentResponse || !actionsResponse) {
		console.info(
			'INFO: transformToButtonsObject: alignmentResponse or actionsResponse was undefined - likely from having no actions'
		);
		return null;
	}

	// some buttons may not have a color, so a forcedColor is provided, and we use that for all actions
	if (forcedColor) {
		let manipulatedButtonData = actionsResponse?.map((item) => Object.assign({}, item, { color: forcedColor }));
		actionsResponse = manipulatedButtonData;
	}

	let buttonsArray = actionsResponse
		.filter((item) => {
			return item?.link; // exclude any items which dont have a link set
		})
		.map((action) => {
			return transformToButtonObject(action, null);
		});

	if (!buttonsArray) {
		buttonsArray = [];
	}

	let buttons = {
		alignment: alignmentResponse ?? 'center',
		buttons: buttonsArray,
	};

	return buttons;
}

export function transformToButtonObject(action, forcedButtonStyle) {
	if (!action?.link) {
		console.error('ERROR: transformToButtonObject: action.link was undefined, returning null');
		return null;
	}

	return {
		buttonStyle: forcedButtonStyle ?? transformToButtonStyle(action),
		buttonText: action.link.title,
		link: mediateUrlPath(action.link.url),
		target: action.link.target,
		adaText: action.adaText,
		seoText: action.seoText,
	};
}