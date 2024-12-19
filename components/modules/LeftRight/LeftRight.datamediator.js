import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';
import { transformToButtonsObject } from '../../../data-mediators/ActionsResponseToButtons';
import { parseFormFields } from '../../../data-mediators/formFieldParser';
export function gqlLeftRightResponseToLeftRight(t, gqlModuleData, hasPadding) {
	if (!gqlModuleData) {
		console.error('ERROR: gqlLeftRightResponseToLeftRight: gqlModuleData is undefined');
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
	var buttonObject = null;
	if (gqlModuleData.actions) {
		buttonObject = transformToButtonsObject(gqlModuleData.contentSide, gqlModuleData.actions, 'button--default');
	}
	let leftRightData = {
		orientation: gqlModuleData.contentSide,
		prehead: {
			text: gqlModuleData.preheadText,
			Tag: gqlModuleData.preheadType,
		},
		title: {
			text: gqlModuleData.titleText,
			Tag: gqlModuleData.titleType,
		},
		description: [
			{
				text: gqlModuleData.description,
				Tag: 'p',
			},
		],
		background: {
			type: backgroundType,
			color: backgroundColor,
			paddings,
		},
	};

	if (buttonObject && buttonObject.buttons && buttonObject.buttons.length > 0) {
		leftRightData.buttons = {
			buttons: buttonObject.buttons,
		};
	}

	if (gqlModuleData.mediaMediaType === 'image') {
		leftRightData.mediaContent = {
			chevronAngle: gqlModuleData.chevronAngle === undefined ? true : gqlModuleData.chevronAngle,
			image: {
				src: gqlModuleData.mediaImage?.mediaItemUrl,
				alt: gqlModuleData.mediaImage?.altText,
			},
		};
	}
	if (gqlModuleData.mediaMediaType === 'form') {
		const formData = parseFormFields(t, gqlModuleData.mediaFormGroup);
		leftRightData.mediaContent = {
			chevronAngle: gqlModuleData.chevronAngle === undefined ? true : gqlModuleData.chevronAngle,
			form: formData,
		};
	}
	if (gqlModuleData.mediaMediaType === 'embed') {
		leftRightData.mediaContent = {
			chevronAngle: gqlModuleData.chevronAngle === undefined ? true : gqlModuleData.chevronAngle,
			video: {
				url: gqlModuleData?.mediaVideoEmbed,
				thumbnail: gqlModuleData.mediaVideoOverlayImage?.mediaItemUrl,
			},
		};
	}
	return leftRightData;
}
