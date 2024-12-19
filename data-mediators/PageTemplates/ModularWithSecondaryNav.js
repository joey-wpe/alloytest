import {
	createSeoObject,
	createAlertGroupObject,
	createHeroObject,
	createHeroMinimalObject,
	createPageFooterObject,
	formatWPTranslated,
} from '../PageTemplateHelpers/moleculeHelpers';

import { createContentBlocksModules } from '../PageTemplateHelpers/flexTemplateHelpers';

const formatLogo = (logo) => {
	if (!logo || !logo.url) return null;
	return {
		__typename: 'MediaItem',
		altText: logo?.alt ?? null,
		mediaItemUrl: logo?.url ?? null,
	};
};

const formatNavItems = (navItems) => {
	if (!Array.isArray(navItems) || navItems.length === 0) return null;
	return navItems.map((navItem) => {
		return {
			__typename: 'Template_ModularWithSecondaryNav_Modulesecondarynav_navItems',
			linkText: navItem?.link_text ?? null,
			linkUrl: navItem?.link_url ?? null,
			openLinkInANewTab: navItem?.open_link_in_a_new_tab?.length > 0 ? navItem?.open_link_in_a_new_tab : null,
		};
	});
};

const formatOrangeCta = (orangeCta) => {
	return {
		__typename: 'Template_ModularWithSecondaryNav_Modulesecondarynav_OrangeCta',
		adaText: orangeCta?.ada_text || null,
		function: orangeCta?.function || 'default',
		seoText: orangeCta?.seo_text || null,
		link: orangeCta?.link?.url
			? {
					__typename: 'AcfLink',
					target: orangeCta?.link?.target || '',
					title: orangeCta?.link?.title || null,
					url: orangeCta?.link?.url || null,
			  }
			: null,
	};
};

const formatOutlinedCta = (outlinedCta) => {
	return {
		__typename: 'Template_ModularWithSecondaryNav_Modulesecondarynav_OutlinedCta',
		adaText: outlinedCta?.ada_text ?? null,
		function: outlinedCta?.function ?? 'default',
		seoText: outlinedCta?.seo_text ?? null,
		link: outlinedCta?.link?.url
			? {
					__typename: 'AcfLink',
					target: outlinedCta?.link?.target || '',
					title: outlinedCta?.link?.title || null,
					url: outlinedCta?.link?.url || null,
			  }
			: null,
	};
};

export const formmatModularWithSecondaryNavTemplate = (restResponse, template, locale, postTypeData) => {
	if (!restResponse) return null;
	const { id, slug, title, uri, yoast_head, yoast_head_json, acf, wpml_translations } = restResponse || {};
	const {
		hero,
		alert_settings,
		call_to_action_settings,
		call_to_action_group,
		hero_type,
		hero_minimal,
		display_cta,
		logo,
		nav_items,
		orange_cta,
		outlined_cta,
		modules,
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
			pageFooter: createPageFooterObject(call_to_action_settings, call_to_action_group),
			isPreview: false,
			id: id ?? null,
			slug: slug ?? null,
			title: title?.rendered ?? null,
			uri: uri ?? null,
			template: {
				__typename: 'Template_ModularWithSecondaryNav',
				templateName: template,
				moduleSecondaryNav: {
					__typename: 'Template_ModularWithSecondaryNav_Modulesecondarynav',
					displayCta: display_cta ?? 'no',
					logo: formatLogo(logo),
					navItems: formatNavItems(nav_items),
					orangeCta: formatOrangeCta(orange_cta),
					outlinedCta: formatOutlinedCta(outlined_cta),
				},
			},
			contentBlocksModules: createContentBlocksModules(modules),
		},
		translated: formatWPTranslated(wpml_translations, locale),
		postTypeData: { postTypes: {}, ...postTypeData },
	};
};
