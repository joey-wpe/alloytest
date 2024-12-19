import {
	createSeoObject,
	createAlertGroupObject,
	createHeroObject,
	createHeroMinimalObject,
	createPageFooterObject,
	formatWPTranslated,
} from '../PageTemplateHelpers/moleculeHelpers';

export const formatBasicOneColumnTemplate = (restResponse, template, locale, postTypeData) => {
	if (!restResponse) return null;
	const { id, slug, title, uri, yoast_head, yoast_head_json, acf, wpml_translations } = restResponse || {};
	const { hero, hero_minimal, alert_settings, call_to_action_settings, call_to_action_group, hero_type } = acf || {};
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
			id: id ?? null,
			slug: slug ?? null,
			title: title?.rendered ?? null,
			uri: uri ?? null,
			template: {
				__typename: 'Template_BasicOneColumn',
				templateName: template,
				TemplateBasicOneColumn: {
					__typename: 'Template_BasicOneColumn_Templatebasiconecolumn',
					mainContent: acf?.main_content || null,
					displayOnetrustSettings: acf?.display_onetrust_settings === 'yes' || false,
				},
			},
		},
		translated: formatWPTranslated(wpml_translations, locale),
		postTypeData: { postTypes: {}, ...postTypeData },
	};
};
