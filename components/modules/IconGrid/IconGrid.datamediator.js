import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';
import { transformToButtonsObject, transformToButtonObject } from '../../../data-mediators/ActionsResponseToButtons';
import { IconColorSelectorFromBackground } from '../../../data-mediators/IconColorSelectorFromBackground';
export function gqlIconGridResponseToIconGrid(gqlModuleData, hasPadding) {
	if (!gqlModuleData) {
		console.error('ERROR: gqlIconGridResponseToIconGrid: gqlModuleData is undefined');
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

	const fillColor = IconColorSelectorFromBackground(gqlModuleData);
	var buttonsObject = null;
	if (gqlModuleData?.actions) {
		buttonsObject = transformToButtonsObject(gqlModuleData.contentAlignment, gqlModuleData.actions, 'button--default');
	}
	let iconEntries = gqlModuleData.icons.map((icon) => {
		let parsedIcon = {
			icon: {
				path: icon.iconWrapper.supportIcon,
			},
			title: icon.titleText,
			description: icon.description,
		};
		// if there is 1 and only 1 action passed in, then manually parse it out
		if (icon.actions && icon.actions.length === 1) {
			const firstAction = icon.actions[0];
			const button = transformToButtonObject(firstAction, 'TertiaryDefault');
			parsedIcon = {
				...parsedIcon,
				...button,
			};
		}
		return parsedIcon;
	});
	let iconGridData = {
		contentAlignment: gqlModuleData.contentAlignment,
		columnFormat: gqlModuleData.columnFormat,
		content: {
			prehead: gqlModuleData.preheadText,
			preheadType: gqlModuleData.preheadType,
			title: gqlModuleData.titleText,
			titleType: gqlModuleData.titleType,
			description: gqlModuleData.description,
		},

		buttons: buttonsObject,
		iconEntries,
		iconColor: fillColor,
		background: {
			type: backgroundType,
			color: backgroundColor,
			paddings,
		},
	};

	return iconGridData;
}
