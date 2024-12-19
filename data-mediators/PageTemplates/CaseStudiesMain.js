import {
	createSeoObject,
	createPageFooterObject,
	createAlertGroupObject,
	createHeroObject,
	createHeroMinimalObject,
	formatWPTranslated,
} from '../PageTemplateHelpers/moleculeHelpers';

import { createContentBlocksModules } from '../PageTemplateHelpers/flexTemplateHelpers';

export const formatCaseStudiesMainTemplate = (restResponse, template, locale, postTypeData) => {
	if (!restResponse) return null;
	const {
		id,
		slug,
		title,
		uri,
		yoast_head,
		yoast_head_json,
		acf,
		wpml_translations,
		featured_media,
		featured_media_src,
		case_studies_post_type = {},
	} = restResponse || {};
	const { hero, alert_settings, hero_type, hero_minimal, modules, call_to_action_settings, call_to_action_group } =
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
			featuredImage: featured_media && Number(featured_media) !== 0 ? featured_media_src?.url : null,
			id: id ?? null,
			slug: slug ?? null,
			title: title?.rendered ?? null,
			uri: uri ?? null,
			template: {
				__typename: 'Template_CaseStudiesMain',
				templateName: template,
			},
			contentBlocksModules: createContentBlocksModules(modules),
		},
		translated: formatWPTranslated(wpml_translations, locale),
		postTypeData: { postTypes: case_studies_post_type, ...postTypeData },
	};
};
