import GlobalConstants from '../../../../GlobalConstants';
import MarketoConstants from '../../../../MarketoConstants';

const marketoBaseURL = `https://${MarketoConstants.marketoFallbackScriptId}.mktorest.com`;
// checks for empty object
export const getMktoTokenisEmpty = (obj) => {
	return Object.keys(obj).length === 0;
};

export const isEmpty = (obj) => {
	return Object.keys(obj).length === 0;
};

/*	converts unix timestamp and return date format('Y-m-d H:i:s')
	ex: 12348575 => 2023-6-9 22:16:44
*/
export const unixToDate = (UNIX_timestamp) => {
	const a = new Date(UNIX_timestamp * 1000);
	const year = a.getFullYear();
	const month = a.getMonth() + 1;
	const date = a.getDate();
	const hour = a.getHours();
	const min = a.getMinutes();
	const sec = a.getSeconds();
	const time = `${year}-${month}-${date} ${hour}:${min}:${sec}`;

	return time;
};

// returns refresh token based upon env from netlify env variables
export const getToscaToken = () => {
	return process.env.TOSCA_REFRESH_TOKEN;
};

// returns base url based upon env from netlify env variables
export const getBaseUrl = () => {
	return process.env.SERVICE_NOW_URL;
};

// returns access token
export const getAccessToken = async () => {
	const baseURL = await getBaseUrl();
	const refreshToken = await getToscaToken();

	const urlencoded = new URLSearchParams({
		grant_type: 'refresh_token',
		refresh_token: refreshToken,
		client_id: GlobalConstants.ServiceNow.ClientId,
		client_secret: GlobalConstants.ServiceNow.ClientSecret,
	});

	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: urlencoded,
		redirect: 'follow',
	};

	const accessToken = await fetch(baseURL + '/oauth_token.do', requestOptions)
		.then((response) => response.text())
		.then((result) => {
			// uncomment for debugging
			// console.log(result);
			return result;
		})
		.catch((error) => console.log('getAccessToken encountered an error', error));

	return JSON.parse(accessToken);
};

export const customFetch = async (checkUserPath, requestOptions) => {
	const response = await fetch(checkUserPath, requestOptions)
		.then((response) => response.text())
		.then((result) => {
			// uncomment for debugging
			// console.log('customFetch result: ', result);

			return result;
		})
		.catch((error) => console.log('customFetch encountered an error', error));

	const data = await JSON.parse(response);
	const { result } = data;

	return result || data;
};

/**
 * Check if string can be parsed to an JSON object.
 *
 * @param {string} string
 * @returns {boolean}
 */
const isStringTypeofJson = (string) => {
	if (typeof string !== "string") return false;

	try {
		JSON.parse(string);

		return true;
	} catch (error) {
		return false;
	}
};

/**
 * Custom Fetch wrapper.
 * 
 * @param {String} url Api endpoint url.
 * @param {RequestInit|undefined} requestOptions fetch standard Options object.
 * 
 * @returns {{ status: number; data: any; message?: string; }} 
 */
export const customFetch2 = async (url, requestOptions) => {
	try {
		const response = await fetch(url, requestOptions);
		const text = await response.text();

		const { status } = response;
		const data = isStringTypeofJson(text) ? JSON.parse(text) : text;

		return { status, data };
	} catch (error) {
		return { status: 500, data: null, message: error.toString() };
	}
};

// checks to see if user is eligible for new trial
export const canHaveNewTrial = (trialData, daysBetweenTrials = 30) => {
	const userActive = trialData.u_active;
	const trialExpired = trialData.u_expires;

	if (userActive && !trialExpired) {
		return false;
	}

	if (trialData.u_valid_until !== undefined) {
		let lastTrialEndDate = '';

		try {
			lastTrialEndDate = new Date(trialData.u_valid_until);
		} catch {
			return true;
		}

		// converts to days in seconds
		const offset = daysBetweenTrials * 24 * 60 * 60;
		const nextTrialValid = Math.floor(lastTrialEndDate.getTime() / 1000);
		const time = Math.floor(new Date().getTime() / 1000);

		// uncomment for debugging
		// console.log(
		// 	'nextTrialValid: ',
		// 	nextTrialValid,
		// 	' > time: ',
		// 	time,
		// 	' diff: ',
		// 	time - nextTrialValid,
		// 	' offset: ',
		// 	offset,
		// 	' ',
		// 	time - nextTrialValid > offset
		// );

		if (time - nextTrialValid < offset) {
			// If current time minus nextTrialValid is less than the offset, user is not eligible for a new trial yet.
			return false;
		}
	}

	return true;
};

export const getMktoToken = async () => {
	const clientId = GlobalConstants.Marketo.ClientId;
	const clientSecret =  GlobalConstants.Marketo.ClientSecret;
	const url = `${marketoBaseURL}/identity/oauth/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;

	const response = await customFetch(url, { method: 'GET' });

	return response?.access_token;
}

/**
 * Attach a lead ID to a Campaign.
 * In practice, we use it to run again the Marketo flow for a specific Campaign.
 * One use case is to resend a verification email.
 * 
 * @param {String|Number} lead_id Lead ID from Marketo
 * @param {Number} campaign_id Campaign ID from Marketo
 * @param {String} token Access Token
 *
 * @returns {Object}
 */
export const attachLeadToCampaign = async (lead_id, campaign_id, token) => {
	const url = `${marketoBaseURL}/rest/v1/campaigns/${campaign_id}/trigger.json?access_token=${token}`;
	const data = { input: { leads: [{ id: lead_id }]}};

	const result = await customFetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	return result;
}

/**
 * Get a Lead from Marketo by email.
 *
 * @param {String} email User email
 * @param {String} token Access token
 *
 * @returns {Object} The lead object.
 */
export const getLeadDataByEmail = async (email, token) => {
	const url = `${marketoBaseURL}/rest/v1/leads.json?access_token=${token}&filterType=EMAIL&filterValues=${email}`;

	const leadData = await customFetch(url, { method: 'GET' });

	return Array.isArray(leadData) && leadData.length ? leadData[0] : null;
}

