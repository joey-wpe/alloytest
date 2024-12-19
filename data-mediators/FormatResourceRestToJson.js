import { emptyReturnNull } from '../wplib/util';
import { formatWPTranslated } from './PageTemplateHelpers/moleculeHelpers';
import { createContentBlocksModules } from './PageTemplateHelpers/flexTemplateHelpers';

export function transformResourceByIDRestToJson(restResponse, dataType) {
	switch (dataType) {
		case 'ResourceByID':
			return transformResourceByIDJson(restResponse);

		default:
			console.error('ERROR: transformResourceByIDRestToJson: dataType was undefined, returning null');
			return null;
	}
}

function transformResourceByIDJson(restResponse) {
	let comboboxChoices = null;
	if (Array.isArray(restResponse?.acf?.gated_details?.combobox_choices)) {
		comboboxChoices =
			restResponse?.acf?.gated_details?.combobox_choices?.map((comboboxChoices) => ({
				comboboxId: comboboxChoices?.combobox_id ?? null,
				comboboxLabel: comboboxChoices?.combobox_label ?? null,
				comboboxChoices: comboboxChoices?.combobox_choices?.map((subChoices) => ({
					choiceName: subChoices?.choice_name ?? null,
					choiceValue: subChoices?.choice_value ?? null,
				})),
			})) ?? null;
	}

	let consentCheckbox = null;
	if (Array.isArray(restResponse?.acf?.gated_details?.consent_checkbox)) {
		consentCheckbox =
			restResponse?.acf?.gated_details?.consent_checkbox?.map((checkbox) => ({
				checkboxContent: checkbox?.checkbox_content ?? null,
				checkboxId: checkbox.checkbox_id ?? null,
			})) ?? null;
	}

	return {
		__typename: 'Resource',
		seo: {
			__typename: 'PostTypeSEO',
			canonical: restResponse?.yoast_head_json?.canonical ?? null,
			fullHead: restResponse?.yoast_head ?? null,
			metaDesc: restResponse?.yoast_head_json?.description ?? null,
			metaRobotsNofollow: restResponse?.yoast_head_json?.robots?.follow ?? null,
			metaRobotsNoindex: restResponse?.yoast_head_json?.robots?.index ?? null,
		},
		id: restResponse?.id ?? null,
		slug: restResponse?.slug ?? null,
		title: restResponse?.title?.rendered ?? null,
		resourceGatedFields: {
			__typename: 'Resource_Resourcegatedfields',
			ungatedDetails: {
				__typename: 'Resource_Resourcegatedfields_UngatedDetails',
				ungatedCta: emptyReturnNull(restResponse?.acf?.ungated_details?.ungated_cta) ?? null,
				ungatedMastheadImage: {
					__typename: 'MediaItem',
					altText: restResponse?.acf?.ungated_details?.ungated_masthead_image?.alt ?? null,
					mediaItemUrl: restResponse?.acf?.ungated_details?.ungated_masthead_image?.url ?? null,
				},
			},
			gated: restResponse?.acf?.gated ?? true,
			gatedDetails: {
				__typename: 'Resource_Resourcegatedfields_GatedDetails',
				coCode: emptyReturnNull(restResponse?.acf?.gated_details?.co_code) ?? null,
				comboboxChoices: comboboxChoices,
				consentCheckbox: consentCheckbox,
				customThankYou: emptyReturnNull(restResponse?.acf?.gated_details?.custom_thank_you ?? null),
				fremiumEmails: restResponse?.acf?.gated_details?.fremium_emails ?? null,
				initiative: restResponse?.acf?.gated_details?.initiative ?? null,
				nextForm: emptyReturnNull(restResponse?.acf?.gated_details?.next_form ?? null),
				persona: restResponse?.acf?.gated_details?.persona ?? null,
				product: restResponse?.acf?.gated_details?.product ?? null,
				redirectUrl: restResponse?.acf?.gated_details?.redirect_url ?? null,
				reportingTitle: restResponse?.acf?.gated_details?.reporting_title ?? null,
				resourceFormCta: emptyReturnNull(restResponse?.acf?.gated_details?.resource_form_cta) ?? null,
				selectForm: {
					__typename: 'Form',
					id: restResponse?.acf?.gated_details?.select_form?.ID ?? null,
					supportCPTFormFields: {
						formId: restResponse?.acf?.gated_details?.select_form?.form_id || null,
						formTitle: restResponse?.acf?.gated_details?.select_form?.form_title || null,
					},
				},
				stage: restResponse?.acf?.gated_details?.stage ?? null,
				type: restResponse?.acf?.gated_details?.type ?? null,
			},
			header: {
				__typename: 'Resource_Resourcegatedfields_Header',
				backgroundColor: restResponse?.acf?.header?.background_color ?? null,
				backgroundPattern: restResponse?.acf?.header?.background_pattern ?? null,
				backgroundType: restResponse?.acf?.header?.background_type ?? null,
				preheadText: restResponse?.acf?.header?.prehead_text ?? null,
				preheadType: restResponse?.acf?.header?.prehead_type ?? null,
			},
		},
		featuredImage: {
			__typename: 'NodeWithFeaturedImageToMediaItemConnectionEdge',
			node: {
				__typename: 'MediaItem',
				altText: restResponse?.alt_text ?? null,
				mediaItemUrl: restResponse?.featured_media_src ?? null,
			},
		},
		content: restResponse?.content?.rendered ?? '',
		translated: formatWPTranslated(restResponse?.wpml_translations, restResponse?.wpml_current_locale),
		contentBlocksModules: createContentBlocksModules(restResponse?.acf?.modules),
	};
}
