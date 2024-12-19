import {
	createSeoObject,
	createAlertGroupObject,
	createHeroObject,
	createHeroMinimalObject,
	formatWPTranslated,
} from '../PageTemplateHelpers/moleculeHelpers';

import { createContentBlocksModules } from '../PageTemplateHelpers/flexTemplateHelpers';

const formatPartnerResourceGrid = (partnerResourceGrid) => {
	return {
		__typename: 'Template_Partners_Partnermainpage_PartnerResourceGrid',
		backgroundColor: partnerResourceGrid?.background_color || null,
		backgroundPattern: partnerResourceGrid?.background_pattern || null,
		backgroundType: partnerResourceGrid?.background_type || null,
		paddingTop: partnerResourceGrid?.padding_top || null,
		paddingBottom: partnerResourceGrid?.padding_bottom || null,
		developerAnchor: partnerResourceGrid?.developer_anchor || null,
		allowFeatured: partnerResourceGrid?.allow_featured || null,
		actions: partnerResourceGrid?.actions || null,
		preheadText: partnerResourceGrid?.prehead_text || null,
		preheadType: partnerResourceGrid?.prehead_type || null,
		titleText: partnerResourceGrid?.title_text || null,
		titleType: partnerResourceGrid?.title_type || null,
		allowedTypes: partnerResourceGrid?.allowed_types || null,
		description: partnerResourceGrid?.description || null,
		contentAlignment: partnerResourceGrid?.content_alignment || null,
		selectionMethod: partnerResourceGrid?.selection_method || null,
		posts: partnerResourceGrid?.posts || null,
	};
};

export const formatPartnerTemplate = (restResponse, template, locale, postTypeData) => {
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
		partners_post_type = {},
	} = restResponse || {};
	const { hero, alert_settings, hero_type, hero_minimal, partner_resource_grid, modules } = acf || {};
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
			isPreview: false,
			id: id ?? null,
			slug: slug ?? null,
			title: title?.rendered ?? null,
			uri: uri ?? null,
			template: {
				__typename: 'Template_Partners',
				templateName: template,
				partnerMainPage: {
					__typename: 'Template_Partners_Partnermainpage',
					partnerResourceGrid: formatPartnerResourceGrid(partner_resource_grid),
				},
			},
			contentBlocksModules: createContentBlocksModules(modules),
		},
		translated: formatWPTranslated(wpml_translations, locale),
		postTypeData: { postTypes: partners_post_type, ...postTypeData },
	};
};
