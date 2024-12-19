import GlobalConstants from '../GlobalConstants';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import path from 'path';

const globalLanguages = GlobalConstants.Locales;
const nonEnglishLanguages = globalLanguages.filter((language) => language !== 'en');
/**
 * decodeHtmlEntities
 */

export function decodeHtmlEntities(text) {
	if (!text) return null;

	const entities = {
		amp: '&',
		lt: '<',
		gt: '>',
		quot: '"',
		apos: "'",
		'#039': "'",
		'#038': '&',
		'#8217': "'",
		// Add more entities if needed
	};

	return text.replace(/&([^;]+);/g, (match, entity) => {
		return entities[entity] || match;
	});
}

export function emptyReturnNull(data) {
	if (data === '' || data == false) data = null;
	return data;
}

/**
 * Description: Use this to convert an iframe into a URL"
 */

export const convertIframeToUrl = (iframeString) => {
	if (!iframeString) return null;

	const idPattern = /embed\/iframe\/([a-zA-Z0-9]+)?/;
	const match = iframeString.match(idPattern);

	return match && match[1] ? `${GlobalConstants.VideoBaseUrl}${match[1]}` : iframeString;
};

/**
 * removeLastTrailingSlash
 */

export function removeLastTrailingSlash(url) {
	if (typeof url !== 'string') return url;
	const afterReplace = url.replace(/\/$/, '');

	// returning an empty string instead of "/" for the root route causes button's text to dissapear and buttons not to work (ex: 404 page)
	if (afterReplace === '') return '/';

	return afterReplace;
}

export function removeExtraSpaces(text) {
	if (typeof text !== 'string') return;
	return text.replace(/\s+/g, ' ').trim();
}

export const isProductionEnvironment = () => {
	const isProductionFrontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL === 'https://hgz3dh8po22gky8sy6ec4aoba.js.wpenginepowered.com';
	const isProductionBackendUrl = process.env.BACKEND_SERVER === 'https://hgz3dh8po22gky8sy6ec4aoba.js.wpenginepowered.com';
	return isProductionFrontendUrl && isProductionBackendUrl;
};

export function formatYear(date) {
	var d = new Date(date),
		year = d.getFullYear();
	return year;
}

export function formatDate(date) {
	const d = new Date(date);
	const month = d.toLocaleString('default', { month: 'short' });
	let day = '' + d.getDate();
	const year = d.getFullYear();
	if (day.length < 2) day = '0' + day;
	return `${month}. ${day}, ${year}`;
}

// Render date as a string to solve timezone difference problem
export function formatStringDate(date) {
	const year = date.split('-')[0];
	let day = date.split('-')[2];
	const month = new Date(date.split('-')[1]).toLocaleString('default', { month: 'short' });
	if (day.length < 2) day = '0' + day;
	return `${month}. ${day}, ${year}`;
}

// split string into arry of objects
/**
 * Function grabbing plain text from text area field and seperating each line to be displayed as a list item.
 * TODO:: I think we can leave this for now but i will change the BE to be a repeater instead of a text area field.
 */
export function splitStringIntoArray(text) {
	let newArray = [];
	newArray = text.split(/\r?\n/);
	let parsedArr = newArray.map((string) => {
		return {
			item: string,
		};
	});
	return parsedArr;
}

// Shorten a string to less than maxLen characters without truncating words.
export function shorten(str, maxLen, separator = ' ') {
	if (!str) return str;
	if (str.length <= maxLen) return str;
	return str.substr(0, str.lastIndexOf(separator, maxLen)) + '...';
}

export function convertWPLocaleToNextJSLocale(locale) {
	const localeMap = GlobalConstants.LanguageMappings;
	return localeMap[locale] || localeMap['en-US'];
}

export function popUrlSegmentsForPathAndLanguages(segments, pathToRemove) {
	if (segments.length > 0 && nonEnglishLanguages.includes(segments[0])) {
		segments.shift(); // pop the front off
	}
	if (pathToRemove) {
		if (segments.length > 0 && segments[0] === pathToRemove) {
			segments.shift(); // pop the front off
		}
	}
	return segments;
}

export const langTransform = (locale) => {
	if (nonEnglishLanguages.includes(locale)) {
		return locale;
	}

	return 'en';
};

export const flagCTAref = (locale) => {
	// If locale is not provided or invalid, return default route
	if (!locale || typeof locale !== 'string') {
		return `/${GlobalConstants.FrontendRoutes.TrialsDemo}/`;
	}
	// Normalize locale to lowercase for easier comparison
	const normalizedLocale = locale.toLowerCase();
	// Check if the locale is English
	if (normalizedLocale.startsWith('en')) {
		return `/${GlobalConstants.FrontendRoutes.TrialsDemo}/`;
	} else {
		return `/${normalizedLocale}/${GlobalConstants.FrontendRoutes.TrialsDemo}/`;
	}
};

export const getHomeUrl = (locale) => {
	if (nonEnglishLanguages.includes(locale)) {
		return `/${locale}`;
	}

	return `/`;
};

export const getRevalidateOptions = () => {
	if (process.env.REVALIDATE_DURATION == -1) {
		// console.log('revalidation: off');
		return {};
	}

	const duration = parseInt(process.env.REVALIDATE_DURATION);
	if (isNaN(duration)) {
		// console.log('revalidation: off (environment variable not set properly)');
		return {};
	}

	// console.log(`revalidation: on, set to ${duration} seconds`);
	return {
		revalidate: duration,
	};
};

export async function fetchAllResultFromAllLangs(endpoint) {
	let results = [];

	for (const locale of globalLanguages) {
		const result = await fetchAllRest(`${endpoint}&lang=${locale}`);
		results.push(...result);
	}

	return results;
}

export async function fetchAllRest(endpoint, page = 1, results = []) {
	// NOTE:: this doens't use getRestData() as the logic below needs to look at the response headers and not just use the data
	const response = await fetch(`${endpoint}&page=${page}`, {
		method: 'GET',
	});
	const data = await response.json();
	results.push(...data);
	const totalPages = response.headers.get('x-wp-totalpages');
	if (page < totalPages) {
		return fetchAllRest(endpoint, page + 1, results);
	} else {
		return results;
	}
}

export async function getPublishedDataBySlug(contentUrlPart, slug, locale, optionalUrlParams = '') {
	if (optionalUrlParams !== '') {
		optionalUrlParams = `&${optionalUrlParams}`;
	}

	let data = await getRestData(
		`${process.env.BACKEND_SERVER}/wp-json/wp/v2/${contentUrlPart}?slug=${slug}&lang=${locale}${optionalUrlParams}`
	);

	return data[0];
}

/*
 * Get the published or preview data based on the contentUrlPart and isPreview
 * @param {string} contentUrlPart - The content URL part (ex: 'posts')
 * @param {boolean} isPreview - If the data is preview or not
 * @returns {Promise} - The published or preview data
 */
export async function getPublishedOrPreviewData(contentUrlPart, id, isPreview, token, locale, optionalUrlParams = '') {
	const headers = isPreview
		? new Headers({ Authorization: 'Basic ' + token, 'Content-Type': 'application/x-www-form-urlencoded' })
		: {};

	if (optionalUrlParams !== '') {
		optionalUrlParams = `&${optionalUrlParams}`;
	}

	let data = null; // what will contain the real or preview data
	if (!isPreview) {
		data = await getRestData(
			`${process.env.BACKEND_SERVER}/wp-json/wp/v2/${contentUrlPart}/${id}?lang=${locale}${optionalUrlParams}`,
			headers
		);
	} else {
		// since we're previewing we need to first figure out what the latest revision is. We can get this by querying the /revisions endpoint
		const revisionsJsonData = await getRestData(
			`${process.env.BACKEND_SERVER}/wp-json/wp/v2/${contentUrlPart}/${id}/revisions?cacheBuster=${getCachebuster()}`,
			headers
		);

		if (!Array.isArray(revisionsJsonData) || revisionsJsonData.length === 0) {
			// NOTE:: This can happen if unauthenticated or invalid headers
			// console.log('revisionsJsonData', revisionsJsonData);
			console.error(`getPublishedOrPreviewData() was unable to find a preview revision to use - throwing error`);
			throw new Error(`getPublishedOrPreviewData() was unable to find a preview revision to use - throwing error`);
		}
		const revisionID = revisionsJsonData[0].id;
		console.log('getPublishedOrPreviewData() - found preview revisionID', revisionID);

		// now we request this specific revision
		// NOTE:: we pass 'edit' for the 'context' param so we get back all the data we need (ref: https://developer.wordpress.org/rest-api/reference/page-revisions/)
		data = await getRestData(
			`${
				process.env.BACKEND_SERVER
			}/wp-json/wp/v2/${contentUrlPart}/${id}/revisions/${revisionID}?context=edit${optionalUrlParams}&cacheBuster=${getCachebuster()}`,
			headers
		);
		console.log('getPublishedOrPreviewData() - using PREVIEW data');
	}

	return data;
}

export async function getRestData(restEndPoint, headers = {}) {
	const response = await fetch(`${restEndPoint}`, {
		method: 'GET',
		headers: headers,
	});

	if (!response.ok) {
		throw new Error(
			`getRestData - Failed to fetch form data for endpoint '${restEndPoint}', status: ${response.status}`
		);
	}

	const data = await response.json();
	return data;
}

// Generate a unique string we can append to REST calls to ensure they aren't cached responses
export function getCachebuster() {
	return performance.now().toString().replace('.', '');
}

/**
 * Inverts the keys and values of an object.
 */
export function invertObject(obj) {
	return Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));
}

export async function importPublicJsonFileDynamically(fileName) {
	try {
		// Dynamically import the specified JSON file
		const module = await import(`../public/${fileName}.json`);
		// Return the imported JSON content
		return module.default;
	} catch (error) {
		console.error(`Error: [importPublicJsonFileDynamically]: importing file ${fileName}:`, error);
		throw error;
	}
}

// This function fetches recent posts from public files generated pre-build.
// It is utilized in all page templates as well as detail pages.
export async function getPostTypeData(locale) {
	const DEFAULT_LOCALE = 'en-US';
	const RECENT_POSTS_FILE = 'recentPosts';

	try {
		const fileName = locale === DEFAULT_LOCALE ? RECENT_POSTS_FILE : `${RECENT_POSTS_FILE}-${locale}`;
		const localeData = await importPublicJsonFileDynamically(fileName);

		const {
			resourcesQuery: resourcesData,
			partnersQuery: partnerData,
			caseStudiesQuery: caseStudiesData,
			newsQuery: newsData,
			postsQuery: postsData,
			testimonialsQuery: testimonialData,
			learnQuery: learnData,
		} = localeData;

		const resourceGridAutoFill = [
			resourcesData ?? null,
			partnerData ?? null,
			caseStudiesData ?? null,
			newsData ?? null,
			testimonialData ?? null,
			postsData ?? null,
			learnData ?? null,
		];

		const postTypeData = {
			resourcesQuery: resourceGridAutoFill,
		};

		return postTypeData;
	} catch (error) {
		console.error('[getPostTypeData] Error:', error);
		throw error;
	}
}

export const fetchModulePostsDetail = async (modules, locale) => {
	if (!Array.isArray(modules) || modules.length === 0) return [];

	let fileByLocale = '';
	if (locale !== 'en-US' && locale !== 'en') {
		fileByLocale = `-${locale}`;
	}

	const fileNameMapping = {
		case_study: `caseStudies-posts${fileByLocale}`,
		resource: `resources-posts${fileByLocale}`,
		testimonial: `testimonials-posts${fileByLocale}`,
	//	logo: `logos-posts${fileByLocale}`,
		post: `blog-posts${fileByLocale}`,
	};

	for (const module of modules) {
		const layout = module?.acf_fc_layout;
		if (['case_study_slider', 'resources_grid', 'testimonial_slider', 'logos'].includes(layout)) {
			const posts = module.posts || [];
			const updatedPosts = await Promise.all(
				posts.map(async (post) => {
					try {
						const postType = post.post_type ?? '';
						const fileName = fileNameMapping[postType];
						if (!fileName) return null;

						const allPosts = await importPublicJsonFileDynamically(fileName);
						return allPosts.find((filePost) => filePost.id === post.ID) || null;
					} catch (error) {
						console.error(`Failed to fetch or process post: ${post.ID}, type: ${post.post_type}, error: ${error}`);
						throw error;
					}
				})
			);

			module.posts = updatedPosts.filter((post) => post !== null);
		}
	}

	return modules;
};

// Used for pages that are entirely generated programmatically
export const createFullHead = (title, description) => {
	return `<title>${title}</title>\n<meta name="description" content="${description}" />`;
};

/**
 * Reference Ticket: TR2-685 - Build failures being masked
 * Handle invalid data response based on the environment phase.
 * - The function is designed to handle invalid data responses differently based on the environment phase.
 * - During the production build phase (`PHASE_PRODUCTION_BUILD`), it throws the provided error to ensure
 *   that the application fails fast and the issue is noticeable during the build process.
 * - In other phases (lower level environments), it returns an object with `notFound: true` which can be used
 *   to render a "not found" page or handle the error gracefully.
 */

export const handleInvalidDataResponse = (error = new Error('[handleInvalidDataResponse]: An error occurred')) => {
	if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
		console.error('[handleInvalidDataResponse]: Invalid data or reference to unpublished data, failing build.');
		throw error;
	} else {
		return {
			notFound: true,
		};
	}
};

export const getPostsFromJson = async (post_type, language, taxonomies, searchTerm, page, postPerPage) => {
	let jsonFile;

	const posts = require(`../public/posts${language}.json`);
	const learn = require(`../public/learn${language}.json`);
	const partners = require(`../public/partners${language}.json`);
	const resources = require(`../public/resources${language}.json`);
	const events = require(`../public/events${language}.json`);
	const caseStudies = require(`../public/caseStudies${language}.json`);

	// Selecting JSON file
	if (post_type === 'post') {
		jsonFile = posts;
	} else if (post_type === 'learn') {
		jsonFile = learn;
	} else if (post_type === 'partner') {
		jsonFile = partners;
	} else if (post_type === 'resource') {
		jsonFile = resources;
	} else if (post_type === 'events') {
		jsonFile = events;
	} else if (post_type === 'case_study') {
		jsonFile = caseStudies;
	}

	const { results: searchResults } = await runRelevanssiSearch(searchTerm, page, postPerPage);

	// Filter results by Lang, Taxonomies and Search
	const results = {
		posts: jsonFile?.nodes.filter((post) => {
			const postToString = JSON.stringify(post).toLowerCase();
			const postTerms = post.terms?.nodes;
			const termArray = postTerms?.map((term) => term.slug.toLocaleLowerCase());

			// Check if the post matches the search term and includes all taxonomies
			const matchesSearchAndTaxonomy =
				postToString.includes(searchTerm) && taxonomies.every((n) => termArray.includes(n));

			// Check if the post matches any result in searchResults
			const matchesSearchResults = searchResults?.some((result) => {
				const resultTitle = result.title.rendered || '';
				const resultTaxonomies = result.post_type_terms || [];

				const hasMatchingTaxonomy = resultTaxonomies.some((term) => taxonomies.includes(term.taxonomy.toLowerCase()));

				return post.title.includes(resultTitle) && hasMatchingTaxonomy;
			});

			// Return true if either condition is met
			return matchesSearchAndTaxonomy || matchesSearchResults;
		}),
	};
	results.total_posts_found = results.posts.length;

	// Parse results
	results.posts = results.posts.map((post) => {
		const taxonomies = post?.terms?.nodes?.map((term) => {
			return {
				taxonomyName: term.taxonomyName,
				termName: term.name,
				termSlug: term.slug,
				term,
			};
		});
		return {
			post_type: post_type,
			taxonomies: taxonomies ?? null,
			core: {
				title: post.title,
				excerpt: post.excerpt ?? null,
				permalink: post.uri ?? null,
				post_thumbnail_url: post.featuredImage?.node.sourceUrl ?? null,
				id: post.id,
				primary_taxonomy_id: post?.primary_taxonomy_id ?? null,
				primary_category_id: post?.primary_category_id ?? null,
			},
			acf: {
				exclude_from_archive_page:
					post.eventsPage?.excludeFromArchivePage ?? post.resourcesPage?.excludeFromArchivePage ?? null,
				events_details: post.eventsPage?.eventsDetails ?? null,
				when: post.eventsPage?.when ?? null,
			},
		};
	});

	// Sort Posts
	results.posts = results.posts.length ? sortPosts(results.posts) : results.posts;
	results.max_pages = Math.floor(results.posts.length / postPerPage) + 1;

	// Pagination
	if (page > 1) {
		let lastPostPerPage = postPerPage * (page - 1);
		let newPostPerPage = postPerPage * page;
		results.posts = results.posts.slice(lastPostPerPage, newPostPerPage);
	}
	results.posts = results.posts.slice(0, postPerPage);

	return results;
};

function sortPosts(posts) {
	const [{ post_type }] = posts;

	switch (post_type) {
		case 'events':
			return posts.sort((a, b) => {
				const dateA = new Date(a?.acf.events_details.when.fromDate || a?.acf.when.date);
				const dateB = new Date(b?.acf.events_details.when.fromDate || b?.acf.when.date);
				return dateA - dateB;
			});
		case 'partner':
			return posts.sort((a, b) => {
				// Show featured partners (Global Partners) first
				const hasGlobalPartnerA = a.taxonomies.some(
					(tax) => tax.taxonomyName === 'partnertype' && tax.termSlug === 'global-partners'
				);
				const hasGlobalPartnerB = b.taxonomies.some(
					(tax) => tax.taxonomyName === 'partnertype' && tax.termSlug === 'global-partners'
				);

				if (hasGlobalPartnerA && !hasGlobalPartnerB) {
					return -1;
				}
				if (!hasGlobalPartnerA && hasGlobalPartnerB) {
					return 1;
				}

				// Alphabetical Sort for 'partners' (if both or neither have the taxonomy)
				if (a.core.title.toLowerCase() < b.core.title.toLowerCase()) {
					return -1;
				} else if (a.core.title.toLowerCase() > b.core.title.toLowerCase()) {
					return 1;
				} else {
					return 0;
				}
			});
		default:
			return posts;
	}
}

async function runRelevanssiSearch(searchTerm, page, postPerPage) {
	// return empty if search term is empty
	if (searchTerm.length === 0) {
		return { results: [] };
	}

	const SearchLeadingPath = '/wp-json/relevanssi/v1/search';
	let backendUrl = path.join(process.env.BACKEND_SERVER, SearchLeadingPath);
	backendUrl = `${backendUrl}?keyword=${searchTerm}&page=${page}&per_page=${postPerPage}`;

	const response = await fetch(backendUrl);
	return response.json();
}
