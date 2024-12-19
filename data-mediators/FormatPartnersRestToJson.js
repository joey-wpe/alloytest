import {
	formatWPTranslated,
	createHeroObject,
	createHeroMinimalObject,
	createPageFooterObject,
} from './PageTemplateHelpers/moleculeHelpers';
import { createContentBlocksModules } from './PageTemplateHelpers/flexTemplateHelpers';

export function transformPartnersByIDRestToJson(restResponse, dataType) {
	switch (dataType) {
		case 'PartnersByID':
			return transformPartnersByIDJson(restResponse);

		default:
			console.error('ERROR: transformPartnersByIDRestToJson: dataType was undefined, returning null');
			return null;
	}
}

function transformPartnersByIDJson(restResponse) {
	let comboboxChoices = null;
	if (Array.isArray(restResponse?.acf?.hero?.default_hero_media_form_group?.combobox_choices)) {
		comboboxChoices =
			restResponse?.acf?.hero?.default_hero_media_form_group?.combobox_choices?.map((comboboxChoices) => ({
				comboboxId: comboboxChoices?.combobox_id ?? null,
				comboboxLabel: comboboxChoices?.combobox_label ?? null,
				comboboxChoices: comboboxChoices?.combobox_choices?.map((subChoices) => ({
					choiceName: subChoices?.choice_name ?? null,
					choiceValue: subChoices?.choice_value ?? null,
				})),
			})) ?? null;
	}

	let consentCheckbox = null;
	if (Array.isArray(restResponse?.acf?.hero?.default_hero_media_form_group?.consent_checkbox)) {
		consentCheckbox =
			restResponse?.acf?.hero?.default_hero_media_form_group?.consent_checkbox?.map((checkbox) => ({
				checkboxContent: checkbox?.checkbox_content ?? null,
				checkboxId: checkbox.checkbox_id ?? null,
			})) ?? null;
	}

	return {
		__typename: 'Partner',
		seo: {
			__typename: 'PostTypeSEO',
			canonical: restResponse?.yoast_head_json?.canonical ?? null,
			fullHead: restResponse?.yoast_head ?? null,
			metaDesc: restResponse?.yoast_head_json?.description ?? null,
			metaRobotsNofollow: restResponse?.yoast_head_json?.robots?.follow ?? null,
			metaRobotsNoindex: restResponse?.yoast_head_json?.robots?.index ?? null,
		},
		title: restResponse?.title?.rendered ?? null,
		featuredImage: {
			__typename: 'NodeWithFeaturedImageToMediaItemConnectionEdge',
			node: {
				__typename: 'MediaItem',
				mediaItemUrl: restResponse?.featured_media_src ?? null,
				altText: restResponse?.alt_text ?? null,
			},
		},
		translated: formatWPTranslated(restResponse?.wpml_translations, restResponse?.wpml_current_locale),
		pageHeader: {
			__typename: 'Partner_Pageheader',
			alertSettings: restResponse?.acf?.alert_settings ?? null,
			alertgroup: {
				__typename: 'Partner_Pageheader_Alertgroup',
				alertContentAlertType: null,
				alertContentMessage: null,
				alertContentActions: null,
			},
			heroType: restResponse?.acf?.hero_type,
			hero: createHeroObject(restResponse?.acf?.hero),
			heroMinimal: createHeroMinimalObject(
				restResponse?.acf?.hero_minimal,
				restResponse?.title,
				restResponse?.acf?.hero_type
			),
		},
		pageFooter: createPageFooterObject(
			restResponse?.acf?.call_to_action_settings,
			restResponse?.acf?.call_to_action_group
		),
		isPreview: false,
		id: restResponse?.id ?? null,
		slug: restResponse?.slug ?? null,
		uri: restResponse?.uri ?? null,
		postTypeTerms: restResponse?.post_type_terms ?? null,
		template: { __typename: 'DefaultTemplate', templateName: 'Default' },
		contentBlocksModules: createContentBlocksModules(restResponse?.acf?.modules),
	};
}
