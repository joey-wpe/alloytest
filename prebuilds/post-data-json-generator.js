const fetch = require('node-fetch');
const fs = require('fs').promises;
const transformPostQueryRestToJson = require('../data-mediators/FormatPostQueryRestToJson.js');
const GlobalConstants = require('../GlobalConstants.js');

const { loadEnvConfig } = require('@next/env');

loadEnvConfig(process.cwd());

console.log('Running script: post-data-json-generator.js');

async function generateJsonFiles() {
	if (process.env.STORYBOOK_ENV === 'true') {
		console.log('Skipping JSON generator on Storybook environment.');
		return;
	}

	const locales = GlobalConstants.Locales;
	const postTypes = [
		{
			type: 'resources',
			endpoint:
				'/wp-json/wp/v2/resource?per_page=5&_fields=id,title,excerpt,featured_media_src,featured_media,link,slug,uri,wpml_current_locale',
		},
		{
			type: 'partners',
			endpoint:
				'/wp-json/wp/v2/partner?per_page=5&_fields=id,title,excerpt,featured_media_src,featured_media,link,slug,uri,wpml_current_locale,acf',
		},
		{
			type: 'caseStudies',
			endpoint: '/wp-json/wp/v2/case_study?per_page=5',
		},
		{
			type: 'news',
			endpoint:
				'/wp-json/wp/v2/news?per_page=5&_fields=id,title,excerpt,featured_media_src,featured_media,link,slug,uri,wpml_current_locale,acf',
		},
		{
			type: 'posts',
			endpoint:
				'/wp-json/wp/v2/posts?per_page=5&_fields=id,title,excerpt,featured_media_src,featured_media,link,slug,uri,wpml_current_locale,acf',
		},
		{
			type: 'learn',
			endpoint: '/wp-json/wp/v2/learn?per_page=5&_fields=id,title,excerpt,featured_media_src,featured_media,uri',
		},
		{
			type: 'testimonials',
			endpoint: '/wp-json/wp/v2/testimonial?per_page=5',
		},
	];

	const postTypeData = {};

	try {
		await Promise.all(
			locales.map(async (locale) => {
				postTypeData[locale] = {};
				for (const { type, endpoint } of postTypes) {
					console.log(`Querying endpoint: ${endpoint}, locale: ${locale}`);
					try {
						const response = await fetch(`${process.env.BACKEND_SERVER}${endpoint}&wpml_language=${locale}`, {
							method: 'GET',
						});
						if (!response.ok) {
							throw new Error(`Error fetching ${type} data for locale ${locale}. Status: ${response.status}`);
						}
						const postData = await response.json();
						postTypeData[locale][`${type}Query`] = transformPostQueryRestToJson(postData, type);
					} catch (error) {
						console.error(`Error fetching ${type} data for locale ${locale}:`, error.message);
						throw new Error(`Error fetching ${type} data for locale ${locale}:`, error.message);
					}
				}
			})
		);

		await Promise.all(
			locales.map(async (locale) => {
				const postsDataJSON = JSON.stringify(postTypeData[locale], null, 2); // Pretty-print JSON
				//const fileName = locale === 'en' ? 'public/recentPosts.json' : `public/recentPosts-${locale}.json`;
				console.log(`Generating file: ${fileName}`);
				await fs.writeFile(fileName, postsDataJSON);
			})
		);

		console.log('Post-data generator: generating files completed!');
	} catch (error) {
		console.error('JSON Generator encountered an error:', error.message);
		process.exit(1); // Exit with non-zero status code to indicate failure
	}
}

// Run the script
generateJsonFiles();
