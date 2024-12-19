
const fs = require('fs').promises;
const GlobalConstants = require('../GlobalConstants');
const transformRestToJson = require('../data-mediators/FormatRestToJson');

const { loadEnvConfig } = require('@next/env');

loadEnvConfig(process.cwd());

console.log('Running script: filter-json-generator.js');

async function generateJsonFiles() {
	if (process.env.STORYBOOK_ENV === 'true') {
		console.log('Skipping JSON generator on Storybook environment.');
		return;
	}

	const backendUrl = process.env.BACKEND_SERVER;
	console.log('Fetching newstype data');

	const allLanguagesNewsTypeData = [];

	try {
		for (const locale of GlobalConstants.Locales) {
			const newstypeRestUrl = `${backendUrl}/wp-json/wp/v2/newstype?_fields=id,title,link,slug&wpml_language=${locale}`;
			const newstypeData = await fetchAllRest(newstypeRestUrl);
			allLanguagesNewsTypeData.push(...newstypeData);
		}
	} catch (error) {
		console.error('Error fetching news type data:', error);
		throw error;
	}

	async function generateJSONFileREST(url, locale, filename, dataType) {
		try {
			let response = await fetchAllRest(`${url}&wpml_language=${locale}`);

			if (!['logos', 'testimonials'].includes(dataType)) {
				console.log(`Generating '${filename}' JSON file`);
				const transformedResponse = transformRestToJson(response, dataType);
				const postJSON = JSON.stringify(transformedResponse);
				await fs.writeFile(filename, postJSON);
			}

			if (['resources', 'logos', 'caseStudies', 'testimonials', 'posts'].includes(dataType)) {
				const dataTypePost = dataType === 'posts' ? 'blog' : dataType;
				const postTypeFileName =
					locale === 'en' ? `public/${dataTypePost}-posts.json` : `public/${dataTypePost}-posts-${locale}.json`;
				console.log(`Generating additional '${postTypeFileName}' JSON file`);
				await fs.writeFile(postTypeFileName, JSON.stringify(response));
			}
		} catch (error) {
			console.error(`Error generating '${filename}' JSON file:`, error);
			throw error;
		}
	}

	async function generateJSONFilesREST(url, filenamePart) {
		const promises = GlobalConstants.Locales.map(async (language) => {
			const fileName = language === 'en' ? `public/${filenamePart}.json` : `public/${filenamePart}-${language}.json`;

			if (filenamePart === 'news' || filenamePart === 'press') {
				const baseSlug = filenamePart === 'news' ? 'in-the-news' : 'press-releases';
				const slug = language === 'en' ? baseSlug : `${baseSlug}-${language}`;

				const findWithSlug = allLanguagesNewsTypeData.find((typeData) => typeData.slug === slug);

				if (findWithSlug && findWithSlug.id) {
					url = `${backendUrl}/wp-json/wp/v2/news?newstype=${findWithSlug.id}&_fields=title,excerpt,date,id,link,wpml_current_locale,acf.external_resource,uri,acf.url_of_resource,acf.publish_display_date&per_page=50`;
				} else {
					console.log(`Generating empty nodes '${fileName}' JSON file`);
					const json = {
						__typename: 'RootQueryToNewstypeConnection',
						nodes: [{ __typename: 'Newstype', news: { __typename: 'NewstypeToNewsConnection', nodes: [] } }],
					};
					return await fs.writeFile(fileName, JSON.stringify(json));
				}
			}
			return generateJSONFileREST(url, language, fileName, filenamePart);
		});
		await Promise.all(promises);
	}

	async function fetchAllRest(endpoint, page = 1, results = []) {
		const response = await fetch(`${endpoint}&page=${page}`, { method: 'GET' });
		const data = await response.json();
		results.push(...data);
		const totalPages = response.headers.get('x-wp-totalpages');
		if (page < totalPages) {
			return fetchAllRest(endpoint, page + 1, results);
		} else {
			return results;
		}
	}

	const allRestUrls = [
		{
			type: 'resources',
			endpoint:
				'/wp-json/wp/v2/resource?_fields=id,date,title,type,excerpt,featured_media_src,featured_media,link,slug,content,uri,post_type_terms,wpml_current_locale,acf.exclude_from_archive_page&per_page=50',
		},
		{
			type: 'partners',
			endpoint:
				'/wp-json/wp/v2/partner?_fields=id,date,title,excerpt,featured_media_src,featured_media,link,slug,uri,post_type_terms,wpml_current_locale,acf&per_page=50',
		},
		{
			type: 'caseStudies',
			endpoint:
				'/wp-json/wp/v2/case_study?_fields=id,date,title,type,excerpt,featured_media_src,acf,featured_media,link,slug,uri,post_type_terms,wpml_current_locale&per_page=50',
		},
		{
			type: 'news',
			endpoint: '',
		},
		{
			type: 'posts',
			endpoint:
				'/wp-json/wp/v2/posts?_fields=id,date,title,excerpt,featured_media_src,featured_media,link,slug,uri,post_type_terms,wpml_current_locale,acf&per_page=50',
		},
		{
			type: 'press',
			endpoint: '',
		},
		{
			type: 'learn',
			endpoint:
				'/wp-json/wp/v2/learn?_fields=id,date,title,excerpt,featured_media_src,featured_media,link,slug,uri,post_type_terms,wpml_current_locale&per_page=50',
		},
		{
			type: 'events',
			endpoint:
				'/wp-json/wp/v2/events?_fields=id,date,title,excerpt,featured_media_src,featured_media,link,slug,uri,post_type_terms,wpml_current_locale,acf&per_page=50',
		},
		{
			type: 'exploreProducts',
			endpoint:
				'/wp-json/wp/v2/explore_products?_fields=id,date,title,excerpt,featured_media_src,featured_media,link,slug,uri,post_type_terms,wpml_current_locale&per_page=50',
		},
		{
			type: 'testimonials',
			endpoint: '/wp-json/wp/v2/testimonial?_fields=id,title,type,link,acf&per_page=50',
		},
		{
			type: 'logos',
			endpoint: '/wp-json/wp/v2/logo?_fields=id,link,acf,type&per_page=50',
		},
	];

	for (const { type, endpoint } of allRestUrls) {
		const completeEndpoint = `${backendUrl}${endpoint}`;
		try {
			await generateJSONFilesREST(completeEndpoint, type);
		} catch (error) {
			console.error(`Error generating JSON files for endpoint '${endpoint}' and type '${type}':`, error.message);
			process.exit(1); // Exit with a non-zero status code to fail the build
		}
	}
}

// Run the script
generateJsonFiles();
