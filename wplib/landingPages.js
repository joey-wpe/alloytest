import {
	fetchAllResultFromAllLangs,
	getPostTypeData,
	getRestData,
	getPublishedDataBySlug,
	getPublishedOrPreviewData,
	fetchModulePostsDetail,
} from './util';
import { transformLandingPageByIDRestToJson } from '../data-mediators/FormatLandingPagesRestToJson';

export async function getAllLandingPages() {
	const landingPages = await fetchAllResultFromAllLangs(
		`${process.env.BACKEND_SERVER}/wp-json/wp/v2/landing_pages?_fields=id,title,link,slug,uri,wpml_current_locale&per_page=100`
	);
	return landingPages;
}

export async function getPublishedLandingPageDataBySlug(slug, locale) {
	const data = await getPublishedDataBySlug('landing_pages', slug, locale);
	return appendRelativeDataToLandingPage(data, locale);
}

export async function getPreviewLandingPageDataByDatabaseID(id, token, locale) {
	const isPreview = true;
	const data = await getPublishedOrPreviewData('landing_pages', id, isPreview, token, locale);
	return appendRelativeDataToLandingPage(data, locale);
}

export async function appendRelativeDataToLandingPage(data, locale) {
	if (!data) {
		throw new Error('landingPages - No data received from WordPress API.');
	}

	if (
		data?.acf?.basic_landing_page?.content_section?.content_modules &&
		Array.isArray(data?.acf?.basic_landing_page?.content_section?.content_modules) &&
		data?.acf?.basic_landing_page?.content_section?.content_modules.length > 0
	) {
		data.acf.basic_landing_page.content_section.content_modules = await fetchModulePostsDetail(
			data.acf.basic_landing_page.content_section.content_modules,
			locale
		);
	}
	if (
		data?.acf?.basic_landing_page?.top_section?.form_select_form &&
		data?.acf?.basic_landing_page?.top_section?.form_select_form?.ID
	) {
		const formId = data.acf.basic_landing_page.top_section.form_select_form.ID;
		const formData = await getRestData(`${process.env.BACKEND_SERVER}/wp-json/wp/v2/form/${formId}`);
		if (!formData || !formData.acf || !formData.acf.form_id) {
			throw new Error('Invalid form data received.');
		}
		// Enhance the original data with the fetched form details
		data.acf.basic_landing_page.top_section.form_select_form.form_id = formData.acf.form_id;
		data.acf.basic_landing_page.top_section.form_select_form.form_title = formData.acf.form_title;
	}

	if (
		data?.acf?.basic_landing_page.top_section?.form_next_form &&
		data?.acf?.basic_landing_page.top_section?.form_next_form?.ID
	) {
		const formId = data?.acf?.basic_landing_page.top_section?.form_next_form.ID;
		const formData = await getRestData(`${process.env.BACKEND_SERVER}/wp-json/wp/v2/form/${formId}`);
		if (!formData || !formData.acf || !formData.acf.form_id) {
			throw new Error('Invalid form data received.');
		}
		data.acf.basic_landing_page.top_section.form_next_form.form_id = formData.acf.form_id;
		data.acf.basic_landing_page.top_section.form_next_form.form_title = formData.acf.form_title;
	}

	if (
		data?.acf?.basic_landing_page?.content_section?.content_modules &&
		data?.acf?.basic_landing_page?.content_section?.content_modules.length > 0
	) {
		const contentModules = data.acf.basic_landing_page?.content_section?.content_modules;

		for (const contentModule of contentModules) {
			if (
				contentModule?.media_form_group &&
				contentModule?.media_form_group?.select_form &&
				contentModule?.media_form_group?.select_form?.ID
			) {
				const formId = contentModule.media_form_group.select_form.ID;
				const formData = await getRestData(`${process.env.BACKEND_SERVER}/wp-json/wp/v2/form/${formId}`);
				if (!formData || !formData.acf || !formData.acf.form_id) {
					throw new Error('Invalid form data received.');
				}

				// Enhance the original data with the fetched form details
				contentModule.media_form_group.select_form = formData;
			}
		}

		data.acf.basic_landing_page.content_modules = contentModules;
	}

	const landingPage = transformLandingPageByIDRestToJson(data, 'landingPageById');
	const postTypeData = await getPostTypeData(locale);

	return {
		landingPage,
		translated: landingPage?.translated,
		postTypeData,
	};
}
