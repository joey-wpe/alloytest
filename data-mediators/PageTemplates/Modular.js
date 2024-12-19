import {
	createSeoObject,
	createAlertGroupObject,
	createHeroObject,
	createHeroMinimalObject,
	createPageFooterObject,
	formatWPTranslated,
} from '../PageTemplateHelpers/moleculeHelpers';

import { createContentBlocksModules } from '../PageTemplateHelpers/flexTemplateHelpers';

export const formatModularTemplate = (restResponse, template, locale, postTypeData) => {
	if (!restResponse) return null;
	const { id, slug, title, uri, yoast_head, yoast_head_json, acf, wpml_translations } = restResponse || {};
	const { hero, alert_settings, call_to_action_settings, call_to_action_group, hero_type, hero_minimal, modules } =
		acf || {};
	return {
		page: {
			__typename: 'Page',
			seo: createSeoObject(yoast_head_json, yoast_head),
			pageHeader: {
				__typename: 'Page_Pageheader',
				alertSettings: alert_settings ?? 'global',
				alertgroup: createAlertGroupObject(acf),
				heroType: hero_type ?? null,
				hero: createHeroObject(hero),
				heroMinimal: createHeroMinimalObject(hero_minimal, title, hero_type),
			},
			pageFooter: createPageFooterObject(call_to_action_settings, call_to_action_group),
			isPreview: false,
			featuredImage: null,
			id: id ?? null,
			slug: slug ?? null,
			title: title?.rendered ?? null,
			uri: uri ?? null,
			template: { __typename: 'Template_Modular', templateName: template },
			contentBlocksModules: createContentBlocksModules(modules),
		},
		translated: formatWPTranslated(wpml_translations, locale),
		postTypeData: { postTypes: {}, ...postTypeData },
	};
};
