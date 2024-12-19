import {
	createSeoObject,
	createAlertGroupObject,
	createPageFooterObject,
	formatWPTranslated,
} from '../PageTemplateHelpers/moleculeHelpers';

const createTestimonialObject = (testimonialDetail) => {
	if (!testimonialDetail || !testimonialDetail?.id) {
		return null;
	}

	const {
		id,
		title,
		acf: { content, author_company: authorCompany, author_name: authorName, author_title: authorTitle } = {},
	} = testimonialDetail;

	const testimonialObject = {
		__typename: 'Testimonial',
		id: id || null,
		title: title?.rendered || null,
		testimonialDetails: {
			__typename: 'Testimonial_Testimonialdetails',
			content: content || null,
			authorCompany: authorCompany || null,
			authorName: authorName || null,
			authorTitle: authorTitle || null,
		},
	};

	return testimonialObject;
};

export const formatROICalculatorMainTemplate = (restResponse, template, locale, postTypeData) => {
	if (!restResponse) return null;
	const { id, slug, title, uri, yoast_head, yoast_head_json, acf, wpml_translations } = restResponse || {};
	const { hero_minimal, alert_settings, call_to_action_settings, call_to_action_group } = acf || {};
	return {
		page: {
			__typename: 'Page',
			seo: createSeoObject(yoast_head_json, yoast_head),
			pageFooter: createPageFooterObject(call_to_action_settings, call_to_action_group),
			isPreview: false,
			id: id ?? null,
			slug: slug ?? null,
			title: title?.rendered ?? null,
			uri: uri ?? null,
			template: {
				__typename: 'Template_ROICalculatorMain',
				templateName: template,
				pageHeaderROICalculatorMain: {
					__typename: 'Template_ROICalculatorMain_Pageheaderroicalculatormain',
					heroMinimal: {
						__typename: 'Template_ROICalculatorMain_Pageheaderroicalculatormain_HeroMinimal',
						testimonial: createTestimonialObject(hero_minimal?.testimonial_detail),
						description: hero_minimal?.description ?? null,
						preheadText: hero_minimal?.prehead_text ?? null,
						preheadType: hero_minimal?.prehead_type ?? null,
						titleText: hero_minimal?.title_text ?? null,
						titleType: hero_minimal?.title_type ?? null,
					},
					alertSettings: alert_settings ?? null,
					alertgroup: createAlertGroupObject(
						acf,
						'Template_ROICalculatorMain_Pageheaderroicalculatormain_Alertgroup',
						'Template_ROICalculatorMain_Pageheaderroicalculatormain_Alertgroup_alertContentActions'
					),
				},
			},
		},
		translated: formatWPTranslated(wpml_translations, locale),
		postTypeData: { postTypes: {}, ...postTypeData },
	};
};
