function transformGlobalSettingsRestToJson(restResponse) {
	let globalSocialChannels = [];
	if (Array.isArray(restResponse.acf?.global_social_channels)) {
		globalSocialChannels =
			restResponse.acf?.global_social_channels?.map((socialChannels) => ({
				__typename: 'ThemeGeneralSettings_Settingssocial_globalSocialChannels',
				title: socialChannels?.title ?? null,
				website: socialChannels?.website ?? null,
			})) ?? null;
	}
	let globalAlertContentActionsData = [];
	if (Array.isArray(restResponse?.acf?.alert_group?.global_alert_content_actions)) {
		globalAlertContentActionsData =
			restResponse?.acf?.alert_group?.global_alert_content_actions?.map((action) => ({
				__typename: 'ThemeGeneralSettings_Settingsalerts_AlertGroup_globalAlertContentActions',
				adaText: action?.ada_text ?? null,
				function: 'default',
				seoText: action?.seo_text ?? null,
				link: {
					__typename: 'AcfLink',
					target: action?.link?.target ?? null,
					title: action?.link?.title ?? null,
					url: action?.link?.url ?? null,
				},
			})) ?? null;
	}
	let callToActionGroupActions = [];
	if (Array.isArray(restResponse?.acf?.call_to_action_group?.actions)) {
		callToActionGroupActions =
			restResponse?.acf?.call_to_action_group?.actions?.map((action) => ({
				__typename: 'ThemeGeneralSettings_Settingsfooter_CallToActionGroup_actions',
				adaText: action?.ada_text ?? null,
				seoText: action?.seo_text ?? null,
				display: action?.display ?? 'button--outline',
				function: 'default',
				link: {
					__typename: 'AcfLink',
					target: action?.link?.target ?? null,
					title: action?.link?.title ?? null,
					url: action?.link?.url ?? null,
				},
			})) ?? null;
	}

	return {
		themeGeneralSettings: {
			__typename: 'ThemeGeneralSettings',
			settingsAlerts: {
				__typename: 'ThemeGeneralSettings_Settingsalerts',
				globalAlertDisplay: restResponse?.acf?.global_alert_display ?? null,
				alertGroup: {
					__typename: 'ThemeGeneralSettings_Settingsalerts_AlertGroup',
					globalAlertContentMessage: restResponse?.acf?.alert_group?.global_alert_content_message ?? null,
					globalAlertContentAlertType: restResponse?.acf?.alert_group?.global_alert_content_alert_type ?? null,
					globalAlertContentActions: globalAlertContentActionsData,
				},
			},
			settingsSocial: {
				__typename: 'ThemeGeneralSettings_Settingssocial',
				globalSocialChannels: globalSocialChannels,
			},
			settingsFooter: {
				__typename: 'ThemeGeneralSettings_Settingsfooter',
				globalFooterCtaDisplay: restResponse?.acf?.global_footer_cta_display ?? null,
				callToActionGroup: {
					__typename: 'ThemeGeneralSettings_Settingsfooter_CallToActionGroup',
					titleText: restResponse?.acf?.call_to_action_group?.title_text ?? '',
					backgroundColor: restResponse?.acf?.call_to_action_group?.background_color ?? null,
					backgroundPattern: restResponse?.acf?.call_to_action_group?.background_pattern ?? null,
					backgroundType: restResponse?.acf?.call_to_action_group?.background_type ?? null,
					backgroundImage: {
						__typename: 'ThemeGeneralSettings_Settingsfooter_CallToActionGroup_BackgroundImage',
						image: restResponse?.acf?.call_to_action_group?.background_image?.image ?? null,
						mobileImage: restResponse?.acf?.call_to_action_group?.background_image?.mobile_image ?? null,
					},
					description: restResponse?.acf?.call_to_action_group?.description ?? null,
					paddingBottom: restResponse?.acf?.call_to_action_group?.padding_bottom ?? 'default',
					paddingTop: restResponse?.acf?.call_to_action_group?.padding_top ?? 'default',
					actions: callToActionGroupActions,
				},
				footerGroup: {
					__typename: 'ThemeGeneralSettings_Settingsfooter_FooterGroup',
					adaText: restResponse?.acf?.footer_group?.ada_text ?? null,
					seoText: restResponse?.acf?.footer_group?.seo_text ?? null,
					footerDescription: restResponse?.acf?.footer_group?.footer_description ?? null,
					function: 'default',
					link: {
						__typename: 'AcfLink',
						target: restResponse?.acf?.footer_group?.link?.target ?? null,
						title: restResponse?.acf?.footer_group?.link?.title ?? null,
						url: restResponse?.acf?.footer_group?.link?.url ?? null,
					},
				},
			},
			settingsHeader: {
				__typename: 'ThemeGeneralSettings_Settingsheader',
				globalHeaderColorLogo: {
					__typename: 'MediaItem',
					mediaItemUrl: restResponse?.acf?.global_header_color_logo?.url ?? null,
					altText: restResponse?.acf?.global_header_color_logo?.alt ?? null,
				},
				globalHeaderLogo: {
					__typename: 'MediaItem',
					altText: restResponse?.acf?.global_header_logo?.alt ?? null,
					mediaItemUrl: restResponse?.acf?.global_header_logo?.url ?? null,
				},
				flagCta: {
					__typename: 'AcfLink',
					target: restResponse?.acf?.flag_cta?.target ?? null,
					title: restResponse?.acf?.flag_cta?.title ?? null,
					url: restResponse?.acf?.flag_cta?.url ?? null,
				},
			},
		},
	};
}

module.exports = transformGlobalSettingsRestToJson;
