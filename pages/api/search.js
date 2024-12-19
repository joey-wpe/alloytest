import path from 'path';
import GlobalConstants from '../../GlobalConstants';
import { mediateUrlPath } from '../../wplib/urlHelpers';

const url = require('url');
const MaxResultsPerPage = 50;

const SearchLeadingPath = '/wp-json/relevanssi/v1/search';

// This search endpoint calls the WordPress backend search endpoint. Alternatively we could just use a rewrite and query
// WordPress directly, however this gives us a chance to reduce the payload size (ex: 10k characters to 1k characters, 3k to 1k),
// and also gives us the chance to swap out the URLs in the response (to reference the frontend site) before passed over the wire
export default async function handler(req, res) {
	// console.log({ req });
	// console.log({ res });
	if (req.method !== 'GET') {
		res.status(404).end();
		return;
	}

	const { q } = req.query;
	const searchParam = q;
	if (!searchParam) {
		console.error('Search - no query provided');
		return res.status(400).send('No query provided');
	}

	const { page } = req.query;
	if (!page) {
		console.error('Search - no page provided');
		return res.status(400).send('No page provided');
	}

	const { resultsPerPage } = req.query;
	if (!resultsPerPage || resultsPerPage > MaxResultsPerPage) {
		console.error('Search - resultsPerPage is invalid');
		return res.status(400).send('No resultsPerPage provided');
	}

	const { lang } = req.query;
	if (!lang) {
		console.error('Search - no language provided');
    return res.status(400).send('No language provided');
	}

	const queryObject = url.parse(req.url, true).query;
	// console.log({ queryObject });
	// console.log('req', req);

	let backendUrl = path.join(process.env.BACKEND_SERVER, SearchLeadingPath);
	backendUrl = `${backendUrl}?keyword=${searchParam}&page=${page}&per_page=${resultsPerPage}&lang=${lang}`;
	// console.log('backendUrl', backendUrl);

	const response = await fetch(backendUrl);
	const data = await response.json();

	// handle what happens when no results
	// ex: https:/develop-tricentis-backend.pantheonsite.io/wp-json/relevanssi/v1/search?keyword=page&page=3&per_page=4
	if (!data.pageInfo) {
		const emptyResults = {
			totalResults: 0,
			totalPages: 0,
			results: [],
		};
		return res.status(200).json(emptyResults);
	}

	const totalNumber = Math.ceil(data.pageInfo['X-WP-Total']);
	const totalPages = Math.ceil(data.pageInfo['X-WP-TotalPages']);

	// console.log('totalNumber', totalNumber);
	// console.log('pagesNumber', totalPages);

	const parsedResults = {
		totalResults: totalNumber,
		totalPages: totalPages,
		results: data.results.map((result) => {
			return {
				contentType: result.type,
				title: result.title?.rendered,
				excerpt: result.excerpt?.rendered,
				url: mediateUrlPath(result.link),
			};
		}),
	};

	// console.log(parsedResults);
	return res.status(200).json(parsedResults);
}
