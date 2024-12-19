import GlobalConstants from '../GlobalConstants';
import { transformResourceByIDRestToJson } from '../data-mediators/FormatResourceRestToJson';
import {
	fetchAllResultFromAllLangs,
	getRestData,
	getPostTypeData,
	fetchModulePostsDetail,
	getPublishedDataBySlug,
	getPublishedOrPreviewData,
} from './util';

export async function getAllResources() {
	const resources = await fetchAllResultFromAllLangs(
		`${process.env.BACKEND_SERVER}/wp-json/wp/v2/resource?_fields=id,title,link,slug,uri,wpml_current_locale&per_page=100`
	);
	return resources;
}
export async function getRecentResources() {
	const resources = await getRestData(
		`${process.env.BACKEND_SERVER}/wp-json/wp/v2/resource?_fields=id,title,link,slug,uri,wpml_current_locale&per_page=${GlobalConstants.Options.ResourcePartialLimit}&orderby=date&order=desc`
	);
	return resources;
}

export async function getPublishedResourceDataBySlug(slug, locale) {
	const data = await getPublishedDataBySlug('resource', slug, locale);
	return appendRelativeDataToResource(data, locale);
}

export async function getPreviewResourceDataByDatabaseID(id, token, locale) {
	const isPreview = true;
	const data = await getPublishedOrPreviewData('resource', id, isPreview, token, locale);
	return appendRelativeDataToResource(data, locale);
}

async function appendRelativeDataToResource(data, locale) {
	if (!data) {
		throw new Error('resources - No data received from WordPress API.');
	}

	const selectFormID = data?.acf?.gated_details?.select_form?.ID ?? null;
	if (selectFormID) {
		const selectFormData = await getRestData(`${process.env.BACKEND_SERVER}/wp-json/wp/v2/form/${selectFormID}`);
		data.acf.gated_details.select_form.form_id = selectFormData?.acf?.form_id;
		data.acf.gated_details.select_form.form_title = selectFormData?.acf?.form_title;
	}

	const nextFormID = data?.acf?.gated_details?.next_form?.ID ?? null;
	if (nextFormID) {
		const nextFormData = await getRestData(`${process.env.BACKEND_SERVER}/wp-json/wp/v2/form/${nextFormID}`);
		data.acf.gated_details.next_form.form_id = nextFormData?.acf?.form_id;
		data.acf.gated_details.next_form.form_title = nextFormData?.acf?.form_title;
	}

	if (data.acf?.modules?.length > 0) {
		data.acf.modules = await fetchModulePostsDetail(data.acf.modules, locale);

		// check for form and fetch form data ...
		for (const module of data.acf.modules) {
			if (module.acf_fc_layout === 'form') {
				const formData = await getRestData(
					`${process.env.BACKEND_SERVER}/wp-json/wp/v2/form/${module.form_select_form.ID}`
				);
				module.form_select_form = formData;
				if (module.form_next_form?.ID) {
					const nextFormData = await getRestData(
						`${process.env.BACKEND_SERVER}/wp-json/wp/v2/form/${module.form_next_form.ID}`
					);
					module.form_next_form.form_id = nextFormData?.acf?.form_id;
					module.form_next_form.form_title = nextFormData?.acf?.form_title;
				}
			}
		}
	}

	const resource = transformResourceByIDRestToJson(data, 'ResourceByID');
	const postTypeData = await getPostTypeData(locale);

	return {
		resource,
		postTypeData,
		translated: resource?.translated,
	};
}
