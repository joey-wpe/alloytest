import GlobalConstants from '../GlobalConstants';
import CachedGlobalSettingsResponse from './cached-responses/GlobalSettingsResponse';
//import MenusData from '../public/menusData.json';
import { importPublicJsonFileDynamically } from './util';

export async function getGlobalSettings(isPreview = false, locale = 'en-US') {
	const DEFAULT_LOCALE = 'en-US';
	const GLOBAL_SETTINGS_FILE = 'globalSettings';

	let globalSettings = {};

	try {
		if (isPreview && GlobalConstants.Options.UseCachedGlobalSettingsForPreviews) {
			globalSettings = CachedGlobalSettingsResponse?.themeGeneralSettings || {};
		} else {
			const fileName = locale === DEFAULT_LOCALE ? GLOBAL_SETTINGS_FILE : `${GLOBAL_SETTINGS_FILE}-${locale}`;
			globalSettings = await importPublicJsonFileDynamically(fileName);
		}
	} catch (error) {
		console.error('Error fetching global settings:', { error, locale, isPreview, forceUseCache });
		throw new Error(`Failed to load global settings for locale ${locale}: ${error.message}`);
	}

	return {
		globalSettings,
		//menus: MenusData,
	};
}
