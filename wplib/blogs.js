import {
	fetchAllResultFromAllLangs,
	getRestData,
	getPostTypeData,
	getPublishedOrPreviewData,
	getPublishedDataBySlug,
	importPublicJsonFileDynamically,
} from './util';

import transformPostQueryRestToJson from '../data-mediators/FormatPostQueryRestToJson';
import { transformBlogByIDRestToJson } from '../data-mediators/FormatBlogRestToJson';
import GlobalConstants from '../GlobalConstants';

export async function getAllBlogs() {
	const postsGet = await fetchAllResultFromAllLangs(
		`${process.env.BACKEND_SERVER}/wp-json/wp/v2/posts?_fields=id,title,link,slug,uri,wpml_current_locale&per_page,tri_general_products__primary_product_id,primary_category_id=100`
	);
	return postsGet;
}
export async function getRecentBlogs() {
	const postsData = getRestData(
		`${process.env.BACKEND_SERVER}/wp-json/wp/v2/posts?per_page=${GlobalConstants.Options.BlogPartialLimit}`
	);
	const posts = transformPostQueryRestToJson(postsData, 'posts');
	return posts;
}

export async function getAllBlogCategories() {
	const data = await fetchAllResultFromAllLangs(
		`${process.env.BACKEND_SERVER}/wp-json/wp/v2/categories?_fields=id,name,slug,description,yoast_head_json&per_page=100`
	);
	const categoriesTransormed = transformBlogByIDRestToJson(data, 'getAllCategories');

	const categories = categoriesTransormed.data.categories.nodes;

	return {
		categories,
	};
}

export async function getAllBlogCategoriesArray(type) {
	let search = 'categories';
	if (type == 'triProducts') {
		search = 'tri_general_products';
	}

	const data = await fetchAllResultFromAllLangs(
		`${process.env.BACKEND_SERVER}/wp-json/wp/v2/${search}?_fields=id,name,slug,description&per_page=100`
	);

	var mappedArray = {};
	for (var i = 0, n = data.length; i < n; i++) {
		mappedArray[data[i]['id']] = data[i];
	}
	return {
		mappedArray,
	};
}

export async function getBlogIDFromCategory(id, locale) {
	const restEndPoint = `${process.env.BACKEND_SERVER}/wp-json/wp/v2/categories?slug=${id}&lang=${locale}`;
	const data = await getRestData(restEndPoint);
	let categoryData = transformBlogByIDRestToJson(data, 'getCategoryBySlug');

	return {
		categoryData,
	};
}

export async function getPostsForCategory(id, locale) {
	let allCategories = await getAllBlogCategoriesArray();
	allCategories = allCategories['mappedArray'];

	let allResourceProduct = await getAllBlogCategoriesArray('triProducts');
	allResourceProduct = allResourceProduct['mappedArray'];

	const restEndPoint = `${process.env.BACKEND_SERVER}/wp-json/wp/v2/posts/?categories=${id}&lang=${locale}&_fields=id,title,date,excerpt,slug,uri,wpml_current_locale,featured_media_src,categories,tri_general_products,tri_general_products__primary_product_id,primary_category_id`;

	const data = await getRestData(restEndPoint);

	data.categorySlug = allCategories[id]['slug'];
	data.categoryName = allCategories[id]['name'];

	data.categoriesArray = allCategories;
	data.resourceArray = allResourceProduct;

	let postsData = transformBlogByIDRestToJson(data, 'getPostForCategory');

	return {
		postsData,
	};
}

export async function getPublishedBlogDataBySlug(slug, locale) {
	const data = await getPublishedDataBySlug('posts', slug, locale, '_embed');
	return appendRelativeDataToBlog(data, locale);
}

export async function getPreviewBlogDataByDatabaseID(id, token, locale) {
	// NOTE:: we pass in '_embed' to avoid subsequent calls for getting category and tri_general_products
	const isPreview = true;
	const data = await getPublishedOrPreviewData('posts', id, isPreview, token, locale, '_embed'); // what will contain the real or preview data
	return appendRelativeDataToBlog(data, locale);
}

async function appendRelativeDataToBlog(data, locale) {
	if (!data) {
		throw new Error('blogs - No data received from WordPress API.');
	}

	const embeddedData = data?._embedded && data._embedded['wp:term'];
	if (embeddedData && Array.isArray(embeddedData[0])) {
		data.category = embeddedData[0].map((category) => ({
			...category,
			isPrimary: data?.primary_category_id ? category?.id == data?.primary_category_id : false,
		}));
	}
	if (embeddedData && Array.isArray(embeddedData[2])) {
		data.tri_general_products = embeddedData[2];
	}

	if (Array.isArray(data?.acf?.author) && data?.acf?.author[0]?.ID != '') {
		data.acf.author = await getRestData(`${process.env.BACKEND_SERVER}/wp-json/wp/v2/author/${data.acf.author[0].ID}`);
	}

	if (data?.acf?.resource_section?.selection_method == 'manual' && Array.isArray(data?.acf?.resource_section?.posts)) {
		const posts = data?.acf?.resource_section?.posts;

		let fileByLocale = '';
		if (locale !== 'en-US' && locale !== 'en') {
			fileByLocale = `-${locale}`;
		}

		const fileNameMapping = {
			case_study: `caseStudies-posts${fileByLocale}`,
			resource: `resources-posts${fileByLocale}`,
			testimonial: `testimonials-posts${fileByLocale}`,
			logo: `logos-posts${fileByLocale}`,
			post: `blog-posts${fileByLocale}`,
		};

		const updatedPosts = await Promise.all(
			posts.map(async (post) => {
				try {
					const postType = post.post_type ?? '';
					const fileName = fileNameMapping[postType];
					if (!fileName) return null;

					const allPosts = await importPublicJsonFileDynamically(fileName);
					const postDetail = allPosts.find((filePost) => filePost.id === post.ID) || null;
					post.uri = postDetail?.uri ?? null;
					post.featured_media_src = postDetail?.featured_media_src?.url ?? null;

					return post;
				} catch (error) {
					console.error(`Failed to fetch or process post: ${post.ID}, type: ${post.post_type}, error: ${error}`);
					throw new Error(`Failed to fetch or process post: ${post.ID}, type: ${post.post_type}, error: ${error}`);
				}
			})
		);

		data.acf.resource_section.posts = updatedPosts;
	}

	let blogDataTransformed = transformBlogByIDRestToJson(data, 'blogByID'); //Update Data
	//console.log('blogDataTransformed=', JSON.stringify(blogDataTransformed));
	const post = blogDataTransformed?.data?.post;
	const postTypeData = await getPostTypeData(locale);

	return {
		post,
		postTypeData,
		translated: post?.translated,
	};
}
