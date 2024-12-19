import {
	createSeoObject,
	createAlertGroupObject,
	createHeroObject,
	createHeroMinimalObject,
	formatWPTranslated,
} from '../PageTemplateHelpers/moleculeHelpers';

import { extractPathname } from '../PageTemplateHelpers/utils';

const formatArchivePosts = (posts) => {
	if (!posts || !posts.length === 0) return null;
	return posts.map((post) => {
		return {
			__typename: 'Resource',
			id: post?.ID || null,
			content: post?.post_content || null,
			excerpt: post?.post_excerpt || null,
			title: post?.post_title || null,
			uri: extractPathname(post?.guid),
			featuredImage: null,
			date: post?.post_date || null,
			databaseId: post?.ID || null,
		};
	});
};

const formatResourceType = (postSection) => {
	if (!postSection || !postSection?.taxonomies || !postSection?.taxonomies?.resource_type) return null;
	return {
		__typename: 'ResourceType',
		name: postSection?.taxonomies?.resource_type?.name || null,
		taxonomyName: postSection?.taxonomies?.resource_type?.taxonomy || null,
		slug: postSection?.taxonomies?.resource_type?.slug || null,
	};
};

const formatResourceTopic = (postSection) => {
	if (!postSection || !postSection?.taxonomies || !postSection?.taxonomies?.resource_topic) return null;
	return {
		__typename: 'ResourceTopic',
		name: postSection?.taxonomies?.resource_topic?.name || null,
		taxonomyName: postSection?.taxonomies?.resource_topic?.taxonomy || null,
		slug: postSection?.taxonomies?.resource_topic?.slug || null,
	};
};

// Format Resource Section:
const formatResourceSection = (resourceSection) => {
	return {
		__typename: 'ContentTemplate_Contentblocksarchive_ResourceSection',
		backgroundColor: resourceSection?.background_color || null,
		backgroundPattern: resourceSection?.background_pattern || null,
		backgroundType: resourceSection?.background_type || null,
		paddingTop: resourceSection?.padding_top || null,
		paddingBottom: resourceSection?.padding_bottom || null,
		anchor: resourceSection?.anchor || null,
		additionalClasses: resourceSection?.additional_classes || null,
		allowFeatured: resourceSection?.allow_featured || null,
		actions: resourceSection?.actions || null,
		titleText: resourceSection?.title_text || null,
		titleType: resourceSection?.title_type || null,
		preheadText: resourceSection?.prehead_text || null,
		preheadType: resourceSection?.prehead_type || null,
		allowedTypes: resourceSection?.allowed_types || null,
		selectionMethod: resourceSection?.selection_method || null,
		contentAlignment: resourceSection?.content_alignment || null,
		description: resourceSection?.description || null,
		posts: formatArchivePosts(resourceSection?.posts),
	};
};
// Format Related Resource Section:
const formatRelatedResourceSection = (relatedResource) => {
	return {
		__typename: 'ContentTemplate_Contentblocksarchive_RelatedResourceSection',
		backgroundColor: relatedResource?.background_color || null,
		backgroundPattern: relatedResource?.background_pattern || null,
		backgroundType: relatedResource?.background_type || 'color',
		paddingTop: relatedResource?.padding_top || 'default',
		paddingBottom: relatedResource?.padding_bottom || 'default',
		anchor: relatedResource?.anchor || null,
		additionalClasses: relatedResource?.additional_classes || null,
		allowFeatured: true,
		actions: relatedResource?.actions || null,
		titleText: relatedResource?.title_text || null,
		titleType: relatedResource?.title_type || 'default',
		preheadText: relatedResource?.prehead_text || null,
		preheadType: relatedResource?.prehead_type || 'default',
		allowedTypes: relatedResource?.allowed_types || null,
		selectionMethod: relatedResource?.selection_method || 'query',
		contentAlignment: relatedResource?.content_alignment || 'left',
		description: relatedResource?.description || null,
		posts: relatedResource?.posts || null,
	};
};

export const formatArchiveTemplate = (restResponse, template, locale, postTypeData) => {
	if (!restResponse) return null;
	const {
		id,
		slug,
		title,
		uri,
		yoast_head,
		yoast_head_json,
		acf,
		wpml_translations,
		archive_post_type = {},
	} = restResponse || {};
	const { hero, alert_settings, hero_type, hero_minimal, post_section, resource_section, related_resource_section } =
		acf || {};
	return {
		page: {
			__typename: 'Page',
			seo: createSeoObject(yoast_head_json, yoast_head),
			pageHeader: {
				__typename: 'Page_Pageheader',
				alertSettings: alert_settings ?? 'global',
				alertgroup: createAlertGroupObject(acf),
				heroType: hero_type ?? null,
				hero: createHeroObject(hero),
				heroMinimal: createHeroMinimalObject(hero_minimal, title, hero_type),
			},
			isPreview: false,
			id: id ?? null,
			slug: slug ?? null,
			title: title?.rendered ?? null,
			uri: uri ?? null,
			template: {
				__typename: 'Template_Archive',
				templateName: template,
				contentBlocksArchive: {
					__typename: 'ContentTemplate_Contentblocksarchive',
					postSection: {
						__typename: 'ContentTemplate_Contentblocksarchive_PostSection',
						postTypes: {
							__typename: 'ContentTemplate_Contentblocksarchive_PostSection_PostTypes',
							postType: post_section?.post_types?.post_type || null,
						},
						taxonomies: {
							__typename: 'ContentTemplate_Contentblocksarchive_PostSection_Taxonomies',
							resourceType: formatResourceType(post_section),
							resourceTopic: formatResourceTopic(post_section),
							regions: post_section?.taxonomies?.regions || null,
							products: post_section?.taxonomies?.products || null,
							categories: post_section?.taxonomies?.categories || null,
							months: post_section?.taxonomies?.months || null,
							eventType: post_section?.taxonomies?.event_type || null,
							learnType: post_section?.taxonomies?.learn_type || null,
						},
						search: post_section?.search || null,
					},
					resourceSection: formatResourceSection(resource_section),
					relatedResourceSection: formatRelatedResourceSection(related_resource_section),
				},
			},
		},
		translated: formatWPTranslated(wpml_translations, locale),
		postTypeData: { postTypes: archive_post_type, ...postTypeData },
	};
};
