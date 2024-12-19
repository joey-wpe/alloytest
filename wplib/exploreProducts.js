import { fetchAllResultFromAllLangs, getRestData, getPublishedDataBySlug, getPublishedOrPreviewData } from './util';
import { transformExploreProductByIDRestToJson } from '../data-mediators/FormatExploreProductRestToJson';

export async function getAllExploreProducts() {
	const exploreProducts = await fetchAllResultFromAllLangs(
		`${process.env.BACKEND_SERVER}/wp-json/wp/v2/explore_products?_fields=id,title,link,slug,uri,wpml_current_locale&per_page=100`
	);
	return exploreProducts;
}

export async function getPublishedExploreProductsDataBySlug(slug, locale) {
	const data = await getPublishedDataBySlug('explore_products', slug, locale);
	return appendRelativeDataToExploreProducts(data, locale);
}

export async function getPreviewExploreProductsDataByDatabaseID(id, token, locale) {
	// NOTE:: we pass in '_embed' to avoid subsequent calls for getting category and tri_general_products
	const isPreview = true;
	const data = await getPublishedOrPreviewData('explore_products', id, isPreview, token, locale);
	return appendRelativeDataToExploreProducts(data, locale);
}

async function appendRelativeDataToExploreProducts(data, locale) {
	if (!data) {
		throw new Error('exploreProducts - No data received from WordPress API.');
	}

	// Extract form data if applicable
	if (data?.acf?.gated_details?.select_form?.ID) {
		const formId = data.acf.gated_details.select_form.ID;
		const formData = await getRestData(`${process.env.BACKEND_SERVER}/wp-json/wp/v2/form/${formId}`);
		if (!formData || !formData.acf || !formData.acf.form_id) {
			throw new Error('getExploreProductDataByDatabaseID - Invalid form data received.');
		}

		// Enhance the original data with the fetched form details
		data.acf.gated_details.select_form.form_id = formData.acf.form_id;
		data.acf.gated_details.select_form.form_title = formData.acf.form_title;
	}

	const exploreProduct = transformExploreProductByIDRestToJson(data, 'exploreProductsById');
	return {
		exploreProduct,
		translated: exploreProduct?.translated,
	};
}
