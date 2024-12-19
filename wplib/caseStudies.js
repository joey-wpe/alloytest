import { transformCaseStudiesByIDRestToJson } from '../data-mediators/FormatCaseStudiesRestToJson';
import {
	fetchAllResultFromAllLangs,
	getPostTypeData,
	fetchModulePostsDetail,
	getPublishedOrPreviewData,
	getPublishedDataBySlug,
} from './util';

export async function getAllCaseStudiesStaticPaths() {
	const caseStudies = await fetchAllResultFromAllLangs(
		`${process.env.BACKEND_SERVER}/wp-json/wp/v2/case_study?_fields=id,title,link,slug,uri,wpml_current_locale&per_page=100`
	);
	return caseStudies;
}

export async function getPublishedCaseStudyDataBySlug(slug, locale) {
	const data = await getPublishedDataBySlug('case_study', slug, locale);
	return appendRelativeDataToCaseStudy(data, locale);
}

export async function getPreviewCaseStudyDataByDatabaseID(id, token, locale) {
	const isPreview = true;
	const data = await getPublishedOrPreviewData('case_study', id, isPreview, token, locale);
	return appendRelativeDataToCaseStudy(data, locale);
}

async function appendRelativeDataToCaseStudy(data, locale) {
	if (!data) {
		throw new Error('caseStudies - No data received from WordPress API.');
	}

	// Flex modules
	if (data.acf?.modules?.length > 0) {
		data.acf.modules = await fetchModulePostsDetail(data.acf.modules, locale);
	}
	const caseStudy = transformCaseStudiesByIDRestToJson(data, 'caseStudiesByID');
	const postTypeData = await getPostTypeData(locale);

	return {
		caseStudy,
		postTypeData,
		translated: caseStudy?.translated,
	};
}
