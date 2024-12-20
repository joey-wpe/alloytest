const url = require('url');
//const { getPostsFromJson } = require('../../wplib/util');
import path from 'path';

export async function getPosts(post_type, language, taxonomies, searchTerm, page, postPerPage) {
	//return getPostsFromJson(post_type, language, taxonomies, searchTerm, page, postPerPage);
}

// This filter will select any of the JSON files created on the public folder and use the data in it depending on the post type selected.
export default async function handler(req, res) {
	if (req.method !== 'GET') {
		res.status(404).end();
		return;
	}

	const queryObject = url.parse(req.url, true).query;

	const [post_type] = JSON.parse(queryObject.post_type);
	let language = queryObject.language;
	if (language === 'en') {
		language = '';
	} else {
		language = `-${language}`;
	}
	const taxonomies = JSON.parse(queryObject.taxonomies).map((tax) => {
		return tax.term;
	});
	const searchTerm = queryObject.search.toLowerCase();
	const page = queryObject.page;
	const postPerPage = queryObject.posts_per_page;

	const results = await getPosts(post_type, language, taxonomies, searchTerm, page, postPerPage);

	return res.status(200).json(results);
}
