const url = require('url');
const URLbasePath = process.env.NEXT_PUBLIC_BACKEND_SERVER;
const marketoBackendPath = '/wp-json/tricentis/v1/';
const { customFetch, isEmpty, getBaseUrl, getAccessToken } = require('./utils');

// create user API for Tosca Trials
export default async function handler(req, res) {
	const { body } = req;
	const baseURL = await getBaseUrl();
	const createUserPath = `${baseURL}/api/ttng2/trials/createUser`;
	const accessToken = await getAccessToken();
	const auth = 'Bearer ' + accessToken.access_token;
	let requestResponse = {
		status: false,
		error: '',
	};

	const details = {
		email: body.email,
		salutation: body.salutation,
		first_name: body.firstName,
		last_name: body.lastName,
		country: body.country,
		password: body.passwordConfirmation,
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

	const result = await customFetch(createUserPath, requestOptions);

	if (!result) {
		// This was migrated from legacy code and currently unable to trigger this error for verification
		requestResponse.error = 'userNotCreated';
	} else {
		requestResponse.status = true;
	}

	return res.status(200).json({ requestResponse: requestResponse });
}
