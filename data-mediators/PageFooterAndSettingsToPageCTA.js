import { transformToBackgroundStructure } from './BackgroundResponseToBackground';
import { transformToButtonsObject } from './ActionsResponseToButtons';
import { mediateUrlPath } from '../wplib/urlHelpers';

// TODO:: pass in paddings from appearance settings
export function globalSettingsAndPageFooterToPageCTAData(globalSettings, pageFooter) {
	// console.log('globalSettingsAndPageFooterToPageCTAData() - globalSettings', globalSettings);
	// console.log('globalSettingsAndPageFooterToPageCTAData() - pageFooter', pageFooter);

	// if there is no pageheader data, or the page wants to use global settings
	if (!pageFooter || pageFooter?.callToActionSettings === 'global') {
		return ctaFromGlobalSettings(globalSettings);
	}

	// otherwise we're using page level alerts instead
	return ctaFromPageSettings(pageFooter);
}

function ctaFromGlobalSettings(globalSettings) {
	if (globalSettings.settingsFooter.globalFooterCtaDisplay !== true) return null;

	const ctaGroup = globalSettings.settingsFooter.callToActionGroup;
	return parsePageCTAValuesFromCallToActionGroup(ctaGroup);
}

function ctaFromPageSettings(pageFooter) {
	if (pageFooter.callToActionSettings !== 'on') return null;

	const ctaGroup = pageFooter.callToActionGroup;
	return parsePageCTAValuesFromCallToActionGroup(ctaGroup);
}

function parsePageCTAValuesFromCallToActionGroup(ctaGroup) {
	// if both of these are null then we have no footer to show
	if (!ctaGroup || !ctaGroup.titleText) return null;

	let ctaData = {
		title: ctaGroup.titleText,
		description: ctaGroup.description,
	};

	var buttonsTopLevel = null;
	if (ctaGroup.actions) {
		buttonsTopLevel = transformToButtonsObject('center', ctaGroup.actions, 'button--default');
	}
	if (buttonsTopLevel?.buttons) {
		ctaData.buttons = buttonsTopLevel.buttons;
	}

	if (ctaGroup.backgroundType === 'image') {
		ctaData.background = {
			type: 'image',
			desktopBackgroundImage: ctaGroup.backgroundImage?.image?.mediaItemUrl,
			mobileBackgroundImage: ctaGroup.backgroundImage?.mobileImage?.mediaItemUrl,
			color: 'blaze', // TODO:: for now we default to light color text on images
		};
	} else {
		const { backgroundType, backgroundColor } = transformToBackgroundStructure(ctaGroup);
		ctaData.background = {
			type: backgroundType,
			color: backgroundColor,
		};
	}

	ctaData = SwapToCtaFlagStyleIfNeeded(ctaData);
	// console.log('ctaData parsePageCTAValuesFromCallToActionGroup', ctaData);

	// append padding values
	ctaData.paddingTop = ctaGroup.paddingTop;
	ctaData.paddingBottom = ctaGroup.paddingBottom;

	if (ctaData.paddingTop === 'default') {
		ctaData.paddingTop = 'none';
	}
	if (ctaData.paddingBottom === 'default') {
		// NOTE:: we default this to xsmall so that the CTA doesn't butt into the footer top dropdshadow
		ctaData.paddingBottom = 'xsmall';
	}
	return ctaData;
}

// using flag style or not is based on if there is 1 button or many
function SwapToCtaFlagStyleIfNeeded(ctaData) {
	if (ctaData.buttons && ctaData.buttons.length === 1) {
		ctaData.ctaFlagOrButtons = 'CtaFlags';
		ctaData.flagStyle = 'secondary';
		ctaData.flagCtaUrl = mediateUrlPath(ctaData.buttons[0].link);
		ctaData.flagCtaTitle = ctaData.buttons[0].buttonText;
		ctaData.buttons = null;
	}
	return ctaData;
}
