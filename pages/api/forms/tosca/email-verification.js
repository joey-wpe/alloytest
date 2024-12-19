const { getLeadDataByEmail, attachLeadToCampaign, getMktoToken } = require('./utils');

// create user API for Tosca Trials
export default async function handler(req, res) {
	const {
		body: { email, marketoLeadId },
	} = req;
	let leadId = marketoLeadId;

	if (!email) return res.status(400).json({ message: 'Email not provieded.' });

	const marketoToken = await getMktoToken();
	if (!marketoToken) return res.status(400).json({ message: 'Marketo token could not be fetched.' });

	// NOTE: In a lot of tests the marketoLeadId is NULL. We need to fetch the Lead by Email to get it's ID.
	if (!leadId) {
		const leadData = await getLeadDataByEmail(email, marketoToken);
		leadId = leadData?.id;
	}
	if (!leadId) return res.status(400).json({ message: 'Marketo lead ID could not be fetched.' });

	const result = await attachLeadToCampaign(leadId, 38024, marketoToken);

	let requestResponse = {
		status: false,
		error: null,
		result: null,
	};

	if (result.errors) {
		requestResponse.message = 'Verification email not sent.';
		requestResponse.error = result.errors;
		requestResponse.status = result.success;
	} else {
		requestResponse.status = true;
		requestResponse.result = result;
	}

	return res.status(200).json({ requestResponse: requestResponse });
}
