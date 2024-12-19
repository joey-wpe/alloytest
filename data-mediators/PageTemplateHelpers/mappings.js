import StringConstants from '../../StringConstants';

/* Maps `StringConstants.PageTemplates` keys to template names using bracket notation for dynamic key access.
Dot notation `StringConstants.PageTemplates.BasicOneColumn` cannot be used here as it would interpret the keys 
as literal strings rather than variable references, leading to errors. */
export const templateTypeMap = {
	[StringConstants.PageTemplates.BasicOneColumn]: 'Template_BasicOneColumn',
	[StringConstants.PageTemplates.Locations]: 'Template_Location',
	[StringConstants.PageTemplates.Modular]: 'Template_Modular',
	[StringConstants.PageTemplates.NewsroomMain]: 'Template_NewsroomMain',
	[StringConstants.PageTemplates.Partners]: 'Template_Partners',
	[StringConstants.PageTemplates.PricingMain]: 'Template_PricingMain',
	[StringConstants.PageTemplates.PricingDetail]: 'Template_PricingDetail',
	[StringConstants.PageTemplates.ProductDemoForm]: 'Template_ProductDemoForm',
	[StringConstants.PageTemplates.TeamMemberArchive]: 'Template_TeamMemberArchive',
	[StringConstants.PageTemplates.ProductLogin]: 'Template_ProductLogin',
	[StringConstants.PageTemplates.ModularWithSecondaryNav]: 'Template_ModularWithSecondaryNav',
	[StringConstants.PageTemplates.CaseStudiesMain]: 'Template_CaseStudiesMain',
	[StringConstants.PageTemplates.Archive]: 'Template_Archive',
	[StringConstants.PageTemplates.ROICalculatorMain]: 'Template_ROICalculatorMain',
	[StringConstants.PageTemplates.ROICalculatorResult]: 'Template_ROICalculatorResults',
};

export const moduleTypeMap = {
	plain_text: 'ContentNode_Contentblocksmodules_Modules_PlainText',
	data_box_large: 'ContentNode_Contentblocksmodules_Modules_DataBoxLarge',
	logos: 'ContentNode_Contentblocksmodules_Modules_Logos',
	case_study_slider: 'ContentNode_Contentblocksmodules_Modules_CaseStudySlider',
	left_right: 'ContentNode_Contentblocksmodules_Modules_LeftRight',
	disruptor: 'ContentNode_Contentblocksmodules_Modules_Disruptor',
	resources_grid: 'ContentNode_Contentblocksmodules_Modules_ResourcesGrid',
	icon_grid: 'ContentNode_Contentblocksmodules_Modules_IconGrid',
	icon_flip_card: 'ContentNode_Contentblocksmodules_Modules_IconFlipCard',
	testimonial_slider: 'ContentNode_Contentblocksmodules_Modules_TestimonialSlider',
	basic_tabber: 'ContentNode_Contentblocksmodules_Modules_BasicTabber',
	card_grid: 'ContentNode_Contentblocksmodules_Modules_CardGrid',
	cross_tiles: 'ContentNode_Contentblocksmodules_Modules_CrossTiles',
	video: 'ContentNode_Contentblocksmodules_Modules_Video',
	data_box_small: 'ContentNode_Contentblocksmodules_Modules_DataBoxSmall',
	product_tabber: 'ContentNode_Contentblocksmodules_Modules_ProductTabber',
	form: 'ContentNode_Contentblocksmodules_Modules_Form',
	faqs: 'ContentNode_Contentblocksmodules_Modules_Faqs',
	comparison_chart_flex_module: 'ContentNode_Contentblocksmodules_Comparison_Chart_Flex_Module',
};

export const backgroundImageTypeMap = {
	plain_text: 'ContentNode_Contentblocksmodules_Modules_PlainText_BackgroundImage',
	data_box_large: 'ContentNode_Contentblocksmodules_Modules_DataBoxLarge_BackgroundImage',
	logos: 'ContentNode_Contentblocksmodules_Modules_Logos_BackgroundImage',
	case_study_slider: 'ContentNode_Contentblocksmodules_Modules_CaseStudySlider_BackgroundImage',
	left_right: 'ContentNode_Contentblocksmodules_Modules_LeftRight_BackgroundImage',
	disruptor: 'ContentNode_Contentblocksmodules_Modules_Disruptor_BackgroundImage',
	resources_grid: 'ContentNode_Contentblocksmodules_Modules_ResourcesGrid_BackgroundImage',
	icon_grid: 'ContentNode_Contentblocksmodules_Modules_IconGrid_BackgroundImage',
	testimonial_slider: 'ContentNode_Contentblocksmodules_Modules_TestimonialSlider_BackgroundImage',
	basic_tabber: 'ContentNode_Contentblocksmodules_Modules_BasicTabber_BackgroundImage',
	card_grid: 'ContentNode_Contentblocksmodules_Modules_CardGrid_BackgroundImage',
	cross_tiles: 'ContentNode_Contentblocksmodules_Modules_CrossTiles_BackgroundImage',
	icon_flip_card: 'ContentNode_Contentblocksmodules_Modules_IconFlipCard_BackgroundImage',
	video: 'ContentNode_Contentblocksmodules_Modules_Video_BackgroundImage',
	data_box_small: 'ContentNode_Contentblocksmodules_Modules_DataBoxSmall_BackgroundImage',
	product_tabber: 'ContentNode_Contentblocksmodules_Modules_ProductTabber_BackgroundImage',
	form: 'ContentNode_Contentblocksmodules_Modules_Form_BackgroundImage',
	faqs: 'ContentNode_Contentblocksmodules_Modules_Faqs_BackgroundImage',
	comparison_chart_flex_module: 'ContentNode_Contentblocksmodules_Modules_Comparison_Chart_Flex_Module_BackgroundImage',
};

export const actionTypeMap = {
	plain_text: 'ContentNode_Contentblocksmodules_Modules_PlainText_actions',
	data_box_large: 'ContentNode_Contentblocksmodules_Modules_DataBoxLarge_actions',
	logos: 'ContentNode_Contentblocksmodules_Modules_Logos_actions',
	case_study_slider: 'ContentNode_Contentblocksmodules_Modules_CaseStudySlider_actions',
	left_right: 'ContentNode_Contentblocksmodules_Modules_LeftRight_actions',
	disruptor: 'ContentNode_Contentblocksmodules_Modules_Disruptor_actions',
	resources_grid: 'ContentNode_Contentblocksmodules_Modules_ResourcesGrid_actions',
	icon_grid: 'ContentNode_Contentblocksmodules_Modules_IconGrid_actions',
	testimonial_slider: 'ContentNode_Contentblocksmodules_Modules_TestimonialSlider_actions',
	basic_tabber: 'ContentNode_Contentblocksmodules_Modules_BasicTabber_actions',
	card_grid: 'ContentNode_Contentblocksmodules_Modules_CardGrid_actions',
	cross_tiles: 'ContentNode_Contentblocksmodules_Modules_CrossTiles_actions',
	icon_flip_card: 'ContentNode_Contentblocksmodules_Modules_IconFlipCard_actions',
	video: 'ContentNode_Contentblocksmodules_Modules_Video_actions',
	data_box_small: 'ContentNode_Contentblocksmodules_Modules_DataBoxSmall_actions',
	product_tabber: 'ContentNode_Contentblocksmodules_Modules_ProductTabber_actions',
	form: 'ContentNode_Contentblocksmodules_Modules_Form_actions',
	faqs: 'ContentNode_Contentblocksmodules_Modules_Faqs_actions',
	comparison_chart_flex_module: 'ContentNode_Contentblocksmodules_Modules_Comparison_Chart_Flex_Module_actions',
};

export const moduleIconTypeMap = {
	icon_grid: 'ContentNode_Contentblocksmodules_Modules_IconGrid_icons',
	icon_flip_card: 'ContentNode_Contentblocksmodules_Modules_IconFlipCard_icons',
};

export const moduleIconWrapperTypeMap = {
	icon_grid: 'ContentNode_Contentblocksmodules_Modules_IconGrid_icons_IconWrapper',
	icon_flip_card: 'ContentNode_Contentblocksmodules_Modules_IconFlipCard_icons_IconWrapper',
};

export const moduleIconCardActionTypeMap = {
	icon_grid: 'ContentNode_Contentblocksmodules_Modules_IconGrid_icons_actions',
	icon_flip_card: 'ContentNode_Contentblocksmodules_Modules_IconFlipCard_icons_actions',
};

export const moduleIconCardBackgroundImageTypeMap = {
	icon_grid: 'ContentNode_Contentblocksmodules_Modules_IconGrid_icons_BackgroundImage',
	icon_flip_card: 'ContentNode_Contentblocksmodules_Modules_IconFlipCard_icons_BackgroundImage',
};
