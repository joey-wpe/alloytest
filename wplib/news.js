import { fetchAllResultFromAllLangs, getRestData, getPublishedDataBySlug, getPublishedOrPreviewData } from './util';
import { transformNewsRestToJson } from '../data-mediators/FormatNewsRestToJson';

export async function getNewsYears() {
	const data = await getRestData(`${process.env.BACKEND_SERVER}/wp-json/wp/v2/news?_fields=date&per_page=1`);

	const newsData = transformNewsRestToJson(data, 'list');

	return {
		newsData,
	};
}

export function mapPageData(page = {}) {
	const data = { ...page };
	return data;
}

export async function getAllNews() {
	const data = await fetchAllResultFromAllLangs(
		`${process.env.BACKEND_SERVER}/wp-json/wp/v2/news?_fields=title,slug,date,id,link,wpml_current_locale,acf.external_resource,uri,acf.url_of_resource,acf.publish_display_date&per_page=100`
	);

	const newsData = transformNewsRestToJson(data, 'list');

	const news = newsData?.data.allNews.nodes.map(mapPageData);

	return {
		news,
	};
}

export async function getPublishedNewsDataBySlug(slug, locale) {
	const data = await getPublishedDataBySlug('news', slug, locale);
	return appendRelativeDataToNews(data, locale);
}

export async function getPreviewNewsDataByDatabaseID(id, token, locale) {
	const isPreview = true;
	const data = await getPublishedOrPreviewData('news', id, isPreview, token, locale);
	return appendRelativeDataToNews(data, locale);
}

async function appendRelativeDataToNews(data, locale) {
	if (!data) {
		throw new Error('news - No data received from WordPress API.');
	}
	const news = transformNewsRestToJson(data, 'page');

	return {
		news,
		translated: news?.translated,
	};
}
