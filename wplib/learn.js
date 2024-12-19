import { transformLearnRestToJson } from '../data-mediators/FormatLearnRestToJson';
import { fetchAllRest, getPostTypeData, getRestData, getPublishedDataBySlug, getPublishedOrPreviewData } from './util';

import GlobalConstants from '../GlobalConstants';

//By default Wordpress Rest API is orderby DATE DESC so we can use the same query for both Get all learn and get recent learn pages
const learnRestAPIEndpoint = `${process.env.BACKEND_SERVER}/wp-json/wp/v2/learn?_fields=title,excerpt,date,id,primary_category_id,link,wpml_current_locale,acf.external_resource,uri,acf.url_of_resource,acf.publish_display_date`;

// TODO:: see if this can be swapped to use fetchAllResultFromAllLangs like other wplib helpers do
export async function getAllLearnPagesRestLang(page = 1, results = [], locale) {
	const localeQuery = locale ? `&wpml_language=${locale}` : '';

	// NOTE:: This doesn't use getRestData as it needs to read the response headers below
	const response = await fetch(`${learnRestAPIEndpoint}&per_page=100&page=${page}&${localeQuery}`, {
		method: 'GET',
	});
	const data = await response.json();
	results.push(...data);

	const totalPages = response.headers.get('x-wp-totalpages');
	if (page < totalPages) {
		return getAllLearnPagesRestLang(page + 1, results, locale);
	} else {
		const transformedData = transformLearnRestToJson(results, 'list');
		return transformedData.data.allLearn.nodes;
	}
}

export async function getAllLearnPagesRest() {
	const globalLanguages = GlobalConstants.Locales;
	const allPages = [];
	for (const lang of globalLanguages) {
		allPages.push(...(await getAllLearnPagesRestLang(...Array(2), lang)));
	}
	return allPages;
}

export async function getRecentLearnPages() {
	const data = await getRestData(
		`${learnRestAPIEndpoint}&per_page=${GlobalConstants.Options.BlogPartialLimit}&page=${page}`
	);

	return {
		data,
	};
}

export async function getPublishedLearnDataBySlug(slug, locale) {
	const data = await getPublishedDataBySlug('learn', slug, locale, '_embed');

	return appendRelativeDataToLearn(data, locale);
}

export async function getPreviewLearnDataByDatabaseID(id, token, locale) {
	const isPreview = true;
	const data = await getPublishedOrPreviewData('learn', id, isPreview, token, locale, '_embed');

	return appendRelativeDataToLearn(data, locale);
}

async function appendRelativeDataToLearn(data, locale) {
	if (!data) {
		throw new Error('Learn - No data received from WordPress API.');
	}

	// check for author and fetch author data
	if (data.acf.author?.length > 0 ?? data.acf.author[0]?.ID) {
		const authorData = await getRestData(`${process.env.BACKEND_SERVER}/wp-json/wp/v2/author/${data.acf.author[0].ID}`);
		data.acf.author = authorData;
	}

	const embeddedData = data?._embedded && data._embedded['wp:term'];
	if (embeddedData && Array.isArray(embeddedData[0])) {
		const learnTypes = embeddedData[0];
		data.categoryNodes = learnTypes.map((type) => ({
			__typename: 'Category',
			databaseId: type.id,
			name: type.name,
			slug: type.slug,
		}));
	}

	// check for form and fetch form data
	if (data.acf?.modules?.length > 0) {
		for (const module of data.acf.modules) {
			if (module.acf_fc_layout === 'form') {
				const formData = await getRestData(
					`${process.env.BACKEND_SERVER}/wp-json/wp/v2/form/${module.form_select_form.ID}`
				);
				module.form_select_form = formData;
				if (module.form_next_form?.ID) {
					const nextFormData = await getRestData(
						`${process.env.BACKEND_SERVER}/wp-json/wp/v2/form/${module.form_next_form.ID}`
					);
					module.form_next_form.form_id = nextFormData?.acf?.form_id;
					module.form_next_form.form_title = nextFormData?.acf?.form_title;
				}
			}
		}
	}

	const learnDataTransformed = transformLearnRestToJson(data, 'page');
	const post = learnDataTransformed;
	const postTypeData = await getPostTypeData(locale);

	return {
		post,
		postTypeData,
		translated: post?.translated,
	};
}

export async function getLearnTopicBySlug(slug) {
	try {
		const topicData = await getRestData(`${process.env.BACKEND_SERVER}/wp-json/wp/v2/learntype?slug=${slug}`);
		if (!topicData) {
			throw new Error(`No data found for topic with slug '${slug}'`);
		}

		const transformedData = transformLearnRestToJson(topicData[0], 'topicPage');

		return transformedData;
	} catch (error) {
		console.error('Error [getLearnTopicBySlug]', error);
		throw error;
	}
}

export async function getAllLearnTopics() {
	try {
		const data = await getRestData(`${process.env.BACKEND_SERVER}/wp-json/wp/v2/learntype`);
		return { data };
	} catch (error) {
		console.error('Error [getAllLearnTopics]', error);
		throw error;
	}
}

export async function getPostsForTopic(id, locale = GlobalConstants.DefaultLocale) {
	// Adjust locale if 'en-US' is passed
	if (locale === 'en-US') {
		locale = 'en';
	}
	try {
		const url = `${process.env.BACKEND_SERVER}/wp-json/wp/v2/learn?learntype=${id}&wpml_language=${locale}`;
		const response = await fetchAllRest(url);

		if (!response) {
			throw new Error(`Failed to fetch data`);
		}

		const transformedData = transformLearnRestToJson(response, 'list');

		if (!transformedData?.data?.allLearn?.nodes) {
			throw new Error('No posts found.');
		}

		const finalPosts = transformedData.data.allLearn.nodes;
		return finalPosts;
	} catch (error) {
		console.error('Error [getPostsForTopics]', error);
		throw error;
	}
}
