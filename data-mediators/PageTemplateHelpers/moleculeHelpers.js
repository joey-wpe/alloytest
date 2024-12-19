import { extractExactPathNameEN, extractPathname, handleHomePageUri } from './utils';
import { convertIframeToUrl } from '../../wplib/util';
import { mediateUrlPath } from '../../wplib/urlHelpers';

// Used for formatting actions across all page templates with dynamic action types.
export const formatActions = (actions, actionType = 'Page_Pageheader_Alertgroup_alertContentActions') => {
	if (!Array.isArray(actions) || actions.length === 0) return null;

	return actions.map(({ display, ada_text, function: func, seo_text, link, color }) => ({
		__typename: actionType,
		adaText: ada_text || null,
		seoText: seo_text || null,
		display: display ?? null,
		color: color ?? null,
		function: func ?? null,
		link: link?.url
			? {
					__typename: 'AcfLink',
					target: link?.target ?? null,
					title: link?.title ?? null,
					url: mediateUrlPath(link?.url) ?? null,
			  }
			: null,
	}));
};

// used for formatting the 'seo' object in all of the page templates.
export const createSeoObject = (yoastHeadJson, yoastHead) => {
	return {
		__typename: 'PostTypeSEO',
		canonical: yoastHeadJson?.canonical ?? '',
		cornerstone: yoastHeadJson?.cornerstone ?? false,
		focuskw: '',
		fullHead: yoastHead ?? null,
		metaDesc: yoastHeadJson?.description ?? null,
		metaKeywords: '',
		metaRobotsNofollow: yoastHeadJson?.robots?.follow ?? null,
		metaRobotsNoindex: yoastHeadJson?.robots?.index ?? null,
		opengraphAuthor: yoastHeadJson?.og_author ?? '',
		opengraphDescription: yoastHeadJson?.og_description ?? null,
		opengraphImage:
			yoastHeadJson?.og_image && yoastHeadJson?.og_image?.length > 0
				? {
						__typename: 'MediaItem',
						altText: '',
						mediaItemUrl: yoastHeadJson?.og_image[0]?.url || null,
				  }
				: null,
		opengraphModifiedTime: yoastHeadJson?.article_modified_time ?? null,
		opengraphPublishedTime: yoastHeadJson?.article_published_time ?? '',
		opengraphPublisher: '',
		opengraphSiteName: yoastHeadJson?.og_site_name ?? null,
		opengraphTitle: yoastHeadJson?.og_title ?? null,
		opengraphType: yoastHeadJson?.og_type ?? null,
		opengraphUrl: yoastHeadJson?.og_url ?? null,
		title: yoastHeadJson?.title ?? null,
		twitterDescription: yoastHeadJson?.twitter_description ?? '',
		twitterImage: { __typename: 'MediaItem', altText: null, mediaItemUrl: yoastHeadJson?.twitter_image ?? null },
		twitterTitle: yoastHeadJson?.twitter_title ?? '',
	};
};

// used for formatting the 'alertgroup' object in all of the page templates.
export const createAlertGroupObject = (
	acf = {},
	type = 'Page_Pageheader_Alertgroup',
	actionType = 'Page_Pageheader_Alertgroup_alertContentActions'
) => {
	const { alertgroup } = acf || {};
	return {
		__typename: type,
		alertContentAlertType: alertgroup?.alert_content_alert_type || null,
		alertContentMessage: alertgroup?.alert_content_message || null,
		alertContentActions: formatActions(acf?.alertgroup?.alert_content_actions, actionType),
	};
};

// used for formatting the 'hero' object in all of the page templates.
export const createHeroObject = (hero = {}) => {
	const { default_hero_media_form_group, default_hero_actions } = hero;
	return {
		__typename: 'Page_Pageheader_Hero',
		defaultHeroBackgroundColor: hero?.default_hero_background_color || null,
		defaultHeroBackgroundPattern: hero?.default_hero_background_pattern || null,
		defaultHeroBackgroundType: hero?.default_hero_background_type || 'color',
		defaultHeroDescription: hero?.default_hero_description || null,
		defaultHeroPreheadText: hero?.default_hero_prehead_text || null,
		defaultHeroPreheadType: hero?.default_hero_prehead_type || 'default',
		defaultHeroTitleText: hero?.default_hero_title_text || null,
		defaultHeroTitleType: hero?.default_hero_title_type || 'default',
		defaultHeroMediaMediaType: hero?.default_hero_media_media_type || 'none',
		defaultHeroMediaVideoEmbed: convertIframeToUrl(hero?.default_hero_media_video_embed),
		defaultHeroMediaVideoOverlayImage: hero?.default_hero_media_video_overlay_image
			? {
					__typename: 'MediaItem',
					altText: hero?.default_hero_media_video_overlay_image?.alt ?? null,
					mediaItemUrl: hero?.default_hero_media_video_overlay_image?.url ?? null,
			  }
			: null,
		defaultHeroMediaImage: hero?.default_hero_media_image?.url
			? {
					__typename: 'MediaItem',
					mediaItemUrl: hero?.default_hero_media_image?.url ?? null,
					altText: hero?.default_hero_media_image?.alt ?? null,
			  }
			: null,
		defaultHeroPreheadLogo: hero?.default_hero_prehead_logo
			? {
					__typename: 'MediaItem',
					mediaItemUrl: hero?.default_hero_prehead_logo,
					altText: '',
			  }
			: null,
		defaultHeroMediaFormGroup: {
			__typename: 'Page_Pageheader_Hero_DefaultHeroMediaFormGroup',
			resourceFormCta: default_hero_media_form_group?.resource_form_cta || null,
			coCode: default_hero_media_form_group?.co_code || null,
			comboboxChoices: default_hero_media_form_group?.combobox_choices || null,
			consentCheckbox: default_hero_media_form_group?.consent_checkbox || null,
			customThankYou: default_hero_media_form_group?.custom_thank_you || null,
			initiative: default_hero_media_form_group?.initiative || [],
			marketingOptInCheckbox: default_hero_media_form_group?.marketing_opt_in_checkbox || 'explicit',
			nextForm: default_hero_media_form_group?.next_form || null,
			persona: default_hero_media_form_group?.persona || [],
			product: default_hero_media_form_group?.product || null,
			fremiumEmails:
				default_hero_media_form_group?.fremium_emails &&
				Array.isArray(default_hero_media_form_group?.fremium_emails) &&
				default_hero_media_form_group?.fremium_emails.length
					? default_hero_media_form_group?.fremium_emails
					: null,
			redirectUrl: default_hero_media_form_group?.redirect_url
				? {
						__typename: 'AcfLink',
						target: default_hero_media_form_group?.redirect_url?.target ?? null,
						title: default_hero_media_form_group?.redirect_url?.title ?? null,
						url: default_hero_media_form_group?.redirect_url?.url ?? null,
				  }
				: null,
			reportingTitle: default_hero_media_form_group?.reporting_title || null,
			stage: default_hero_media_form_group?.stage || null,
			type: default_hero_media_form_group?.type || null,
			selectForm: default_hero_media_form_group?.select_form?.id
				? {
						__typename: 'Form',
						id: default_hero_media_form_group?.select_form?.id,
						supportCPTFormFields: {
							__typename: 'Form_Supportcptformfields',
							formId: default_hero_media_form_group?.select_form?.acf?.form_id ?? null,
							formTitle: default_hero_media_form_group?.select_form?.acf?.form_title ?? null,
						},
						formId: default_hero_media_form_group?.select_form?.id ?? null,
						title: default_hero_media_form_group?.select_form?.title?.rendered ?? null,
				  }
				: null,
			termsOptInCheckbox: default_hero_media_form_group?.terms_opt_in_checkbox || 'explicit',
		},
		defaultHeroActions: formatActions(default_hero_actions, 'Page_Pageheader_Hero_defaultHeroActions'),
	};
};

// Used for handling 'heroMinimal' titleText in (createHeroMinimalObject)
const handleHeroMinimalTitleText = (heroType, titleText = null, title) => {
	if (heroType === 'minimal') {
		if (titleText) {
			return titleText;
		}
		return title?.rendered;
	} else {
		return titleText;
	}
};

// used for formatting the 'heroMinimal' object in all of the page templates.
export const createHeroMinimalObject = (heroMinimal, title, heroType) => {
	const {
		prehead_type,
		prehead_text,
		description,
		title_type,
		title_text,
		background_image,
		background_type,
		background_color,
		background_pattern,
	} = heroMinimal || {};
	return {
		__typename: 'Page_Pageheader_HeroMinimal',
		preheadType: prehead_type || 'default',
		preheadText: prehead_text || null,
		description: description || null,
		titleType: title_type || 'default',
		titleText: handleHeroMinimalTitleText(heroType, title_text, title),
		backgroundImage: {
			__typename: 'Page_Pageheader_HeroMinimal_BackgroundImage',
			image: background_image?.image?.url
				? {
						__typename: 'MediaItem',
						altText: '',
						mediaItemUrl: background_image?.image?.url,
				  }
				: null,
			mobileImage: background_image?.mobile_image?.url
				? {
						__typename: 'MediaItem',
						altText: '',
						mediaItemUrl: background_image?.mobile_image?.url,
				  }
				: null,
		},
		backgroundType: background_type || null,
		backgroundColor: background_color || null,
		backgroundPattern: background_pattern || null,
	};
};

// used for formatting the 'pageFooter' object in all of the page templates.
export const createPageFooterObject = (callToActionSetting, callToActionGroup) => {
	return {
		__typename: 'Page_Pagefooter',
		callToActionSettings: callToActionSetting ?? 'global',
		callToActionGroup: {
			__typename: 'Page_Pagefooter_CallToActionGroup',
			backgroundColor: callToActionGroup?.background_color || null,
			backgroundPattern: callToActionGroup?.background_pattern || 'blaze_pattern',
			backgroundType: callToActionGroup?.background_type || 'pattern',
			backgroundImage: {
				__typename: 'Page_Pagefooter_CallToActionGroup_BackgroundImage',
				image: {
					__typename: 'MediaItem',
					mediaItemUrl: callToActionGroup?.background_image.image.url ?? null,
					altText: callToActionGroup?.background_image.image.alt ?? null,
				},
				mobileImage: {
					__typename: 'MediaItem',
					mediaItemUrl: callToActionGroup?.background_image.mobile_image.url ?? null,
					altText: callToActionGroup?.background_image.mobile_image.alt ?? null,
				},
			},
			description: callToActionGroup?.description || null,
			paddingBottom: callToActionGroup?.padding_bottom || 'default',
			paddingTop: callToActionGroup?.padding_top || 'default',
			titleText: callToActionGroup?.title_text || null,
			actions: formatActions(callToActionGroup?.actions, 'Page_Pagefooter_CallToActionGroup_actions'),
		},
	};
};

// Used for formatting, translations similarly to GraphQL, and used in (formatWPTranslated).
const formatTranslations = (formattedArray, targetLocale) => {
	if (!formattedArray || !Array.isArray(formattedArray) || formattedArray.length === 0) return [];
	const defaultLocale = 'en_US';
	return formattedArray.map((item) => {
		const { locale, id } = item;
		const isTargetLocale = locale === targetLocale;

		return {
			__typename: 'Translation',
			locale: isTargetLocale ? defaultLocale : locale,
			id: isTargetLocale ? null : (id && id.toString()) || null,
		};
	});
};

// Used for formatting, translated similarly to GraphQL, and used in (formatWPTranslated).
const formatTranslated = (formattedArray, targetLocale) => {
	if (!formattedArray || !Array.isArray(formattedArray) || formattedArray.length === 0) return [];

	return formattedArray.map((item) => {
		const isTargetLocale = item?.locale === targetLocale;
		const uri = isTargetLocale ? extractExactPathNameEN(item?.href, targetLocale) : extractPathname(item?.href);
		return {
			__typename: 'Page',
			slug: item.slug,
			locale: {
				__typename: 'Locale',
				locale: isTargetLocale ? 'en_US' : item?.locale,
			},
			uri: handleHomePageUri(uri),
		};
	});
};

//  used for formatting the 'translated' in all of the page templates.
export const formatWPTranslated = (wpTranslations, locale) => {
	if (!wpTranslations || Array.isArray(wpTranslations)) return wpTranslations || null;
	const formattedArray = Object.values(wpTranslations) || [];

	if (formattedArray.length === 1 && formattedArray[0]?.status === 'draft') {
		return [
			{
				__typename: 'Page',
				uri: null,
				translations: [],
				locale: { __typename: 'Locale', locale: locale },
				translated: [],
			},
		];
	}

	return formattedArray
		.filter(({ status }) => status === 'publish')
		.map((item) => ({
			__typename: 'Page',
			uri: handleHomePageUri(extractPathname(item?.href)),
			translations: formatTranslations(formattedArray, item?.locale),
			locale: {
				__typename: 'Locale',
				locale: item?.locale,
			},
			translated: formatTranslated(formattedArray, item?.locale),
		}));
};
