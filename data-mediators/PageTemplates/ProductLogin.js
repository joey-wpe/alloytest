import {
	createSeoObject,
	createAlertGroupObject,
	createHeroObject,
	createHeroMinimalObject,
	createPageFooterObject,
	formatWPTranslated,
} from '../PageTemplateHelpers/moleculeHelpers';

const createProductLoginFields = (acf = {}) => {
	const {
		title_text,
		prehead_text,
		prehead_type,
		title_type,
		description,
		link,
		site_url,
		trial,
		custom_links,
		product_logo,
	} = acf;

	const mapLink = (link) => ({
		__typename: 'AcfLink',
		target: link?.target ?? null,
		title: link?.title ?? null,
		url: link?.url ?? null,
	});

	const mapCustomLinks = (links) =>
		links.map(({ link }) => ({
			__typename: 'Template_ProductLogin_Productloginfields_customLinks',
			link: mapLink(link),
		}));

	return {
		__typename: 'Template_ProductLogin_Productloginfields',
		titleText: title_text ?? null,
		preheadText: prehead_text ?? null,
		preheadType: prehead_type ?? null,
		titleType: title_type ?? null,
		description: description ?? null,
		link: mapLink(link),
		siteUrl: site_url ?? null,
		trial: {
			__typename: 'Template_ProductLogin_Productloginfields_Trial',
			trialText: trial?.trial_text ?? null,
			trialCta: mapLink(trial?.trial_cta),
		},
		customLinks: custom_links && custom_links.length > 0 && mapCustomLinks(custom_links),
		productLogo: {
			__typename: 'MediaItem',
			altText: product_logo?.alt ?? null,
			mediaItemUrl: product_logo?.url ?? null,
		},
	};
};

export const formatProductLoginTemplate = (restResponse, template, locale, postTypeData) => {
	if (!restResponse) return null;
	const { id, slug, title, uri, yoast_head, yoast_head_json, acf, wpml_translations } = restResponse || {};
	const { hero, hero_minimal, alert_settings, call_to_action_settings, call_to_action_group, hero_type } = acf || {};
	return {
		page: {
			__typename: 'Page',
			seo: createSeoObject(yoast_head_json, yoast_head),
			pageHeader: {
				__typename: 'Page_Pageheader',
				alertSettings: alert_settings ?? null,
				alertgroup: createAlertGroupObject(acf),
				heroType: hero_type ?? null,
				hero: createHeroObject(hero),
				heroMinimal: createHeroMinimalObject(hero_minimal, title, hero_type),
			},
			pageFooter: createPageFooterObject(call_to_action_settings, call_to_action_group),
			isPreview: false,
			id: id ?? null,
			slug: slug ?? null,
			title: title?.rendered ?? null,
			uri: uri ?? null,
			template: {
				__typename: 'Template_ProductLogin',
				templateName: template,
				productLoginFields: createProductLoginFields(acf),
			},
		},
		translated: formatWPTranslated(wpml_translations, locale),
		postTypeData: { postTypes: {}, ...postTypeData },
	};
};
