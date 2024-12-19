// Checks phone number score via Service Objects endpoint
import GlobalConstants from '../../../../GlobalConstants';
import MarketoConstants from '../../../../MarketoConstants';

export default async function handler(req, res) {
	console.log('API email: ', req);
	const email = 'a.chi@tricentis.com';
	const sbBaseURL = `https://${MarketoConstants.mktoFormEndpoints.serviceObjectsBasePath}/ev3/web.svc/json/ValidateEmailAddress?EmailAddress=${email}&AllowCorrections=false&Timeout=3000&LicenseKey=${process.env.SERVICE_OBJECTS_EMAIL_KEY}`;

	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const response = await fetch(sbBaseURL, requestOptions)
		.then((response) => response.text())
		.then((result) => {
			// uncomment for debugging
			// console.log('customFetch result: ', result);

			return result;
		})
		.catch((error) => console.log('customFetch encountered an error', error));

	const data = await JSON.parse(response);

	// console.log('data: ', data);

	return res.status(200).json(data);
}
