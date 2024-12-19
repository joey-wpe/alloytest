const url = require('url');
const URLbasePath = process.env.NEXT_PUBLIC_BACKEND_SERVER;
const marketoBackendPath = '/wp-json/tricentis/v1/';
const { customFetch, isEmpty, getBaseUrl, getAccessToken, unixToDate } = require('./utils');

// create user API for Tosca Trials
export default async function handler(req, res) {
	const { body } = req;
	const baseURL = await getBaseUrl();
	const startTrialPath = `${baseURL}/api/ttng2/trials/startTrial`;
	const accessToken = await getAccessToken();
	const auth = 'Bearer ' + accessToken.access_token;
	const trialLength = 14;
	const time = Math.floor(new Date().getTime() / 1000);
	const validUntilTimestamp = trialLength * 24 * 60 * 60 + time;

	let requestResponse = {
		status: false,
		error: '',
	};

	const details = {
		email: body.email,
		valid_until: unixToDate(validUntilTimestamp),
	};

	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: auth,
		},
		body: JSON.stringify(details),
		redirect: 'follow',
	};

	requestResponse.status = await customFetch(startTrialPath, requestOptions);

	return res.status(200).json({ requestResponse: requestResponse });
}
