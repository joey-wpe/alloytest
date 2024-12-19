const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fs = require('fs').promises;

const { loadEnvConfig } = require('@next/env');

loadEnvConfig(process.cwd());

const username = process.env.WP_REST_USER;
const password = process.env.WP_REST_PASS;

console.log('Running script: generate-redirects.js');

// REDIRECTION_FIELD_ISSUE:: it was noticed that the `match_url` field from redirection was always lowercase, which caused
// some redirects not to work (as redirects should be case sensitive as URL routes are case sensitive). So we switched from
// using the `match_url` field to instead use the `url` field, however that field did not properly URL encode the url. As
// such, we created this helper method to manually manipulate the urls to match the previous redirects as close as possible.
function cleanUrl(url) {
	// trim the trailing slash if there is one
	if (url.endsWith('/')) {
		url = url.slice(0, url.length - 1);
	}

	// split on slashes, url encode parts, put back together
	var modifiedParts = [];
	var urlParts = url.split('/');
	urlParts.forEach((part) => {
		modifiedParts.push(encodeURIComponent(part));
	});

	url = modifiedParts.join('/');

	// swap out encoded characters that we dont want encoded (ex: /?post_type=tri-event&p=1031422 => /events/)
	url = url.split('%3F').join('?');
	url = url.split('%3D').join('=');
	url = url.split('%26').join('&');

	// encode ' symbol which for some reason aren't encoded
	url = url.split("'").join('%27');
	return url;

}

function startsWithAny(str) {
	return ['/de', '/fr', '/ko', '/ja'].some((prefix) => str?.startsWith(prefix));
}

function extractQueryParams(url) {
	const params = new URLSearchParams(url.split('?')[1]);
	const result = [];
	for (const [key, value] of params) {
		result.push({
			type: 'query',
			key: key,
			value: value,
		});
	}
	return result;
}

async function fetchAllRest(endpoint, perPage = 200, page = 0, results = []) {
	try {
		const response = await fetch(`${endpoint}?per_page=${perPage}&page=${page}`, {
			method: 'GET',
			headers: {
				Authorization: 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const res = await response.json();
		const items = Array.isArray(res?.items) ? res.items : [];
		const formattedItems = items.map((item) => ({
			...item,
			flag_query: item.match_data.source.flag_query,
			action_data: item.action_data.url,
		}));
		results.push(...formattedItems);
		const totalPages = Math.ceil(Number(res.total) / perPage);
		console.log(`fetching redirect for page `, page);
		if (page < totalPages) {
			return fetchAllRest(endpoint, perPage, page + 1, results);
		} else {
			return results;
		}
	} catch (error) {
		console.error('redirects plugin - fetchAllRest - error:', error);
		throw error;
	}
}

const generateRedirects = async () => {
	try {
		const redirectRestAPIEndpoint = `${process.env.BACKEND_SERVER}/wp-json/redirection/v1/redirect`;
		const redirectData = await fetchAllRest(redirectRestAPIEndpoint);
		const redirectArray = redirectData.map((redirect) => {
			let redirectQueryRule = {};
			if (redirect.flag_query === 'exact' && redirect.url.includes('?')) {
				redirectQueryRule.has = extractQueryParams(redirect.url);
			}
			return {
				source: redirect.url,
				destination: redirect.action_data,
				permanent: true,
				...redirectQueryRule,
			};
		});
		console.log('Redirect: query news redirect data');
		const newsRestAPIEndpoint = `${process.env.BACKEND_SERVER}/wp-json/wp/v2/news?_fields=id,title,link,slug,acf.external_resource,acf.url_of_resource&per_page=100`;
		async function fetchAllNews(page = 1, results = []) {
			const response = await fetch(`${newsRestAPIEndpoint}&page=${page}`, {
				method: 'GET',
				headers: new fetch.Headers({
					Authorization: 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
					'Content-Type': 'application/x-www-form-urlencoded',
				}),
			});
			const data = await response.json();
			results.push(...data);
			const totalPages = response.headers.get('x-wp-totalpages');
			if (page < totalPages) {
				return fetchAllNews(page + 1, results);
			} else {
				return results;
			}
		}
		const allNews = await fetchAllNews();
		const newsArray = allNews
			.filter(function (newsItem) {
				return newsItem.acf.external_resource !== undefined && newsItem.acf.external_resource !== false;
			})
			.map((newsItem) => {
				return {
					source: newsItem.link.replace(process.env.BACKEND_SERVER, ''),
					destination: newsItem.acf.url_of_resource,
					permanent: true,
				};
			});
		const allRedirectArray = redirectArray.concat(newsArray);
		const finalArray = [];
		allRedirectArray.map((redirect) => {
			if (redirect.source.startsWith('^')) {
				console.log(`ignoring redirect (^ regex): ${redirect.source} => ${redirect.destination}`);
			} else if (redirect.destination === '*') {
				console.log(`ignoring redirect (*): ${redirect.source} => ${redirect.destination}`);
			} else if (redirect.destination.startsWith('a:')) {
				console.log(`ignoring redirect (a:): ${redirect.source} => ${redirect.destination}`);
			} else {
				redirect.source = cleanUrl(redirect.source)?.split('?')[0];
				if (startsWithAny(redirect.source)) {
					redirect.locale = false;
				}
				finalArray.push(redirect);
			}
		});
		
        await fs.writeFile('public/redirects.json', JSON.stringify(finalArray));

		console.log('onPreBuild: END general redirect generation');
	} catch (error) {
		console.error('Error during redirect generation:', error);
		process.exit(1); // Exit with error code to fail the build
	}
};

// Run the script
generateRedirects();