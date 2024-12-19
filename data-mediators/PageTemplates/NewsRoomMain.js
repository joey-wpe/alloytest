import {
	createSeoObject,
	createAlertGroupObject,
	createHeroObject,
	createHeroMinimalObject,
	formatWPTranslated,
	createPageFooterObject,
} from '../PageTemplateHelpers/moleculeHelpers';

const formatNewsRewards = (awards) => {
	if (!awards || !awards.length === 0) return null;
	return awards.map(({ award }) => {
		const { award_logo, award_year, award_info_line_1, award_info_line_2 } = award;
		return {
			__typename: 'Template_NewsroomMain_Templatenewsroommain_awards',
			award: {
				__typename: 'Template_NewsroomMain_Templatenewsroommain_awards_Award',
				awardLogo: {
					__typename: 'MediaItem',
					altText: award_logo?.alt || '',
					mediaItemUrl: award_logo?.url || null,
				},
				awardYear: award_year || null,
				awardInfoLine1: award_info_line_1 || null,
				awardInfoLine2: award_info_line_2 || null,
			},
		};
	});
};

const formatNewsMedia = (newsMedia) => {
	if (!newsMedia || !newsMedia.length === 0) return null;
	return newsMedia.map(({ media_kit_download_link, media_kit_logo }) => {
		return {
			__typename: 'Template_NewsroomMain_Templatenewsroommain_media',
			mediaKitDownloadLink: {
				__typename: 'AcfLink',
				target: media_kit_download_link?.target || '',
				title: media_kit_download_link?.title || null,
				url: media_kit_download_link?.url || null,
			},
			mediaKitLogo: {
				__typename: 'MediaItem',
				altText: media_kit_logo?.alt || '',
				mediaItemUrl: media_kit_logo?.url || '',
			},
		};
	});
};

export const formatNewsroomMainTemplate = (restResponse, template, locale, postTypeData) => {
	if (!restResponse) return null;
	const {
		id,
		slug,
		title,
		uri,
		yoast_head,
		yoast_head_json,
		acf,
		wpml_translations,
		news_post_type = {},
	} = restResponse || {};
	const {
		hero,
		alert_settings,
		hero_type,
		hero_minimal,
		awards,
		media,
		social_media_disruptor,
		call_to_action_settings,
		call_to_action_group,
	} = acf || {};

	return {
		page: {
			__typename: 'Page',
			seo: createSeoObject(yoast_head_json, yoast_head),
			pageHeader: {
				__typename: 'Page_Pageheader',
				alertSettings: alert_settings ?? 'global',
				alertgroup: createAlertGroupObject(acf),
				heroType: hero_type ?? null,
				hero: createHeroObject(hero),
				heroMinimal: createHeroMinimalObject(hero_minimal, title, hero_type),
			},
			isPreview: false,
			id: id ?? null,
			slug: slug ?? null,
			title: title?.rendered ?? null,
			uri: uri ?? null,
			template: {
				__typename: 'Template_NewsroomMain',
				templateName: template,
				templateNewsroomMain: {
					__typename: 'Template_NewsroomMain_Templatenewsroommain',
					awards: formatNewsRewards(awards),
					media: formatNewsMedia(media),
					socialMediaDisruptor: social_media_disruptor || null,
					footerCTA: call_to_action_group
						? createPageFooterObject(call_to_action_settings, call_to_action_group)
						: null,
				},
			},
		},
		translated: formatWPTranslated(wpml_translations, locale),
		postTypeData: { postTypes: news_post_type, ...postTypeData },
	};
};
