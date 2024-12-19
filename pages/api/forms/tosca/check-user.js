const url = require('url');
const URLbasePath = process.env.NEXT_PUBLIC_BACKEND_SERVER;
const marketoBackendPath = '/wp-json/tricentis/v1/';
const { canHaveNewTrial, customFetch, isEmpty, getBaseUrl, getAccessToken } = require('./utils');

// check user API for Tosca Trials
export default async function handler(req, res) {
	const { body } = req;
	const baseURL = await getBaseUrl();
	const checkUserPath = `${baseURL}/api/ttng2/trials/checkUser?email=${body.email}`;
	const accessToken = await getAccessToken();
	const auth = 'Bearer ' + accessToken.access_token;
	let reqResponse = {
		status: true,
		userExists: false,
		error: '',
	};

	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: auth,
		},
		redirect: 'follow',
	};

	const result = await customFetch(checkUserPath, requestOptions);

	if (result === undefined || isEmpty(result)) {
		return null;
	}

	if (!isEmpty(result.user)) {
		reqResponse.userExists = true;

		if (result.user.state === 'Unverified') {
			reqResponse.error = 'verifyEmailRequired';
			reqResponse.mlid = result.user.marketo_lead_id || null;
		} else if (!isEmpty(result.trial) && !canHaveNewTrial(result.trial)) {
			reqResponse.status = false;
			reqResponse.error = 'recentTrial';
		}
	}

	return res.status(200).json(reqResponse);
}
