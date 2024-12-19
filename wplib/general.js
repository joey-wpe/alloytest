import { getRestData } from './util';

export async function getBasicsByDatabaseID(id, isPreview, token, graphQLPostType) {
	const headers = isPreview
		? new Headers({ Authorization: 'Basic ' + token, 'Content-Type': 'application/x-www-form-urlencoded' })
		: {};

	let pageData;
	try {
		const requestData = await getRestData(
			`${process.env.BACKEND_SERVER}/wp-json/wp/v2/${graphQLPostType}/${id}`,
			headers
		);

		pageData = {
			databaseId: requestData.id,
			id: requestData.id,
			title: requestData.title,
			slug: requestData.slug || requestData.id,
		};
	} catch (e) {
		console.error(`[general][getBasicsByDatabaseID] Failed to query page data for id '${id}': ${e.message}`);
		throw e;
	}

	return pageData;
}
