import { decodeHtmlEntities } from '../../wplib/util';

// Both functions are used for formatting post types in Archive, Partner,
// and NewsRoomMain templates, and they are utilized in the file wplib/pages.js.

export const formatNewsPostType = (postTypes = []) => {
	return {
		__typename: 'NewstypeToNewsConnection',
		nodes:
			postTypes && postTypes.length > 0
				? postTypes.map((postType) => {
						const uri =
							postType?.acf?.external_resource && postType?.acf?.url_of_resource
								? postType?.acf?.url_of_resource
								: postType?.uri;

						return {
							__typename: 'News',
							id: postType?.id || null,
							date: postType?.date || null,
							excerpt: postType?.excerpt?.rendered || null,
							title: postType?.title?.rendered || null,
							uri,
							templateNews: {
								__typename: 'News_Templatenews',
								publishDisplayDate: postType?.acf?.publish_display_date || null,
								resourceInfo: postType?.acf?.resource_info || null,
							},
						};
				  })
				: [],
	};
};

export const formatPostTypes = (posTypes) => {
	if (!posTypes || posTypes.length === 0) return [];
	return posTypes.map((postType) => {
		return {
			term: decodeHtmlEntities(postType?.name),
			taxonomy: postType?.taxonomy || null,
			slug: postType?.slug || null,
			primary_taxonomy_id: postType?.primary_taxonomy_id || null,
		};
	});
};
