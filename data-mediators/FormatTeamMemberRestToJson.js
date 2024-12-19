function transformTeamMemberRestToList(restResponse) {
	return restResponse.map((node) => {
		return {
			__typename: 'TeamMember',
			title: node?.title?.rendered,
			databaseId: node?.id,
			locale: { __typename: 'Locale', locale: node?.wpml_current_locale },
			slug: node?.slug,
			uri: node?.uri,
		};
	});
}

function transformTeamMemberRestToPage(restResponse) {
	return {
		teamMember: {
			__typename: 'TeamMember',
			id: restResponse.id,
			seo: {
				__typename: 'PostTypeSEO',
				canonical: restResponse.yoast_head_json?.canonical ?? null,
				fullHead: restResponse.yoast_head ?? null,
				metaDesc: restResponse.yoast_head_json?.description ?? null,
				metaRobotsNofollow: restResponse.yoast_head_json?.robots?.follow ?? null,
				metaRobotsNoindex: restResponse.yoast_head_json?.robots?.index ?? null,
			},
			title: restResponse.title.rendered,
			slug: restResponse?.slug,
			translated: restResponse.wpml_translations ?? null,
			featuredImage: {
				__typename: 'NodeWithFeaturedImageToMediaItemConnectionEdge',
				node: {
					__typename: 'MediaItem',
					mediaItemUrl: restResponse.featured_media_src?.url,
					alt: restResponse.featured_media_src?.alt_text,
				},
			},
			teamMemberDetails: {
				__typename: 'TeamMember_Teammemberdetails',
				title: restResponse.acf?.title,
				summary: restResponse.acf?.summary,
				socialMedia: restResponse.acf?.social_media,
			},
		},
	};
}

export function transformTeamMemberRestToJson(restResponse = {}, type = '') {
	switch (type) {
		case 'list':
			return transformTeamMemberRestToList(restResponse);
		case 'page':
			return transformTeamMemberRestToPage(restResponse);
		default:
			console.log(`ERROR: [transformTeamMemberRestToJson]: Unsupported type: ${type}, returning null`);
			return null;
	}
}
