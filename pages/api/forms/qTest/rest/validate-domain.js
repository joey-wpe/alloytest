import { validateDomain } from '../utils';

export default async function handler(req, res) {
	const { field, value } = req.body;
	const response = await validateDomain({ field, value });

	return res.status(200).json(response);
}
