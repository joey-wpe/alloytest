import { getBasicsByDatabaseID } from '../../wplib/general';

const PreviewMethod = async (req, res) => {
	console.log('========= new preview starting =========');

	// if our environment variables aren't set then fail straight away
	if (
		typeof process.env.PREVIEW_JWT === 'undefined' ||
		typeof process.env.PREVIEW_USER === 'undefined' ||
		typeof process.env.PREVIEW_PASS === 'undefined' ||
		typeof process.env.PREVIEW_SECRET === 'undefined'
	) {
		return res.status(401).json({ message: 'Invalid environment' });
	}

	// https://<your-site>/api/preview?secret=<token>&id=<id>
	// http://localhost:3000/api/preview?secret=[redacted]&id=3093&type=postType&typeValue=page

	// Check the secret and next parameters
	// This secret should only be known to this API route and the CMS
	if (req.query.secret !== process.env.PREVIEW_SECRET || !req.query.id) {
		return res.status(401).json({ message: 'Invalid request' });
	}

	// Fetch the headless CMS to check if the provided `id` exists
	// req.query ex: {"id":"2680","secret":"[redacted]","type":"postType","typeValue":"page"}
	console.log('preview all query params', JSON.stringify(req.query));
	console.log(`preview query id: ${req.query.id}`);

	// get an updated token by logging in with preview user credentials
	const token = Buffer.from(process.env.WP_REST_USER + ':' + process.env.WP_REST_PASS).toString('base64');

	res.setHeader('Cache-Control', 'private, no-store, no-cache, must-revalidate, max-age=0');
  	res.setHeader('Pragma', 'no-cache');
  	res.setHeader('Expires', '0');

	// depending on the post type, lookup the slug in different ways
	if (req.query.type !== 'postType') {
		console.error(`preview.PreviewMethod: unknown content type - cannot do preview!`, req.query);
		return res.status(401).json({ message: 'Unknown content type' });
	}

	// figure out the url to preview based on the post type and id provided
	var previewRedirectSlugUrl = null;
	try {
		if (req.query.typeValue === 'page') {
			previewRedirectSlugUrl = await getSlugForPage(req.query.id, token);
		} else if (req.query.typeValue === 'post') {
			previewRedirectSlugUrl = await getSlugForPost(req.query.id, token);
		} else if (req.query.typeValue === 'case_study') {
			previewRedirectSlugUrl = await getSlugForCaseStudy(req.query.id, token);
		} else if (req.query.typeValue === 'news') {
			previewRedirectSlugUrl = await getSlugForNews(req.query.id, token);
		} else if (req.query.typeValue === 'partner') {
			previewRedirectSlugUrl = await getSlugForPartner(req.query.id, token);
		} else if (req.query.typeValue === 'team_member') {
			previewRedirectSlugUrl = await getSlugForTeamMember(req.query.id, token);
		} else if (req.query.typeValue === 'resource') {
			previewRedirectSlugUrl = await getSlugForResource(req.query.id, token);
		} else if (req.query.typeValue === 'events') {
			previewRedirectSlugUrl = await getSlugForEvent(req.query.id, token);
		} else if (req.query.typeValue === 'landing_pages') {
			previewRedirectSlugUrl = await getSlugForLandingPage(req.query.id, token);
		} else if (req.query.typeValue === 'learn') {
			previewRedirectSlugUrl = await getSlugForLearn(req.query.id, token);
		} else if (req.query.typeValue === 'explore_products') {
			previewRedirectSlugUrl = await getSlugForExploreProducts(req.query.id, token);
		} else {
			console.error(`preview.PreviewMethod: unknown post type - cannot do preview!`, req.query);
			return res.status(401).json({ message: 'Unknown post type' });
		}
	} catch (err) {
		console.error(
			`preview.PreviewMethod: exception trying to lookup slug for for id: ${req.query.id} and typeValue: ${req.query.typeValue}, cannot continue`,
			err
		);
		return res.status(401).json({ message: 'Exception looking up id for type' });
	}

	if (!previewRedirectSlugUrl) {
		console.error(
			`preview.PreviewMethod: unable to get a valid previewRedirectSlugUrl for id: ${req.query.id} and typeValue: ${req.query.typeValue}, cannot continue`
		);
		return res.status(401).json({ message: 'Invalid slug' });
	}

		// Purge the edge cache for the preview path
		try {
			await purgePaths([previewRedirectSlugUrl]);
			console.log(`Successfully purged edge cache for path: ${previewRedirectSlugUrl}`);
		} catch (error) {
			console.error('Error purging edge cache:', error);
		}

	// Enable Preview Mode by setting the cookies
	res.setPreviewData(
		{
			id: req.query.id,
			token: token,
		},
		{
			maxAge: 60, // The preview mode cookies expire in 1 minute
		}
	);

	console.log('preview.previewRedirectSlugUrl:', previewRedirectSlugUrl);

	// Redirect to the path from the fetched post
	// We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
	res.setHeader('Cache-Control', 'private, no-store, no-cache, must-revalidate, max-age=0');
	res.setHeader('Pragma', 'no-cache');
	res.setHeader('Expires', '0');
	res.redirect(previewRedirectSlugUrl);
};

// TODO:: do these need to factor in uri instead of slug for supporting deep routes..?
// TODO:: switch to using named paths in StringConstants (and update other references elsewhere in the code)
const getSlugForPage = async (id, token) => {
	const page = await getBasicsByDatabaseID(id, true, token, 'pages');
	const slug = page?.slug;
	return slug ? `\\${slug}` : null;
};

const getSlugForPost = async (id, token) => {
	const post = await getBasicsByDatabaseID(id, true, token, 'posts');
	const slug = post?.slug;
	return slug ? `\\blog\\${slug}` : null;
};

const getSlugForCaseStudy = async (id, token) => {
	const data = await getBasicsByDatabaseID(id, true, token, 'case_study');
	const slug = data?.slug;
	return slug ? `\\case-studies\\${slug}` : null;
};

const getSlugForNews = async (id, token) => {
	const data = await getBasicsByDatabaseID(id, true, token, 'news');
	const slug = data?.slug;
	return slug ? `\\news\\${slug}` : null;
};

const getSlugForPartner = async (id, token) => {
	const data = await getBasicsByDatabaseID(id, true, token, 'partner');
	const slug = data?.slug;
	return slug ? `\\partners\\${slug}` : null;
};

const getSlugForTeamMember = async (id, token) => {
	const data = await getBasicsByDatabaseID(id, true, token, 'team_member');
	const slug = data?.slug;
	return slug ? `\\team\\${slug}` : null;
};

const getSlugForResource = async (id, token) => {
	const data = await getBasicsByDatabaseID(id, true, token, 'resource');
	const slug = data?.slug;
	return slug ? `\\resources\\${slug}` : null;
};

const getSlugForEvent = async (id, token) => {
	const data = await getBasicsByDatabaseID(id, true, token, 'events');
	const slug = data?.slug;
	return slug ? `\\events\\${slug}` : null;
};

const getSlugForLandingPage = async (id, token) => {
	const data = await getBasicsByDatabaseID(id, true, token, 'landing_pages');
	const slug = data?.slug;
	return slug ? `\\lp\\${slug}` : null;
};

const getSlugForLearn = async (id, token) => {
	const data = await getBasicsByDatabaseID(id, true, token, 'learn');
	const slug = data?.slug;
	return slug ? `\\learn\\${slug}` : null;
};

const getSlugForExploreProducts = async (id, token) => {
	const data = await getBasicsByDatabaseID(id, true, token, 'explore_products');
	const slug = data?.slug;
	return slug ? `\\explore-products\\${slug}` : null;
};

export default PreviewMethod;
