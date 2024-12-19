function transformNewsRestToList(restResponse) {
	return {
		data: {
			allNews: {
				nodes: restResponse.map((node) => {
					return {
						__typename: 'News',
						title: node?.title?.rendered ?? null,
						excerpt: node?.excerpt?.rendered ?? null,
						date: node?.date ?? null,
						databaseId: node?.id ?? null,
						uri: node?.uri ?? null,
						locale: {
							__typename: 'Locale',
							locale: node?.wpml_current_locale ?? null,
						},
						templateNews: {
							__typename: 'News_Templatenews',
							externalResource: node?.acf?.external_resource ?? null,
							urlOfResource: node?.acf?.url_of_resource ?? null,
							publishDisplayDate: node?.acf?.publish_display_date ?? null,
						},
					};
				}),
			},
		},
	};
}

function transformNewsRestToPage(restResponse) {
	return {
		__typename: 'News',
		content: restResponse.content?.rendered,
		id: restResponse.id,
		seo: {
			__typename: 'PostTypeSEO',
			canonical: restResponse.yoast_head_json?.canonical ?? null,
			fullHead: restResponse.yoast_head ?? null,
			metaDesc: restResponse.yoast_head_json?.description ?? null,
			metaRobotsNofollow: restResponse.yoast_head_json?.robots?.follow ?? null,
			metaRobotsNoindex: restResponse.yoast_head_json?.robots?.index ?? null,
		},
		templateNews: {
			__typename: 'News_Templatenews',
			externalResource: restResponse.acf?.external_resource ?? null,
			urlOfResource: restResponse.acf?.url_of_resource ?? null,
			publishDisplayDate: restResponse.acf?.publish_display_date ?? null,
		},
		title: restResponse.title.rendered,
		translated: restResponse.wpml_translations ?? null,
	};
}

export function transformNewsRestToJson(restResponse = {}, type = '') {
	switch (type) {
		case 'list':
			return transformNewsRestToList(restResponse);
		case 'page':
			return transformNewsRestToPage(restResponse);
		default:
			console.log(`ERROR: [transformNewsRestToJson]: Unsupported type: ${type}, returning null`);
			return null;
	}
}
