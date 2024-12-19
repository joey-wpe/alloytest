import { getRestData } from './util';

export async function get404Page(locale) {
	let page404EndPoint = '';
	let acf_wrapper = true;
	if (locale === 'de') {
		page404EndPoint = '/wp-json/acf/v3/options/options_DE/';
	} else if (locale === 'fr') {
		page404EndPoint = '/wp-json/acf/v3/options/options_FR/';
	} else {
		page404EndPoint = '/wp-json/acf/v3/options/options/page_not_found_content_wrapper';
		acf_wrapper = false;
	}

	let data = '';
	try {
		data = await getRestData(`${process.env.BACKEND_SERVER}${page404EndPoint}`);
	} catch (err) {
		console.error(`404Page - error getting notFoundData from pageUri: ${page404EndPoint}`, err);
		throw err;
	}

	let notFound404PageData = data.page_not_found_content_wrapper;
	if (acf_wrapper === true) {
		notFound404PageData = data.acf.page_not_found_content_wrapper;
	}

	return {
		notFound404PageData,
	};
}
