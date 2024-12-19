import { moduleTypeMap, actionTypeMap } from './mappings';

import {
	formatDataBoxBoxeslargeAndSmall,
	formatModuleTiles,
	formatFaqs,
	formatModuleVideos,
	formatBasicTabberTabs,
	formatCardGridCards,
	formatIcons,
	handleContentModulePosts,
	formatUploads,
	formatFormSelectForm,
	formatFormFremiumEmails,
	formmatFormRedirectUrl,
	formatSecondaryContentColumns,
	formatBackgroundImage,
	formatMediaFormGroup,
	formatMediaImage,
	formatMediaVideoOverlayImage,
	createHeaderTabs,
	createComparisonChart,
	createComparisonChartButton,
	createComparisonChartHeader,
	handleFormComboboxChoices,
	handleFormConsentCheckbox,
} from './flexModuleHelpers';

import { formatActions } from './moleculeHelpers';
import { convertIframeToUrl } from '../../wplib/util';

// Used for formatting contentBlockModules across several page templates.
export const createContentBlocksModules = (modules = []) => {
	if (!modules || modules.length === 0)
		return {
			__typename: 'ContentNode_Contentblocksmodules',
			modules: [],
		};
	return {
		__typename: 'ContentNode_Contentblocksmodules',
		modules: modules.map((module) => {
			return {
				__typename: moduleTypeMap[module.acf_fc_layout],
				paddingTop: module?.padding_top && module?.padding_top !== '0' ? module?.padding_top : null,
				paddingBottom: module?.padding_bottom && module?.padding_bottom !== '0' ? module?.padding_bottom : null,
				anchor: module?.anchor || null,
				additionalClasses: module?.additional_classes || null,
				backgroundColor: module?.background_color || null,
				backgroundPattern: module?.background_pattern || null,
				backgroundType: module?.background_type || null,
				boxes: formatDataBoxBoxeslargeAndSmall(module.boxes, module?.acf_fc_layout),
				tiles: formatModuleTiles(module?.tiles),
				description: module?.description || null,
				headerTabs: createHeaderTabs(module?.header_tabs),
				comparisonChartHeader: createComparisonChartHeader(module?.comparison_chart_header),
				comparisonChart: createComparisonChart(module?.comparison_chart),
				comparisonChartButtons: createComparisonChartButton(module),
				faqs: formatFaqs(module?.faqs),
				formCoCode: module?.form_co_code || null,
				formInitiative: module?.form_initiative || null,
				formPersona: module?.form_persona || null,
				formProduct: module?.form_product || null,
				formReportingTitle: module?.form_reporting_title || null,
				formStage: module?.form_stage || null,
				formType: module?.form_type || null,
				mediaMediaType: module?.media_media_type || null,
				mediaVideoEmbed: convertIframeToUrl(module?.media_video_embed),
				titleText: module?.title_text || null,
				titleType: module?.title_type || null,
				preheadText: module?.prehead_text || null,
				preheadType: module?.prehead_type || null,
				formResourceFormCta: module?.form_resource_form_cta || null,
				formMarketingOptInCheckbox: module?.form_marketing_opt_in_checkbox || null,
				formTermsOptInCheckbox: module?.form_terms_opt_in_checkbox || null,
				formComboboxChoices: handleFormComboboxChoices(module.form_combobox_choices),
				formConsentCheckbox: handleFormConsentCheckbox(module.form_consent_checkbox),
				formNextForm: {
					id: module.form_next_form?.ID ?? null,
					supportCPTFormFields: {
						formId: module.form_next_form?.form_id ?? null,
					},
				},
				formSelectForm: formatFormSelectForm(module?.form_select_form),
				formFremiumEmails: formatFormFremiumEmails(module?.form_fremium_emails),
				formRedirectUrl: formmatFormRedirectUrl(module?.form_redirect_url),
				formCustomThankYou: module?.form_custom_thank_you || null,
				secondaryContentColumns: formatSecondaryContentColumns(module?.secondary_content_columns),
				video: formatModuleVideos(module?.video),
				contentAlignment: module?.content_alignment || null,
				allowFeatured: module?.allow_featured || null,
				tabs: formatBasicTabberTabs(module?.tabs, module.acf_fc_layout),
				cards: formatCardGridCards(module?.cards),
				backgroundImage: formatBackgroundImage(module),
				numberOfPosts: module?.number_of_posts ? Number(module?.number_of_posts) : null,
				columnFormat: module?.column_format ?? null,
				backgroundIconColor1: module?.background_icon_color_1 || null,
				backgroundIconColor2: module?.background_icon_color_2 || null,
				icons: formatIcons(module),
				posts: handleContentModulePosts(module?.posts, module?.acf_fc_layout),
				mediaFormGroup: formatMediaFormGroup(
					module?.media_form_group,
					'ContentNode_Contentblocksmodules_Modules_LeftRight_MediaFormGroup'
				),
				contentSide: module?.content_side || null,
				chevronAngle: module?.chevron_angle || null,
				mediaImage: formatMediaImage(module?.media_image),
				mediaVideoOverlayImage: formatMediaVideoOverlayImage(module?.media_video_overlay_image),
				allowedTypes: module?.allowed_types || null,
				selectionMethod: module?.selection_method || null,
				displayStyle: module?.display_style || null,
				logosPerSlide: module?.logos_per_slide ? Number(module?.logos_per_slide) : null,
				logosPerGridRow: module?.logos_per_grid_row ? Number(module?.logos_per_grid_row) : null,
				selectionType: module?.selection_type || null,
				uploads: formatUploads(module?.uploads),
				actions: formatActions(module?.actions, actionTypeMap[module.acf_fc_layout]),
			};
		}),
	};
};
