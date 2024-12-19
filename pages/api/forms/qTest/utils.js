import { customFetch2 } from '../tosca/utils';
import GlobalConstants from '../../../../GlobalConstants';
import { QTEST_HOST, QTEST_TOKEN, QBEO_HOST, QBEO_TOKEN } from '../../environment';

export const validateDomain = async ({ field, value }) =>  {
	const { qTest } = GlobalConstants;
	const response = {
		value,
		valid: false,
		code: 400,
		message: '',
	};

	if (field && value ) {
		const url = `${QTEST_HOST}/api/validate/domain?${new URLSearchParams({ urlPrefix: value })}`;
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': QTEST_TOKEN,
			},
		};
		const { status, data, message: serverErrMessage } = await customFetch2(url, options);

		const { code, message } = Array.isArray(data) && data.length ? data[0] : { code: null, message: '' };
		response.code = code;
		response.valid = status === 200 || code === 1000;
		response.message = serverErrMessage || message;
	}

	return response;
}

export const clientTrial = async (leadData) =>  {
	const queryObject = { data: JSON.stringify(leadData)};
	const url = `${QTEST_HOST}/api/client/trial/?${new URLSearchParams(queryObject)}`;
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': QTEST_TOKEN,
		},
		body: JSON.stringify(leadData),
	};
	const response = await customFetch2(url, options);

	return response;
}

/**
 * @deprecated - Should be called by qTest Team.
 * 
 * @param {Object} data
 *
 * @returns {void}
 */
export const mktClientTrialInfo = async (data) => {
	const leadData = { ...data };

	leadData.numberOfUsers = 15;
	if (leadData.password) {
		leadData.authkey = btoa(leadData.password);
		leadData.password = undefined;
	}
	leadData.env = '';

	const body = { data: JSON.stringify(leadData)};

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': QBEO_TOKEN,
		},
		body: JSON.stringify(body),
	};
	const response = await customFetch2(QBEO_HOST, options);

	return response;
}