import { createSeoObject } from './PageTemplateHelpers/moleculeHelpers';

export function transformExploreProductByIDRestToJson(restResponse, dataType) {
	switch (dataType) {
		case 'exploreProductsById':
			return transformExploreProductByID(restResponse);
		default:
			console.error('ERROR: transformExploreProductByIDRestToJson: dataType was undefined, returning null');
			return null;
	}
}

function transformExploreProductByID(restResponse) {
	if (!restResponse || !restResponse.id) return;
	const { yoast_head_json = {}, yoast_head, acf = {}, title, slug, content, featured_media } = restResponse;
	const {
		header,
		gated,
		combobox_choices,
		consent_checkbox,
		custom_thank_you,
		fremium_emails,
		next_form,
		gated_details,
		demo_url,
	} = acf;
	return {
		__typename: 'Explore_product',
		seo: createSeoObject(yoast_head_json, yoast_head),
		id: restResponse.id,
		slug,
		title: title?.rendered,
		exploreProductsGatedFields: {
			__typename: 'Explore_product_Exploreproductsgatedfields',
			ungatedDetails: {
				__typename: 'Explore_product_Exploreproductsgatedfields_UngatedDetails',
				ungatedCta: null,
				ungatedMastheadImage: null,
			},
			gated: gated,
			gatedDetails: {
				__typename: 'Explore_product_Exploreproductsgatedfields_GatedDetails',
				coCode: gated_details?.co_code || null,
				comboboxChoices: combobox_choices || null,
				consentCheckbox: consent_checkbox || null,
				customThankYou: custom_thank_you || null,
				fremiumEmails: fremium_emails || null,
				initiative: gated_details?.initiative || [],
				nextForm: next_form || null,
				persona: gated_details?.persona || [],
				product: gated_details?.product || null,
				redirectUrl: gated_details?.redirect_url || null,
				reportingTitle: gated_details?.reporting_title || null,
				resourceFormCta: gated_details?.resource_form_cta || null,
				selectForm: {
					__typename: 'Form',
					id: gated_details?.select_form?.ID || null,
					supportCPTFormFields: {
						__typename: 'Form_Supportcptformfields',
						formId: gated_details?.select_form?.form_id || null,
						formTitle: gated_details?.select_form?.form_title || null,
					},
				},
				stage: gated_details?.stage || null,
				type: gated_details?.type || null,
			},
			demoUrl: demo_url || null,
			header: {
				__typename: 'Explore_product_Exploreproductsgatedfields_Header',
				backgroundColor: header?.background_color || null,
				backgroundPattern: header?.background_pattern || null,
				backgroundType: header?.background_type || null,
				preheadText: header?.prehead_text || null,
				preheadType: header?.prehead_type || null,
			},
		},
		featuredImage: featured_media && featured_media !== 0 ? featured_media : null,
		content: content?.rendered,
		translated: [],
		contentBlocksModules: {
			__typename: 'ContentNode_Contentblocksmodules',
			modules: [],
		},
	};
}
