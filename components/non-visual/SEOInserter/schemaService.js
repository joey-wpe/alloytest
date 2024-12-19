/**
 * Function to iterate an object.
 *
 * @param {Object} obj Object to recursivelly iterate.
 * @param {*} callback
 *
 * @returns {void}
 */
const objectIterator = (obj, callback = (obj, key) => {}) => {
	for (let key in obj) {
		if (typeof obj[key] === 'object') {
			if (Array.isArray(obj[key])) {
				// loop through array
				for (let i = 0; i < obj[key].length; i++) {
					if (typeof obj[key][i] === 'object')
						objectIterator(obj[key][i], callback);
					else if (typeof obj[key][i] === 'string') {
						callback(obj[key], i);
					}
				}
			} else {
				// call function recursively for object
				objectIterator(obj[key], callback);
			}
		} else {
			callback(obj, key);
		}
	}
};

/**
 * Check if URL points to an image.
 * @param {*} url URL string.
 * @returns {Boolean}
 */
const isImgUrl = (url) => {
	return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
};

const handleUrls = (obejct, key) => {
	if (typeof obejct[key] !== 'string') return;
	if (isImgUrl(obejct[key])) return;
	if (obejct[key].includes('https://be.tricentis.com')) obejct[key] = obejct[key].replace('https://be.tricentis.com', 'https://hgz3dh8po22gky8sy6ec4aoba.js.wpenginepowered.com');
	if (obejct[key].includes('https://be-develop.tricentis.com')) obejct[key] = obejct[key].replace('https://be-develop.tricentis.com', 'https://hgz3dh8po22gky8sy6ec4aoba.js.wpenginepowered.com');
	if (obejct[key].includes('https://be-test.tricentis.com')) obejct[key] = obejct[key].replace('https://be-test.tricentis.com', 'https://hgz3dh8po22gky8sy6ec4aoba.js.wpenginepowered.com');
	if (obejct[key].includes('https://triapinenew.wpenginepowered.com')) obejct[key] = obejct[key].replace('https://triapinenew.wpenginepowered.com', 'https://hgz3dh8po22gky8sy6ec4aoba.js.wpenginepowered.com');
	if (obejct[key].includes('https://tricstaging.wpenginepowered.com')) obejct[key] = obejct[key].replace('https://tricstaging.wpenginepowered.com', 'https://hgz3dh8po22gky8sy6ec4aoba.js.wpenginepowered.com');
	if (obejct[key].includes('https://tribedevelop.wpenginepowered.com')) obejct[key] = obejct[key].replace('https://tribedevelop.wpenginepowered.com', 'https://hgz3dh8po22gky8sy6ec4aoba.js.wpenginepowered.com');
};

/**
 * Blog article Schema.
 * Logic to alter or replace the default Yoast Schema.
 *
 * @param {Object} yoastSchema JSON object representing the dafault Schema provided by the Yoast WP plugin.
 * @param {Object|null} customSchema
 * 
 * @returns {Object} Schema
 */
const getArticleSchema = (yoastSchema, customSchema = null) => {
	const schemaGraphs = yoastSchema['@graph'];
	objectIterator(yoastSchema, handleUrls);

	const hasArticleGraph = schemaGraphs.some((graph) => graph.hasOwnProperty('@type') && graph['@type'] === 'Article');
	const { breadcrumb, ...webPageGraph } = schemaGraphs.find((graph) => graph['@type'] === 'WebPage') || {};

	if (!hasArticleGraph && webPageGraph) {
		schemaGraphs.push({
			...webPageGraph,
			'@id': `${webPageGraph['@id']}#article`,
			'@type': 'Article',
			'@headline': webPageGraph.name,
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': webPageGraph.url,
			},
			author: {
				'@type': 'Person',
				'@id': 'Tricentis Staff',
			},
			publisher: {
				'@id': 'https://tricentis.com/#organization',
			},
		});
	}

	return { ...yoastSchema, '@graph': schemaGraphs };
}

/**
 * Product Schema.
 * Logic to alter or replace the default Yoast Schema.
 *
 * @param {Object} yoastSchema JSON object representing the dafault Schema provided by the Yoast WP plugin.
 * @param {Object|null} customSchema
 * 
 * @returns {Object} Schema
 */
const getProductSchema = (yoastSchema, customSchema = null) => {
	// Add the product schema logic here.
    return yoastSchema;
}

/**
 * FAQ Schema.
 * Logic to alter or replace the default Yoast Schema.
 *
 * @param {Object} yoastSchema JSON object representing the dafault Schema provided by the Yoast WP plugin.
 * @param {Object|null} customSchema
 * 
 * @returns {Object} Schema
 */
const getFaqSchema = (yoastSchema, customSchema = null) => {
	// Add the product schema logic here.
    return yoastSchema;
}

/**
 * WebPage Schema.
 *
 * @param {Object} yoastSchema JSON object representing the dafault Schema provided by the Yoast WP plugin.
 * @param {Object|null} customSchema
 * 
 * @returns {Object} Schema
 */
const getWebPageSchema = (yoastSchema, customSchema = null) => {
	objectIterator(yoastSchema, handleUrls);

    return yoastSchema;
}

/**
 * Determines the page type. Based on the type, a specific Schema will be generated.
 *
 * @param {String} urlPath The page url.
 *
 * @returns {String} WebPage type.
 */
export const getPageType = (urlPath) => {
	const urlPieces = (urlPath || '').split('/');

	if (urlPieces.includes('learn') || urlPieces.includes('blog')) return 'article';
	// Add more rules here for other page types. Ex:
	// if (urlPieces.includes('product')) return 'product';

	return 'webPage';
}

const schemaStrategy = (type) => {
	switch (type) {
		case 'product':
			return getProductSchema;
		case 'faq':
			return getFaqSchema;
		case 'article':
			return getArticleSchema;
		default:
			return getWebPageSchema;
	}
};

// Update fullHead with schemaListItems.
export const updateFullHead = (schemaListItems = [], fullHead = '') => {
	const scriptTag = '<script type="application/ld+json" class="yoast-schema-graph">';
	const scriptStartIndex = fullHead.indexOf(scriptTag);
	let updatedfullHead = null;

	if (scriptStartIndex !== -1) {
		const scriptEndIndex = fullHead.indexOf('</script>', scriptStartIndex);
		const scriptContent = fullHead.slice(scriptStartIndex + scriptTag.length, scriptEndIndex);

		const jsonObject = JSON.parse(scriptContent);

		jsonObject['@graph']
			.filter((item) => item['@type'] === 'BreadcrumbList')
			.forEach((item) => (item.itemListElement = schemaListItems));

		updatedfullHead =
			fullHead.slice(0, scriptStartIndex + scriptTag.length) +
			JSON.stringify(jsonObject) +
			fullHead.slice(scriptEndIndex);
	}

	return updatedfullHead;
}

// Generate schema list items in the proper format.
export const generateSchemaListItems = (breadcrumbsLinks) => {
	const schemaListItems =
		breadcrumbsLinks?.map((listItem, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			item: {
				'@id': `${process.env.NEXT_PUBLIC_FRONTEND_URL}${listItem.url}`,
				name: listItem.label,
			},
		})) ?? null;

	return schemaListItems;
}

export const generateSchema = (type, yoastSchema) => {
	try {
		const schemaGenerator = schemaStrategy(type);
		const schema = schemaGenerator(JSON.parse(yoastSchema));
		return JSON.stringify(schema);
	} catch (error) {
		console.error('Error: Check Yoast schema format.', error);
		// Note: Schema could not be processed. Returning the initial value as is.
		return yoastSchema;
	}
};

export default generateSchema;
