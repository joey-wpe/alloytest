import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';
import { parseFormFields } from '../../../data-mediators/formFieldParser';

export function gqlFormResponseToForm(t, gqlModuleData, hasPadding) {
	if (!gqlModuleData) {
		console.error('ERROR: gqlFormResponseToForm: gqlModuleData is undefined');
		return null;
	}

	let paddings = null;

	if (hasPadding) {
		paddings = {
			verticalPadding: gqlModuleData.paddingTop === 'extra_small' ? 'xsmall' : gqlModuleData.paddingTop,
			bottomPadding: gqlModuleData.paddingBottom === 'extra_small' ? 'xsmall' : gqlModuleData.paddingBottom,
		};
	}

	let formData = {};

	const { backgroundType, backgroundColor } = gqlModuleData.backgroundType ? transformToBackgroundStructure(gqlModuleData) : {};
	const formOptions = parseFormFields(t, gqlModuleData);
	formData = {
		preHeader: gqlModuleData.preheadText,
		preHeadType: gqlModuleData.preheadType,
		heading: gqlModuleData.titleText,
		headingType: gqlModuleData.titleType,
		background: {
			type: backgroundType,
			color: backgroundColor,
			paddings,
		},
		formOptions: formOptions,
	};

	return formData;
}
