import { clientTrial, mktClientTrialInfo } from '../utils';

export default async function handler(req, res) {
	
	if(!req.body.companyName) {
		req.body.companyName = 'No Company Name';
	}

	if (req.method !== 'POST') {
		res.status(405).send({ message: 'Only POST requests allowed' });
		return;
	}

	const {
		contactFName,
		contactLName,
		username,
		password,
		companyName,
		urlPrefix,
		testTeamSize,
		companySize,
		industry,
		cid,
		campaignId,
		companyLocation,
		clusterId,
		isNotSendWelcomeEmail,
		phone,
	} = req.body;

	const leadData = {
		contactFName,
		contactLName,
		username: username.toLowerCase(),
		password,
		companyName,
		urlPrefix: urlPrefix.toLowerCase(),
		testTeamSize,
		numberOfUsers: testTeamSize,
		companySize,
		industry,
		cid,
		companyLocation,
		campaignId: campaignId || '',
		clusterId: clusterId || '1',
		phone: phone || '',
		isNotSendWelcomeEmail,
		demo: false,
	};

	const qbeoResponse = await mktClientTrialInfo(leadData);
	const qasResponse = await clientTrial(leadData); // -> Called alone, it DOES send the final email for qTest trial

	return res.status(200).json({ qasResponse, qbeoResponse });
}
