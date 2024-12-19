import { transformPartnersByIDRestToJson } from '../data-mediators/FormatPartnersRestToJson';
import {
	fetchAllResultFromAllLangs,
	getPostTypeData,
	fetchModulePostsDetail,
	getPublishedDataBySlug,
	getPublishedOrPreviewData,
} from './util';

export async function getAllPartners() {
	const partner = await fetchAllResultFromAllLangs(
		`${process.env.BACKEND_SERVER}/wp-json/wp/v2/partner?_fields=id,title,link,slug,uri,wpml_current_locale&per_page=100`
	);
	return partner;
}

export async function getPublishedPartnerDataBySlug(slug, locale) {
	const data = await getPublishedDataBySlug('partner', slug, locale);
	return appendRelativeDataToPartner(data, locale);
}

export async function getPreviewPartnerDataByDatabaseID(id, token, locale) {
	const isPreview = true;
	const data = await getPublishedOrPreviewData('partner', id, isPreview, token, locale);
	return appendRelativeDataToPartner(data, locale);
}

async function appendRelativeDataToPartner(data, locale) {
	if (!data) {
		throw new Error('partners - No data received from WordPress API.');
	}

	// Flex modules
	if (data.acf?.modules?.length > 0) {
		data.acf.modules = await fetchModulePostsDetail(data.acf.modules, locale);
	}

	const partner = transformPartnersByIDRestToJson(data, 'PartnersByID');
	const postTypeData = await getPostTypeData(locale);

	return {
		partner,
		postTypeData,
		translated: partner?.translated,
	};
}
