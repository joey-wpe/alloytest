import StringConstants from '../StringConstants';
import { extractTemplateName, cleanURI } from '../data-mediators/PageTemplateHelpers/utils';
import { formatPostTypes, formatNewsPostType } from '../data-mediators/PageTemplateHelpers/postTypeHelpers';
import {
	transformBasicPagesRestToJson,
	transformPageTemplateRestToJson,
} from '../data-mediators/PageTemplateHelpers/common';

import {
	fetchAllResultFromAllLangs,
	getPostTypeData,
	getRestData,
	getPublishedOrPreviewData,
	fetchModulePostsDetail,
} from './util';
import GlobalConstants from '../GlobalConstants';

// Variables related to REST-related work.
const backendUrl = process.env.BACKEND_SERVER;

/**
 * Fetching Page DatabaseID from REST API..
 */
let _allPagesCache = null;
export async function getPageDatabaseIDFromUri(pageUri) {
	const nonEnglishLocales = GlobalConstants.Locales.filter((locale) => locale !== 'en');
	for (const locale of nonEnglishLocales) {
		if (pageUri === `/${locale}/homepage/`) {
			pageUri = `/${locale}/`;
			break;
		}
	}

	if (_allPagesCache == null) {
		_allPagesCache =
			(await fetchAllResultFromAllLangs(`${backendUrl}/wp-json/wp/v2/pages?_fields=id,uri&per_page=100`)) || [];
	}

	const matchingPage = _allPagesCache?.find((page) => cleanURI(page?.uri) === pageUri);
	return matchingPage?.id || null;
}

/**
 * Retrieving all pages from the REST API.
 */
export async function getAllPagesBasic() {
	let pages = await fetchAllResultFromAllLangs(
		`${backendUrl}/wp-json/wp/v2/pages?_fields=id,title,link,slug,uri,template,wpml_current_locale&per_page=100`
	);
	pages = transformBasicPagesRestToJson(pages);
	return {
		pages,
	};
}

const handleAvatars = async (avatars) => {
	if (!avatars || avatars.length === 0) return [];

	const updatedAvatars = [];
	for (const avatar of avatars) {
		const updatedTeamMembers = [];
		for (const member of avatar.team_members) {
			try {
				const memberDetail = await getTeamMemberDetail(member);
				updatedTeamMembers.push(memberDetail);
			} catch (error) {
				throw new Error(`Error fetching team member detail for: ${member}: ${error.message}`);
			}
		}
		// Push the modified avatar with updated team members
		updatedAvatars.push({ ...avatar, team_members: updatedTeamMembers });
	}

	return updatedAvatars;
};

/**
 * Fetching Team Member details from a REST API..
 */
const getTeamMemberDetail = async (id) => {
	try {
		const teamMemberData = await getRestData(`${backendUrl}/wp-json/wp/v2/team_member/${id}`);
		return teamMemberData;
	} catch (error) {
		throw new Error(`Error fetching Team Member Data: ${error.message}`);
	}
};

const handleModulePostsDetail = async (modules, locale) => {
	if (!Array.isArray(modules) || modules.length === 0) {
		return null;
	}

	const updatedModules = await fetchModulePostsDetail(modules, locale);

	for (let module of updatedModules) {
		// Fetch additional form data if applicable
		if (module?.media_form_group?.select_form?.ID) {
			const formId = module.media_form_group.select_form.ID;
			try {
				module.media_form_group.select_form = await getRestData(`${backendUrl}/wp-json/wp/v2/form/${formId}`);
			} catch (error) {
				console.error(`Error fetching form data for form ID ${formId}: ${error}`);
				throw error;
			}
		}

		// Fetch FormSelectFormData if applicable
		if (module?.form_select_form?.ID) {
			const formId = module.form_select_form.ID;
			try {
				module.form_select_form = await getRestData(`${backendUrl}/wp-json/wp/v2/form/${formId}`);
			} catch (error) {
				console.error(`Error fetching FormSelectFormData data for form ID ${formId}: ${error}`);
				throw error;
			}
		}
	}

	return updatedModules;
};

const getNewsRoomMainPostType = async (locale) => {
	if (locale === 'en-US') locale = 'en';
	const lang = locale === 'en' ? '' : `&wpml_lang=${locale}`;
	const newstypeRestUrl = `${backendUrl}/wp-json/wp/v2/newstype?_fields=id,title,link,slug${lang}`;

	try {
		const newsTypeJson = await getRestData(newstypeRestUrl);

		let inTheNewsTypeId = null;
		let pressReleasesTypeId = null;

		// get a handle on the in the news and press release types so we can read out the newstype's id for our subsequent query of news by that type
		var inTheNewsTypeJson = null;
		var pressReleaseTypeJson = null;
		var inTheNewsLocale = 'en';
		var pressReleaseLocale = 'en';

		// NOTE:: This needs to be revisited if the slugs change for the in-the-news or press-releases pages
		if (locale === 'de') {
			inTheNewsTypeJson = newsTypeJson.find((type) => type.slug === 'in-the-news-de');
			pressReleaseTypeJson = newsTypeJson.find((type) => type.slug === 'press-releases-de');

			if (inTheNewsTypeJson) {
				inTheNewsLocale = 'de';
			}
			if (pressReleaseTypeJson) {
				pressReleaseLocale = 'de';
			}
		} else if (locale === 'ja') {
			inTheNewsTypeJson = newsTypeJson.find((type) => type.slug === 'in-the-news-ja');
			console.log('inTheNewsTypeJson: ', inTheNewsTypeJson);
			pressReleaseTypeJson = newsTypeJson.find((type) => type.slug === 'press-releases-ja');

			if (inTheNewsTypeJson) {
				inTheNewsLocale = 'ja';
			}
			if (pressReleaseTypeJson) {
				pressReleaseLocale = 'ja';
			}
		} else {
			if (!inTheNewsTypeJson) {
				inTheNewsTypeJson = newsTypeJson.find((type) => type.slug === 'in-the-news');
			}
			if (!pressReleaseTypeJson) {
				pressReleaseTypeJson = newsTypeJson.find((type) => type.slug === 'press-releases');
			}
		}

		inTheNewsTypeId = inTheNewsTypeJson.id;
		pressReleasesTypeId = pressReleaseTypeJson.id;

		const inTheNewsUrl = `/wp-json/wp/v2/news?newstype=${inTheNewsTypeId}
		&_fields=title,excerpt,date,id,link,acf.external_resource,uri,acf.url_of_resource,acf.publish_display_date,acf.resource_info&per_page=5&wpml_language=${inTheNewsLocale}`;
		const pressReleasesUrl = `/wp-json/wp/v2/news?newstype=${pressReleasesTypeId}
		&_fields=title,excerpt,date,id,link,acf.external_resource,uri,acf.url_of_resource,acf.publish_display_date,acf.resource_info&per_page=5&wpml_language=${pressReleaseLocale}`;

		const inTheNews = await getRestData(`${backendUrl}${inTheNewsUrl}`);
		const pressReleases = await getRestData(`${backendUrl}${pressReleasesUrl}`);

		return {
			PressReleases: formatNewsPostType(pressReleases),
			IntheNews: formatNewsPostType(inTheNews),
		};
	} catch (error) {
		throw new Error(`Error in getNewsRoomMainPostType: ${error?.message}`);
	}
};

const fetchPostTypes = async (types = [], locale = 'en') => {
	if (locale === 'en-US') locale = 'en';
	const postType = {};

	for (const { name, type } of types) {
		try {
			const jsonResponse = await getRestData(
				`${backendUrl}/wp-json/wp/v2/${type}?_fields=name,taxonomy,slug,tri_general_products__primary_product_id&per_page=100&wpml_language=${locale}`
			);
			if (jsonResponse && jsonResponse.length > 0) {
				postType[name] = formatPostTypes(jsonResponse);
			}
		} catch (error) {
			throw new Error(`Error fetching postType [fetchPostTypes]: ${error.message}`);
		}
	}

	return postType;
};

const getPartnersPostTypes = async (locale) => {
	const types = [
		{
			name: 'Partnertype',
			type: 'partnerType',
		},
		{
			name: 'Region',
			type: 'tri_region',
		},
		{
			name: 'PartnerCertification',
			type: 'partner_cert',
		},
	];

	return await fetchPostTypes(types, locale);
};

const getArchivePostTypes = async (locale) => {
	const types = [
		{
			name: 'Region',
			type: 'tri_region',
		},
		{
			name: 'ResourceTopic',
			type: 'tri_resource_topics',
		},
		{
			name: 'ResourceProduct',
			type: 'tri_general_products',
		},
		{
			name: 'ResourceType',
			type: 'resource_type',
		},
		{
			name: 'Category',
			type: 'categories',
		},
		{
			name: 'EventMonth',
			type: 'tri_events_month',
		},
		{
			name: 'EventType',
			type: 'tri_event_type',
		},
		{
			name: 'Learntype',
			type: 'learntype',
		},
	];

	return await fetchPostTypes(types, locale);
};

const getCaseStudiesPostTypes = async (locale) => {
	const types = [
		{
			name: 'Region',
			type: 'tri_region',
		},
		{
			name: 'ResourceProduct',
			type: 'tri_general_products',
		},
		{
			name: 'ResourceIndustry',
			type: 'tri_industry',
		},
	];

	return await fetchPostTypes(types, locale);
};
/**
 * Fetching page details from a REST API..
 */
const getPageDetailByDatabaseID = async (id, isPreview, token, locale) => {
	if (!id || isNaN(id)) {
		throw new Error('Invalid ID provided');
	}

	try {
		const data = await getPublishedOrPreviewData('pages', id, isPreview, token, locale); // what will contain the real or preview data

		if (data?.acf?.hero_minimal?.testimonial?.ID) {
			const testimonialId = data.acf.hero_minimal.testimonial.ID;
			const testimonialData = await getRestData(
				`${backendUrl}/wp-json/wp/v2/testimonial?include=${testimonialId}&lang=${locale}`
			);
			data.acf.hero_minimal.testimonial_detail = testimonialData[0];
		}

		if (data?.acf?.hero?.default_hero_form_group?.select_form?.ID) {
			const formId = data.acf.hero.default_hero_form_group.select_form.ID;
			const formData = await getRestData(`${backendUrl}/wp-json/wp/v2/form/${formId}`);
			data.acf.hero.default_hero_form_group.select_form = formData;
		}

		if (data?.acf?.hero?.default_hero_form_group?.next_form?.ID) {
			const formId = data.acf.hero.default_hero_form_group.next_form.ID;
			const nextFormData = await getRestData(`${backendUrl}/wp-json/wp/v2/form/${formId}`);
			data.acf.hero.default_hero_form_group.next_form = nextFormData;
		}

		if (data?.acf?.avatars) {
			const avatars = data.acf.avatars;
			const updatedAvatars = await handleAvatars(avatars);
			data.acf.avatars = updatedAvatars;
		}

		if (data?.acf?.hero?.default_hero_media_form_group?.select_form?.ID) {
			try {
				const formId = data.acf.hero.default_hero_media_form_group.select_form.ID;
				data.acf.hero.default_hero_media_form_group.select_form = await getRestData(
					`${backendUrl}/wp-json/wp/v2/form/${formId}`
				);
			} catch (error) {
				console.error(`Error fetching DefaultHeroMediaFormGroup form data for form ID ${formId}: ${error}`);
				throw error;
			}
		}

		if (data && data?.acf && data?.acf?.modules && data?.acf?.modules.length > 0) {
			data.acf.modules = await handleModulePostsDetail(data?.acf?.modules, locale);
		}

		const templateName = data?.template ? extractTemplateName(data.template) : null;

		switch (templateName) {
			case StringConstants.PageTemplates.NewsroomMain:
				data.news_post_type = await getNewsRoomMainPostType(locale);
				break;
			case StringConstants.PageTemplates.Partners:
				data.partners_post_type = await getPartnersPostTypes(locale);
				break;
			case StringConstants.PageTemplates.Archive:
				data.archive_post_type = await getArchivePostTypes(locale);
				break;
			case StringConstants.PageTemplates.CaseStudiesMain:
				data.case_studies_post_type = await getCaseStudiesPostTypes(locale);
				break;
			default:
				break;
		}

		data.templateName = templateName;
		return data;
	} catch (error) {
		throw new Error(`An error occurred while fetching page data: ${error.message}`);
	}
};

export async function getPageTemplateDataByDatabaseID(id, isPreview, token, locale) {
	try {
		const basicPageData = await getPageDetailByDatabaseID(id, isPreview, token, locale);
		const postTypeData = await getPostTypeData(locale);

		const templateName = basicPageData?.templateName ?? null;
		if (!templateName) {
			console.error(
				`[pages][getPageTemplateDataByDatabaseID] Failed to get template name for page ID: ${id}, isPreview: ${isPreview}, token: ${token}`
			);
			// console.error(`[pages][getPageTemplateDataByDatabaseID] basicPageData: ${JSON.stringify(basicPageData)}`);
			throw new Error('Template name is not available.');
		}

		return transformPageTemplateRestToJson(basicPageData, basicPageData?.templateName, locale, postTypeData);
	} catch (error) {
		console.error(`[pages][getPageTemplateDataByDatabaseID] Page ID: ${id} | Error: ${error}`);
		throw new Error(`[pages][getPageTemplateDataByDatabaseID] Page ID: ${id} | Error: ${error}`);
	}
}
