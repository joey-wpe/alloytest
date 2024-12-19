import {
	createSeoObject,
	createPageFooterObject,
	createAlertGroupObject,
	formatWPTranslated,
} from '../PageTemplateHelpers/moleculeHelpers';

import { createContentBlocksModules } from '../PageTemplateHelpers/flexTemplateHelpers';

const createHeroFormGroupForDemoForm = (hero = {}) => {
	const { default_hero_form_group } = hero;
	return {
		__typename: 'Template_ProductDemoForm_Pageheaderproductdemo_Hero',
		defaultHeroActions: hero?.default_hero_actions || null,
		defaultHeroDescription: hero?.default_hero_description ?? null,
		defaultHeroTitleTitleType: hero?.default_hero_title_title_type || null,
		defaultHeroTitleTitleText: hero?.default_hero_title_title_text || null,
		defaultHeroPreheadPreheadType: hero?.default_hero_prehead_prehead_type || null,
		defaultHeroPreheadPreheadText: hero?.default_hero_prehead_prehead_text || null,
		defaultHeroPreheadLogo: hero?.default_hero_prehead_logo
			? {
					__typename: 'MediaItem',
					altText: '',
					mediaItemUrl: hero?.default_hero_prehead_logo,
			  }
			: null,
		defaultHeroFormGroup: {
			__typename: 'Template_ProductDemoForm_Pageheaderproductdemo_Hero_DefaultHeroFormGroup',
			coCode: default_hero_form_group?.co_code ?? null,
			formHeadline: default_hero_form_group?.form_headline ?? null,
			formSubHeadline: default_hero_form_group?.form_subheadline ?? null,
			comboboxChoices: default_hero_form_group?.combobox_choices || null,
			consentCheckbox: default_hero_form_group?.consent_checkbox || null,
			customThankYou: default_hero_form_group?.custom_thank_you || null,
			fremiumEmails:
				default_hero_form_group?.fremium_emails && default_hero_form_group?.fremium_emails?.length > 0
					? fremiumEmails
					: null,
			initiative: default_hero_form_group?.initiative || [],
			marketingOptInCheckbox: default_hero_form_group?.marketing_opt_in_checkbox || null,
			nextForm: default_hero_form_group?.next_form?.acf?.form_id
				? {
						__typename: 'Form',
						supportCPTFormFields: {
							__typename: 'Form_Supportcptformfields',
							formId: default_hero_form_group?.next_form?.acf?.form_id ?? null,
						},
						title: default_hero_form_group?.next_form?.title?.rendered ?? null,
				  }
				: null,
			persona: default_hero_form_group?.persona || [],
			product: default_hero_form_group?.product || [],
			redirectUrl: default_hero_form_group?.redirect_url || null,
			redirectUrl: default_hero_form_group?.redirect_url
				? {
						__typename: 'AcfLink',
						target: default_hero_form_group?.redirect_url?.target ?? null,
						title: default_hero_form_group?.redirect_url?.title ?? null,
						url: default_hero_form_group?.redirect_url?.url ?? null,
				  }
				: null,
			reportingTitle: default_hero_form_group?.reporting_title || null,
			resourceFormCta: default_hero_form_group?.resource_form_cta || null,
			selectForm: {
				__typename: 'Form',
				id: default_hero_form_group?.select_form?.id ?? null,
				supportCPTFormFields: {
					__typename: 'Form_Supportcptformfields',
					formId: default_hero_form_group?.select_form?.acf?.form_id ?? null,
					formTitle: default_hero_form_group?.select_form?.acf?.form_title ?? null,
				},
			},
			stage: default_hero_form_group?.stage || null,
			termsOptInCheckbox: default_hero_form_group?.terms_opt_in_checkbox || null,
			toggle:
				default_hero_form_group?.enable_toggle === 'on' && !!default_hero_form_group?.toggle
					? default_hero_form_group?.toggle
					: null,
			type: default_hero_form_group?.type || null,
		},
	};
};

export const formatProductDemoFormTemplate = (restResponse, template, locale, postTypeData) => {
	if (!restResponse) return null;
	const { id, slug, title, uri, yoast_head, yoast_head_json, acf, wpml_translations } = restResponse || {};
	const { hero, alert_settings, call_to_action_settings, call_to_action_group, modules } = acf || {};

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
				__typename: 'Template_ProductDemoForm',
				templateName: template,
				pageHeaderProductDemo: {
					__typename: 'Template_ProductDemoForm_Pageheaderproductdemo',
					alertSettings: alert_settings ?? null,
					alertgroup: createAlertGroupObject(acf, 'Template_ProductDemoForm_Pageheaderproductdemo_Alertgroup'),
					hero: createHeroFormGroupForDemoForm(hero),
				},
			},
			contentBlocksModules: createContentBlocksModules(modules),
		},
		translated: formatWPTranslated(wpml_translations, locale),
		postTypeData: { postTypes: {}, ...postTypeData },
	};
};
