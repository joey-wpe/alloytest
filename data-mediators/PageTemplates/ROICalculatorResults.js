import {
	createSeoObject,
	createAlertGroupObject,
	createHeroObject,
	createHeroMinimalObject,
	createPageFooterObject,
	formatWPTranslated,
} from '../PageTemplateHelpers/moleculeHelpers';

export const formatROICalculatorResultsTemplate = (restResponse, template, locale, postTypeData) => {
	if (!restResponse) return null;
	const { id, slug, title, uri, yoast_head, yoast_head_json, acf, wpml_translations } = restResponse || {};
	const { hero, hero_minimal, alert_settings, call_to_action_settings, call_to_action_group, hero_type } = acf || {};
	return {
		page: {
			__typename: 'Page',
			seo: createSeoObject(yoast_head_json, yoast_head),
			pageHeader: {
				__typename: 'Page_Pageheader',
				alertSettings: alert_settings ?? null,
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
				__typename: 'Template_ROICalculatorResults',
				templateName: template,
				pageHeaderROICalculatorResults: {
					__typename: 'Template_ROICalculatorResults_Pageheaderroicalculatorresults',
					heroMinimal: {
						__typename: 'Template_ROICalculatorResults_Pageheaderroicalculatorresults_HeroMinimal',
						description: hero_minimal?.description ?? null,
						preheadText: hero_minimal?.prehead_text ?? null,
						preheadType: hero_minimal?.prehead_type ?? null,
						titleText: hero_minimal?.title_text ?? null,
						titleType: hero_minimal?.title_type ?? null,
					},
					alertSettings: alert_settings ?? null,
					alertgroup: createAlertGroupObject(
						acf,
						'Template_ROICalculatorResults_Pageheaderroicalculatorresults_Alertgroup',
						'Template_ROICalculatorMain_Pageheaderroicalculatorresults_Alertgroup_alertContentActions'
					),
				},
			},
			contentBlocksModules: { __typename: 'ContentNode_Contentblocksmodules', modules: [] },
		},
		translated: formatWPTranslated(wpml_translations, locale),
		postTypeData: { postTypes: {}, ...postTypeData },
	};
};
