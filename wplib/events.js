import { transformEventsByIDRestToJson } from '../data-mediators/FormatEventRestToJson';
import {
	fetchAllResultFromAllLangs,
	getPostTypeData,
	getRestData,
	getPublishedDataBySlug,
	getPublishedOrPreviewData,
} from './util';

export async function getAllEventsStaticPaths() {
	const events = await fetchAllResultFromAllLangs(
		`${process.env.BACKEND_SERVER}/wp-json/wp/v2/events?_fields=id,title,link,slug,uri,wpml_current_locale&per_page=100`
	);

	return events;
}

export async function getPublishedEventDataBySlug(slug, locale) {
	const data = await getPublishedDataBySlug('events', slug, locale);
	return appendRelativeDataToEvent(data, locale);
}

export async function getPreviewEventDataByDatabaseID(id, token, locale) {
	const isPreview = true;
	const data = await getPublishedOrPreviewData('events', id, isPreview, token, locale);
	return appendRelativeDataToEvent(data, locale);
}

async function appendRelativeDataToEvent(data, locale) {
	if (!data) {
		throw new Error('events - No data received from WordPress API.');
	}

	if (data?.acf?.events_details?.select_form?.ID !== undefined) {
		const formData = await getRestData(
			`${process.env.BACKEND_SERVER}/wp-json/wp/v2/form/${data?.acf?.events_details?.select_form?.ID}`
		);
		data.acf.events_details.select_form.ID = formData?.acf?.form_id;
	}
	const eventDataTransformed = transformEventsByIDRestToJson(data, 'eventsByID');
	const event = eventDataTransformed?.data?.event;
	const postTypeData = await getPostTypeData(locale);

	return {
		event,
		postTypeData,
		translated: event?.translated,
	};
}
