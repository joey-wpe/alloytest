import { formatActions, createSeoObject } from './PageTemplateHelpers/moleculeHelpers';
import { handleFormComboboxChoices, handleFormConsentCheckbox } from './PageTemplateHelpers/flexModuleHelpers';
import { createContentBlocksModules } from './PageTemplateHelpers/flexTemplateHelpers';

export function transformLandingPageByIDRestToJson(restResponse, dataType) {
	switch (dataType) {
		case 'landingPageById':
			return transformLandingPageByID(restResponse);
		default:
			console.error('ERROR: transformLandingPageByIDRestToJson: dataType was undefined, returning null');
			return null;
	}
}

const handleTopSection = (topSection = {}) => {
	if (!topSection) return {};
	const formNextForm = topSection.form_next_form?.ID
		? {
				__typename: 'Form',
				id: topSection.form_next_form.ID,
				supportCPTFormFields: {
					__typename: 'Form_Supportcptformfields',
					formId: topSection.form_next_form?.form_id || null,
					formTitle: topSection.form_next_form?.form_title || null,
				},
		  }
		: null;

	const formRedirectUrl = topSection.form_redirect_url?.url
		? {
				__typename: 'AcfLink',
				target: topSection.form_redirect_url?.target || null,
				title: topSection.form_redirect_url?.title || null,
				url: topSection.form_redirect_url?.url || null,
		  }
		: null;

	const formSelectForm = topSection.form_select_form?.ID
		? {
				__typename: 'Form',
				id: topSection.form_select_form?.ID || null,
				supportCPTFormFields: {
					__typename: 'Form_Supportcptformfields',
					formId: topSection.form_select_form?.form_id || null,
					formTitle: topSection.form_select_form?.form_title || null,
				},
		  }
		: null;

	const image = topSection.image?.url
		? {
				__typename: 'MediaItem',
				altText: topSection.image?.alt || '',
				mediaItemUrl: topSection.image?.url || '',
		  }
		: null;

	return {
		__typename: 'Landingpage_Campaignlandingpages_BasicLandingPage_TopSection',
		backgroundType: topSection?.background_type || null,
		backgroundPattern: topSection?.background_pattern || null,
		backgroundColor: topSection?.background_color || null,
		paddingBottom: topSection?.padding_bottom && topSection?.padding_bottom !== '0' ? topSection?.padding_bottom : null,
		paddingTop: topSection?.padding_top && topSection?.padding_top !== '0' ? topSection?.padding_top : null,
		anchor: topSection?.anchor || null,
		additionalClasses: topSection?.additional_classes || null,
		description: topSection?.description || null,
		formCoCode: topSection?.form_co_code || null,
		formFremiumEmails: topSection?.form_fremium_emails?.length || null,
		formInitiative: topSection?.form_initiative || null,
		formNextForm,
		formPersona: topSection?.form_persona || null,
		formProduct: topSection?.form_product || null,
		formRedirectUrl,
		formReportingTitle: topSection?.form_reporting_title || null,
		formResourceFormCta: topSection?.form_resource_form_cta || null,
		formSelectForm,
		formStage: topSection?.form_stage || null,
		formType: topSection?.form_type || null,
		image,
		preheadText: topSection?.prehead_text || null,
		preheadType: topSection?.prehead_type || null,
		titleText: topSection?.title_text || null,
		titleType: topSection?.title_type || null,
		actions: formatActions(topSection?.actions, 'Landingpage_Campaignlandingpages_BasicLandingPage_TopSection_actions'),
		formComboboxChoices: handleFormComboboxChoices(topSection?.form_combobox_choices),
		formConsentCheckbox: handleFormConsentCheckbox(topSection?.form_consent_checkbox),
		formMarketingOptInCheckbox: topSection?.form_marketing_opt_in_checkbox || null,
		formTermsOptInCheckbox: topSection?.form_terms_opt_in_checkbox || null,
		formCustomThankYou: topSection?.form_custom_thank_you || null,
	};
};

const transformLandingPageByID = (restResponse) => {
	if (!restResponse || !restResponse.id) return null;

	const { yoast_head, yoast_head_json, id, title, slug, wpml_translations, acf } = restResponse || {};
	const { basic_landing_page } = acf || {};
	const { top_section, reveal_section, content_section } = basic_landing_page || {};

	return {
		__typename: 'Landingpage',
		seo: createSeoObject(yoast_head_json, yoast_head),
		id: id || null,
		title: title?.rendered || null,
		slug: slug || null,
		translated: wpml_translations || [],
		campaignLandingPages: {
			__typename: 'Landingpage_Campaignlandingpages',
			basicLandingPage: {
				__typename: 'Landingpage_Campaignlandingpages_BasicLandingPage',
				revealSection: {
					__typename: 'Landingpage_Campaignlandingpages_BasicLandingPage_RevealSection',
					revealModules: createContentBlocksModules(reveal_section?.reveal_modules)?.modules ?? [],
				},
				topSection: handleTopSection(top_section),
				contentSection: {
					__typename: 'Landingpage_Campaignlandingpages_BasicLandingPage_ContentSection',
					contentModules: createContentBlocksModules(content_section?.content_modules)?.modules ?? [],
				},
			},
		},
	};
};
