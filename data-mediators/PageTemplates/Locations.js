import {
	createSeoObject,
	createAlertGroupObject,
	createHeroObject,
	createHeroMinimalObject,
	createPageFooterObject,
	formatWPTranslated,
} from '../PageTemplateHelpers/moleculeHelpers';

const createContentBlocksRegions = (regions) => {
	if (!regions || !Array.isArray(regions) || regions.length === 0) return null;

	return regions.map(({ region_name, locations }) => {
		return {
			__typename: 'ContentTemplate_Contentblockslocations_regions',
			regionName: region_name ?? null,
			locations:
				Array.isArray(locations) && locations.length > 0
					? locations.map(({ address, city, country, email, fax, location_name, phone }) => ({
							__typename: 'ContentTemplate_Contentblockslocations_regions_locations',
							address: address || null,
							city: city || null,
							country: country || null,
							email: email || null,
							fax: fax || null,
							locationName: location_name || null,
							phone: phone || null,
					  }))
					: [],
		};
	});
};

export const formatLocationsTemplate = (restResponse, template, locale, postTypeData) => {
	if (!restResponse) return null;
	const { id, slug, title, uri, yoast_head, yoast_head_json, acf, wpml_translations } = restResponse || {};
	const { hero, hero_minimal, alert_settings, call_to_action_settings, call_to_action_group, regions, hero_type } =
		acf || {};
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
				__typename: 'Template_Locations',
				templateName: template,
				contentBlocksLocations: {
					__typename: 'ContentTemplate_Contentblockslocations',
					regions: createContentBlocksRegions(regions),
				},
			},
		},
		translated: formatWPTranslated(wpml_translations, locale),
		postTypeData: { postTypes: {}, ...postTypeData },
	};
};
