import path from 'path';

const url = require('url');

const RoiCalculatorLeadingPath = '/wp-json/tricentis/v1/roi-calculator';

// This Roi Calculator endpoint calls the WordPress backend Roi Calculator endpoint. Alternatively we could just use a rewrite and query
// WordPress directly, however this gives us a chance to reduce the payload size (ex: 10k characters to 1k characters, 3k to 1k),
// and also gives us the chance to swap out the URLs in the response (to reference the frontend site) before passed over the wire
export default async function handler(req, res) {
	// console.log({ req });
	// console.log({ res });
	if (req.method !== 'GET') {
		res.status(404).end();
		return;
	}

	const queryObject = url.parse(req.url, true).query;

	let backendUrl = path.join(process.env.BACKEND_SERVER, RoiCalculatorLeadingPath);

	const queryString = `industry=${queryObject.industry}&automation=${queryObject.automation}&hours=${queryObject.hours}&apps=${queryObject.apps}&releases=${queryObject.releases}&spend=${queryObject.spend}&revenue=${queryObject.revenue}&id=${queryObject.id}`;

	backendUrl = `${backendUrl}?${queryString}`;
	// console.log('backendUrl', backendUrl);

	const response = await fetch(backendUrl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();

	console.log(data);

	return res.status(200).json(data);

}
