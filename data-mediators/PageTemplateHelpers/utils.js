import GlobalConstants from '../../GlobalConstants';

/**
 * Description: Cleans the provided URI by removing backslashes.
 */
export const cleanURI = (uri) => {
	if (!uri) return null;
	return uri.replace(/\\/g, '');
};

/**
 * Description: Extracts the template name from the provided file path.
 */
export const extractTemplateName = (filePath) => {
	const parts = filePath?.split('/');
	const fileNameWithExtension = parts[parts.length - 1];
	return fileNameWithExtension;
};

/**
 * Description: Maps homepage URIs to their corresponding language-specific URIs.
 */
export const handleHomePageUri = (uri) => {
	const uriMap = {};

	/**
	 * Generate URI mappings dynamically.
	 * Example:
	 * {
	 *   '/homepage/': '/',
	 *   '/de/homepage/': '/de/'
	 * }
	 */
	GlobalConstants.Locales.forEach((locale) => {
		if (locale === 'en') {
			uriMap[`/homepage/`] = `/`;
		} else {
			uriMap[`/${locale}/homepage/`] = `/${locale}/`;
		}
	});

	return uriMap[uri] || uri;
};

/**
 * Description: Extracts the path name from the provided url.
 */
export const extractPathname = (url) => new URL(url)?.pathname;

/**
 * Description: Extracts the path name for english from the provided url.
 */
export const extractExactPathNameEN = (url, locale) => {
	const exactLocale = locale.split('_')[0] || null;
	const uri = extractPathname(url);
	// Remove the exact locale prefix from the pathname
	const enURI = uri.replace(`/${exactLocale}`, '');
	return enURI;
};
