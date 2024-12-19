import { mediateUrlPath } from '../../../wplib/urlHelpers';

// Takes GraphQL module specific response and turns it in the structure the module wants (see *.gqlresponse.json and *.sampledata.js for input and output examples)
export function gqlSecondaryNavResponseToSecondaryNav(t, gqlModuleData) {
	if (!gqlModuleData) {
		console.error('ERROR: gqlSecondaryNavResponseToSecondaryNav: gqlModuleData is undefined');
		return null;
	}

	let navigation = gqlModuleData.navItems?.map((item) => {
		let parsedNavLinks = {};
		if (item.linkUrl) {
			parsedNavLinks.linkText = item.linkText;
			parsedNavLinks.uri = item.linkUrl;
			parsedNavLinks.openLinkInANewTab = item.openLinkInANewTab;
			if (item.linkUrl.startsWith('http') || item.linkUrl.startsWith('https')) {
				parsedNavLinks.uri = mediateUrlPath(item.linkUrl);
				parsedNavLinks.target = '_blank';
			}
		} else {
			console.error(`SecondaryNav - linkUrl is missing for ${item.linkText}`);
			parsedNavLinks.uri = `#${item.linkUrl}`;
		}
		return parsedNavLinks;
	});

	const defaultSecondaryNavData = {
		logo: {
			desktop: {
				url: gqlModuleData.logo?.mediaItemUrl,
				alt: gqlModuleData.logo?.altText ?? '',
			},
			mobile: t('secondaryNav.mobileTitle'),
		},
		navigation,
	};
	if (gqlModuleData.displayCta && gqlModuleData.displayCta.toLowerCase() === 'yes') {
		defaultSecondaryNavData.cta = {
			buttonStyle: 'PrimaryDefault',
			buttonText: gqlModuleData.orangeCta?.link?.title,
			link: mediateUrlPath(gqlModuleData.orangeCta?.link?.url),
			seoText: gqlModuleData.orangeCta?.seoText ?? '',
			adaText: gqlModuleData.orangeCta?.adaText ?? ''
		};
		defaultSecondaryNavData.secondaryCta = {
			buttonStyle: 'SecondaryReverse-white',
			buttonText: gqlModuleData.outlinedCta?.link?.title,
			link: mediateUrlPath(gqlModuleData.outlinedCta?.link?.url),
			seoText: gqlModuleData.outlinedCta?.seoText ?? '',
			adaText: gqlModuleData.outlinedCta?.adaText ?? ''
		};
	}

	return defaultSecondaryNavData;
}
