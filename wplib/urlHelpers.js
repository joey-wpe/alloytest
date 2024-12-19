import GlobalConstants from '../GlobalConstants';

export function urlIsBackendLink(url) {
	if (typeof url !== 'string') return false;

	// see if the url starts with the backend url
	if (url.startsWith(process.env.BACKEND_SERVER)) {
		return true;
	}

	// see if the url starts with any known backend environments
	const matchingBackendDomain = GlobalConstants.BackendHostUrls.find((hostUrl) => url.startsWith(hostUrl));
	if (matchingBackendDomain) {
		return true;
	}

	return false;
}

export function mediateUrlPath(url) {
	if (typeof url !== 'string') return url;

	if (url === '') return url;

	// if the url startis with a hashtag then it's an on-page link or
	// if the url starts with a slash then it is already relative,do nothing.
	// if the url isn't a backend link then leave as-is
	// For any PDFs we keep the original URL (as the backend is hosting PDFs)
	if (
		url.startsWith('#') ||
		url.startsWith('/') ||
		!urlIsBackendLink(url) ||
		url.toLowerCase().endsWith('.pdf') ||
		url.toLowerCase().endsWith('.zip')
	) {
		return url;
	}

	// splits the URL into its parts
	let urlMatch = url.match(/(http[s]?:\/\/)?([^/\s]+\/)(.*)/, '');

	// if need to have logic based on the domain part of the url
	// if (urlMatch !== null && urlMatch[2]) {
	// 	const domainPart = urlMatch[2];
	// 	// do compare on domain part (ex: see if it matches "api.website.com/" - be sure to include trailing slash)
	// }

	// NOTE:: urlMatch can be null if the link is a phone number (ex: 'tel:800-325-2265')
	if (urlMatch !== null && urlMatch[3]) {
		return '/' + urlMatch[3]; // return just the route only
	}

	return url;
}

export function scrollToElementWithOffset(element, offset = 60, delay = 1500) {
	if (!element) return;

	// Scroll to the element with the offset
	window.scrollTo({
		top: element.getBoundingClientRect().top + window.scrollY - offset,
		behavior: 'smooth',
	});

	setTimeout(() => {
		element.scrollIntoView({ behavior: 'smooth' });
	}, delay);
}

export function handleScrollOrNavigate(event, argUrl) {
	event.preventDefault();

	// Get the current relative URL from the browser, including the hash
	const currentUrl = window.location.pathname + window.location.search + window.location.hash;

	// Remove the hash part from both URLs to compare the rest
	const baseArgUrl = argUrl.split('#')[0];
	const baseCurrentUrl = currentUrl.split('#')[0];

	// Get the hash part from both URLs
	const argHash = argUrl.split('#')[1] || '';
	const currentHash = currentUrl.split('#')[1] || '';

	// Compare the base URLs and check if only the hash has changed
	if (baseArgUrl === baseCurrentUrl) {
		if (argHash !== currentHash) {
			// Update the hash in the URL without reloading the page
			window.history.pushState(null, null, `#${argHash}`);
		}

		const element = document.getElementById(argHash);

		if (element) {
			scrollToElementWithOffset(element); // Use default values for offset and delay
		}
	} else {
		window.location.assign(argUrl); // Navigate to the new URL
	}
}
