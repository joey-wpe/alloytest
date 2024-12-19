import { emptyReturnNull } from '../wplib/util';
import {
	createAlertGroupObject,
	createHeroObject,
	createHeroMinimalObject,
} from './PageTemplateHelpers/moleculeHelpers';

export function transformBlogByIDRestToJson(restResponse, dataType) {
	switch (dataType) {
		case 'blogByID':
			return transformBlogByIDJson(restResponse);
		case 'getAllCategories':
			return transformGetAllCategories(restResponse);
		case 'getCategoryBySlug':
			return transformGetCategoriesBySlug(restResponse);
		case 'getPostForCategory':
			return transformPostForCategory(restResponse);

		default:
			console.error('ERROR: transformBlogByIDRestToJson: dataType was undefined, returning null');
			return null;
	}
}

function transformBlogByIDJson(restResponse) {
	return {
		data: {
			post: {
				seo: {
					__typename: 'PostTypeSEO',
					canonical: restResponse?.yoast_head_json?.canonical ?? null,
					fullHead: restResponse?.yoast_head ?? null,
					metaDesc: restResponse?.yoast_head_json?.description ?? null,
					metaRobotsNofollow: restResponse?.yoast_head_json?.robots?.follow ?? null,
					metaRobotsNoindex: restResponse?.yoast_head_json?.robots?.index ?? null,
				},
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
				title: restResponse?.title?.rendered ?? null,
				slug: restResponse?.slug ?? null,
				date: restResponse?.date ?? null,
				templateBlog: {
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
					blogContentMain: restResponse?.acf?.blog_content_main ?? null,
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
						backgroundColor: restResponse?.acf?.resource_section?.background_color,
						backgroundPattern: restResponse?.acf?.resource_section?.background_pattern,
						backgroundType: restResponse?.acf?.resource_section?.background_type,
						paddingTop: restResponse?.acf?.resource_section?.padding_top,
						paddingBottom: restResponse?.acf?.resource_section?.padding_bottom,
						anchor: restResponse?.acf?.resource_section?.anchor,
						additionalClasses: restResponse?.acf?.resource_section?.additional_classes,
						allowFeatured: restResponse?.acf?.resource_section?.allow_featured,
						actions: restResponse?.acf?.resource_section?.actions
							? {
									function: restResponse?.acf?.resource_section?.actions?.function ?? null,
									display: restResponse?.acf?.resource_section?.actions?.display ?? null,
									link: {
										title: restResponse?.acf?.resource_section?.actions?.link?.title ?? null,
										url:
											restResponse?.acf?.resource_section?.actions?.url?.replace(process.env.BACKEND_SERVER, '') ??
											null,
										target: restResponse?.acf?.resource_section?.actions?.target ?? null,
									},
									seoText: restResponse?.acf?.resource_section?.actions?.seo_text ?? null,
									adaText: restResponse?.acf?.resource_section?.actions?.ada_text ?? null,
							  }
							: null,
						titleText: restResponse?.acf?.resource_section?.title_text,
						allowedTypes: restResponse?.acf?.resource_section?.allowed_types,
						selectionMethod: restResponse?.acf?.resource_section?.selection_method,
						posts: restResponse?.acf?.resource_section?.posts
							? restResponse?.acf?.resource_section?.posts?.map((post) => {
									return {
										__typename: post?.post_type ?? 'Resource',
										id: post?.ID ?? null,
										title: post?.post_title ?? null,
										uri: post?.uri ?? null,
										content: post?.post_content ?? null,
										excerpt: post?.post_excerpt ?? null,
										featuredImage: post?.featured_media_src ?? null,
										date: post?.post_date ?? null,
									};
							  })
							: null,
					},
				},
				categories: {
					nodes: restResponse?.category
						? restResponse?.category?.map((category) => {
								return {
									__typename: 'Category',
									databaseId: category?.id ?? '',
									name: category?.name ?? '',
									slug: category?.slug ?? '',
									isPrimary: category?.isPrimary ?? false,
								};
						  })
						: [],
				},
				resourceProducts: {
					__typename: 'PostToResourceProductConnection',
					nodes: restResponse?.tri_general_products
						? restResponse?.tri_general_products.map((widget) => {
								return {
									categoryEditBlogWidget: {
										__typename: 'ResourceProduct_Categoryeditblogwidget',
										primary: restResponse?.tri_general_products__primary_product_id == widget?.id ? true : false,
										description: widget?.acf?.description ?? null,
										displayBlogWidget: widget?.acf?.display_blog_widget ?? null,
										image: {
											id: widget?.acf?.image?.ID ?? null,
											altText: widget?.acf?.image?.alt ?? '',
											mediaItemUrl: widget?.acf?.image?.url ?? '',
										},
										link: {
											target: widget?.acf?.link?.target ?? null,
											title: widget?.acf?.link?.title ?? null,
											url: widget?.acf?.link?.url ?? null,
										},
										title: widget?.acf?.title ?? null,
									},
								};
						  })
						: null,
				},
				locale: {
					__typename: 'Locale',
					locale: restResponse?.wpml_current_locale ?? null,
				},
				translated: restResponse?.wpml_translations
					? Object.entries(restResponse?.wpml_translations)
							?.filter(([key, value]) => {
								return restResponse?.wpml_translations[key]?.status == 'publish';
							})
							?.map(([key, value]) => {
								let uri = '';
								let href = restResponse?.wpml_translations[key]?.href ?? '';
								let urlMatch = href.match(/(http[s]?:\/\/)?([^/\s]+\/)(.*)/, '');
								if (urlMatch !== null && urlMatch[3]) {
									uri = '/' + urlMatch[3]; // return just the route only
								}

								return {
									__typename: 'Post',
									uri: uri,
									translations: [
										{
											__typename: 'Translation',
											locale: restResponse?.wpml_translations[key]?.locale ?? null,
											id: restResponse?.wpml_translations[key]?.id ?? null,
										},
									],
									locale: { __typename: 'Locale', locale: restResponse?.wpml_translations[key]?.locale ?? null },
								};
							})
					: [],
			},
		},
	};
}
function transformGetAllCategories(restResponse) {
	return {
		data: {
			categories: {
				nodes: restResponse.map((node) => {
					return {
						__typename: 'Category',
						databaseId: node?.id ?? null,
						name: node?.name ?? null,
						slug: node?.slug ?? null,
						description: node?.description ?? null,
						posts: {
							__typename: 'CategoryToPostConnection',
							nodes: [
								{
									__typename: 'Post',
									id: '',
									locale: { __typename: 'Locale', locale: node?.yoast_head_json?.og_locale },
								},
							],
						},
					};
				}),
			},
		},
	};
}
function transformGetCategoriesBySlug(restResponse) {
	return {
		data: {
			category: {
				__typename: 'Category',
				databaseId: restResponse[0]?.id ?? null,
				name: restResponse[0]?.name ?? null,
				slug: restResponse[0]?.slug ?? null,
				description: restResponse[0]?.description ?? null,
				uri: '',
				seo: {
					__typename: 'TaxonomySEO',
					canonical: restResponse[0]?.yoast_head_json?.canonical ?? null,
					fullHead: restResponse[0]?.yoast_head ?? null,
					metaDesc: restResponse[0]?.yoast_head_json?.description ?? null,
					metaRobotsNofollow: restResponse[0]?.yoast_head_json?.robots?.follow ?? null,
					metaRobotsNoindex: restResponse[0]?.yoast_head_json?.robots?.index ?? null,
				},
			},
		},
	};
}

function transformPostForCategory(restResponse) {
	return {
		data: {
			categories: {
				__typename: 'RootQueryToCategoryConnection',
				nodes: [
					{
						__typename: 'Category',
						slug: restResponse?.categorySlug ?? null,
						name: restResponse?.categoryName ?? null,
						posts: {
							__typename: 'CategoryToPostConnection',
							nodes: restResponse.map((node) => {
								let terms = [];
								let termsCategories = node.categories.map((categories_id) => {
									return {
										__typename: 'Category',
										taxonomyName: 'category',
										description: emptyReturnNull(restResponse.categoriesArray[categories_id]['description']) ?? null,
										name: restResponse.categoriesArray[categories_id]['name'] ?? null,
										slug: restResponse.categoriesArray[categories_id]['slug'] ?? null,
									};
								});
								let termsResourceProduct = node.tri_general_products.map((tri_general_products_id) => {
									return {
										__typename: 'ResourceProduct',
										taxonomyName: 'tri_general_products',
										description:
											emptyReturnNull(restResponse.resourceArray[tri_general_products_id]['description']) ?? null,
										name: restResponse?.resourceArray[tri_general_products_id]['name'] ?? null,
										slug: restResponse?.resourceArray[tri_general_products_id]['slug'] ?? null,
									};
								});
								terms.push(...termsCategories);
								terms.push(...termsResourceProduct);

								return {
									__typename: 'Post',
									id: node?.id ?? null,
									title: node?.title?.rendered ?? null,
									date: node?.date ?? null,
									excerpt: node?.excerpt?.rendered ?? null,
									uri: node?.uri ?? null,
									locale: {
										__typename: 'Locale',
										locale: node?.wpml_current_locale,
									},
									terms: {
										__typename: 'PostToTermNodeConnection',
										nodes: terms,
									},
									featuredImage: null,
								};
							}),
						},
					},
				],
			},
		},
	};
}
