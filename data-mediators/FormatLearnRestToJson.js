import { createContentBlocksModules } from './PageTemplateHelpers/flexTemplateHelpers';
import {
	createSeoObject,
	createAlertGroupObject,
	createHeroObject,
	createHeroMinimalObject,
} from './PageTemplateHelpers/moleculeHelpers';

function transformGetAllLearnRestToJson(restResponse) {
	return {
		data: {
			allLearn: {
				nodes: restResponse.map((node) => {
					return {
						__typename: 'Learn',
						title: node?.title?.rendered ?? null,
						excerpt: node?.excerpt?.rendered ?? null,
						date: node?.date ?? null,
						id: node?.id ?? null,
						databaseId: node?.id ?? null,
						uri: node?.link ?? null,
						featuredImage: node?.featured_media_src?.url ?? null,
						locale: {
							__typename: 'Locale',
							locale: node?.wpml_current_locale ?? null,
						},
						terms: {
							nodes: [],
						},
					};
				}),
			},
		},
	};
}

function transformGetLearnTopicByIdRestToJson(restResponse) {
	return {
		__typename: 'Topic',
		title: restResponse?.name ?? null,
		slug: restResponse?.slug ?? null,
		id: restResponse?.id ?? null,
		databaseId: restResponse?.id ?? null,
		seo: createSeoObject(restResponse?.yoast_head_json, restResponse?.yoast_head),
	};
}

function transformGetLearnByIdRestToJson(restResponse) {
	const relatedPostsMeta = restResponse?.acf_resources_posts_meta || {};

	return {
		__typename: 'Learn',
		title: restResponse?.title?.rendered ?? null,
		content: restResponse?.content?.rendered ?? null,
		excerpt: restResponse?.excerpt?.rendered ?? null,
		date: restResponse?.date ?? null,
		id: restResponse?.id ?? null,
		databaseId: restResponse?.id ?? null,
		uri: restResponse?.link ?? null,
		slug: restResponse?.slug ?? null,
		locale: {
			__typename: 'Locale',
			locale: restResponse?.wpml_current_locale ?? null,
		},
		seo: createSeoObject(restResponse?.yoast_head_json, restResponse?.yoast_head),
		pageHeader: {
			alertSettings: restResponse?.acf?.alert_settings ?? null,
			alertgroup: createAlertGroupObject(restResponse?.acf),
			heroType: restResponse?.acf?.hero_type,
			hero: createHeroObject(restResponse?.acf?.hero),
			heroMinimal: createHeroMinimalObject(
				restResponse?.acf?.hero_minimal,
				restResponse?.title,
				restResponse?.acf?.hero_type
			),
		},
		templateBlog: {
			__typename: 'Post_Templateblog',
			author: [
				{
					__typename: 'Author',
					id: restResponse?.acf?.author?.id ?? null,
					title: restResponse?.acf?.author?.title?.rendered ?? null,
					uri: restResponse?.acf?.author?.guid?.rendered?.replace(process.env.BACKEND_SERVER, '') ?? null,
					authorDetails: {
						__typename: 'Author_Authordetails',
						description: restResponse?.acf?.author?.acf?.description ?? null,
					},
				},
			],
			blogContentMain: restResponse?.acf?.blog_content_main,
			leftNavMenu: restResponse?.acf?.left_nav_menu
				? restResponse?.acf?.left_nav_menu?.map((menuItem) => {
						return {
							navItem: {
								url: menuItem?.nav_item.url ?? '#',
								title: menuItem?.nav_item.title ?? '',
								target: menuItem?.nav_item.target ?? '',
							},
						};
				  })
				: null,
			stickyDisruptor: {
				__typename: 'Post_Templateblog_StickyDisruptor',
				stickyDisruptorContent: restResponse?.acf?.sticky_disruptor?.sticky_disruptor_content ?? null,
				stickyDisruptorDisplay: restResponse?.acf?.sticky_disruptor?.sticky_disruptor_display ?? null,
				stickyDisruptorTitle: restResponse?.acf?.sticky_disruptor?.sticky_disruptor_title ?? null,
				stickyDisruptorLink: restResponse?.acf?.sticky_disruptor?.sticky_disruptor_link ?? null,
			},
			resourceSection: {
				__typename: 'Post_Templateblog_ResourceSection',
				backgroundColor: restResponse?.acf?.resource_section?.background_color ?? null,
				backgroundPattern: restResponse?.acf?.resource_section?.background_pattern ?? null,
				backgroundType: restResponse?.acf?.resource_section?.background_type ?? null,
				paddingTop: restResponse?.acf?.resource_section?.padding_top ?? null,
				paddingBottom: restResponse?.acf?.resource_section?.padding_bottom ?? null,
				anchor: restResponse?.acf?.resource_section?.anchor ?? null,
				additionalClasses: restResponse?.acf?.resource_section?.additional_classes ?? null,
				allowFeatured: restResponse?.acf?.resource_section?.allow_featured ?? null,
				contentAlignment: restResponse?.acf?.resource_section?.content_alignment ?? null,
				actions: restResponse?.acf?.resource_section?.actions
					? restResponse?.acf?.resource_section?.actions.map((action) => {
							return {
								function: action.function ?? null,
								display: action.display ?? null,
								link: {
									title: action.link?.title ?? null,
									url: action.link?.url?.replace(process.env.BACKEND_SERVER, '') ?? null,
									target: action.link?.target ?? null,
								},
								seoText: action.seo_text ?? null,
								adaText: action.ada_text ?? null,
							};
					  })
					: null,
				titleText: restResponse?.acf?.resource_section?.title_text ?? null,
				allowedTypes: restResponse?.acf?.resource_section?.allowed_types ?? null,
				selectionMethod: restResponse?.acf?.resource_section?.selection_method ?? null,
				posts: restResponse?.acf?.resource_section?.posts
					? restResponse?.acf?.resource_section?.posts?.map((post) => {
							return {
								__typename: 'Resource',
								id: post?.ID,
								title: post?.post_title,
								uri: (relatedPostsMeta[post?.ID] || {})?.uri || post?.guid.replace(process.env.BACKEND_SERVER, ''),
								content: post?.post_content,
								excerpt: post?.post_excerpt,
								featuredImage: null,
								date: post?.post_date,
							};
					  })
					: null,
			},
			modules: createContentBlocksModules(restResponse?.acf?.modules)?.modules ?? [],
		},
		categories: {
			__typename: 'PostToCategoryConnection',
			nodes: restResponse.categoryNodes ?? [],
		},
		resourceProducts: {
			__typename: 'PostToResourceProductConnection',
			nodes: [
				{
					__typename: 'ResourceProduct',
					databaseId: 133,
					name: 'Tricentis SAP Solution',
					slug: 'tricentis-sap-solution',
					categoryEditBlogWidget: {
						__typename: 'ResourceProduct_Categoryeditblogwidget',
						description: null,
						displayBlogWidget: null,
						fieldGroupName: 'categoryEditBlogWidget',
						image: null,
						link: null,
						title: null,
					},
				},
				{
					__typename: 'ResourceProduct',
					databaseId: 329,
					name: 'Tricentis Test Automation',
					slug: 'tricentis-test-automation',
					categoryEditBlogWidget: {
						__typename: 'ResourceProduct_Categoryeditblogwidget',
						description: null,
						displayBlogWidget: null,
						fieldGroupName: 'categoryEditBlogWidget',
						image: null,
						link: null,
						title: null,
					},
				},
			],
		},
	};
}

export function transformLearnRestToJson(restResponse = {}, type = '') {
	switch (type) {
		case 'list':
			return transformGetAllLearnRestToJson(restResponse);
		case 'topicPage':
			return transformGetLearnTopicByIdRestToJson(restResponse);
		case 'page':
			return transformGetLearnByIdRestToJson(restResponse);
		default:
			console.log(`ERROR: [transformLearnRestToJson]: Unsupported type: ${type}, returning null`);
			return null;
	}
}
