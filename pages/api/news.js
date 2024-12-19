import { formatYear } from '../../wplib/dateFormatter';

const url = require('url');

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		res.status(404).end();
		return;
	}

	const queryObject = url.parse(req.url, true).query;

	const newsType = queryObject.slug;
	const page = queryObject.page;
	const postPerPage = queryObject.posts_per_page;
	var year = parseInt(queryObject.year);
	let language = queryObject.language;

	if (language === 'en') {
		language = '';
	} else {
		language = `-${language}`;
	}

	const news = require(`../../public/news${language}.json`);
	const press = require(`../../public/press${language}.json`);

	let jsonFile;

	if (newsType === 'news') {
		jsonFile = news;
	} else {
		jsonFile = press;
	}

	const results = {
		news: jsonFile.nodes
			?.map((node) => node.news)[0]
			?.nodes?.filter((node) => {
				const newsYear = parseInt(formatYear(node.date));
				const years = !year ? parseInt(formatYear(node.date)) : year;
				return newsYear === years;
			}),
	};
	results.total_posts_found = results.news.length;
	results.max_pages =
		Math.floor(results.news.length / postPerPage) === 0 ? 1 : Math.floor(results.news.length / postPerPage);

	// Pagination
	if (page > 1) {
		let lastPostPerPage = postPerPage * (page - 1);
		let newPostPerPage = postPerPage * page;
		results.news = results.news.slice(lastPostPerPage, newPostPerPage);
	} else {
		results.news = results.news.slice(0, postPerPage);
	}

	return res.status(200).json(results);
}
