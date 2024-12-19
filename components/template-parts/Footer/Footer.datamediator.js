import GlobalConstants from '../../../GlobalConstants';
import { mediateUrlPath } from '../../../wplib/urlHelpers';
import { langTransform } from '../../../wplib/util';

// takes in 'footerMenu' level from GraphQL response, such that gqlMenuData.language would resolve
export function transformToFooterStructure(menus, gqlGlobalBackendOptions, locale) {
	// console.log('gqlMenuData', gqlMenuData);
	// console.log('gqlGlobalBackendOptions', gqlGlobalBackendOptions);
	const pageLanguage = langTransform(locale);
	const footerMenus = menus?.nodes.filter((menu) => menu.language == pageLanguage);
	const [footerMenu = null] = footerMenus?.filter((menu) => menu.locations[0] == 'FOOTER_MENU') ?? [];
	const [secondaryFooterMenu = null] =
		footerMenus?.filter((menu) => menu.locations[0] == 'SECONDARY_FOOTER_MENU') ?? [];

	if (!gqlGlobalBackendOptions || !secondaryFooterMenu) {
		console.error(`transformToFooterStructure: gqlGlobalBackendOptions or gqlSecondaryMenuData is undefined`);
	}

	// Pull out the social settings
	let twitterUri = GlobalConstants.Footer.TwitterFallbackUrl;
	let facebookUri = GlobalConstants.Footer.FacebookFallbackUrl;
	let linkedinUri = GlobalConstants.Footer.LinkedInFallbackUrl;
	let shiftsyncUri = GlobalConstants.Footer.ShiftsyncFallbackUrl;
	let youtubeUri = GlobalConstants.Footer.YoutubeFallbackUrl;
	gqlGlobalBackendOptions?.settingsSocial?.globalSocialChannels.forEach((socialChannel) => {
		if (socialChannel.title.toLowerCase() === 'twitter') {
			twitterUri = socialChannel.website;
		} else if (socialChannel.title.toLowerCase() === 'facebook') {
			facebookUri = socialChannel.website;
		} else if (socialChannel.title.toLowerCase() === 'linkedin') {
			linkedinUri = socialChannel.website;
		} else if (socialChannel.title.toLowerCase() === 'shiftsync') {
			shiftsyncUri = socialChannel.website;
		} else if (socialChannel.title.toLowerCase() === 'youtube') {
			youtubeUri = socialChannel.website;
		} 
	});

	// process menu items
	let footerMenuColumns = footerMenu?.menuItems?.nodes.map((gqlMenuColumn) => {
		return {
			title: gqlMenuColumn.label,
			menu: gqlMenuColumn.childItems.nodes.map((gqlMenuItem) => {
				return {
					linkText: gqlMenuItem.label,
					target: gqlMenuItem.target,
					uri: mediateUrlPath(gqlMenuItem.url),
				};
			}),
		};
	});

	// process secondary menu items
	let secondaryFooterMenuEntries = secondaryFooterMenu?.menuItems?.nodes.map((secondaryMenuEntry) => {
		// console.log('secondaryMenuEntry', secondaryMenuEntry);
		return {
			linkText: secondaryMenuEntry.label ?? null,
			target: secondaryMenuEntry.target ?? null,
			uri: mediateUrlPath(secondaryMenuEntry.url) ?? '#',
		};
	});

	let footerData = {
		footerMenuColumns: footerMenuColumns ?? null,

		secondaryFooterMenuEntries: {
			text: `Copyright ©${new Date().getFullYear()} Tricentis. All Rights Reserved.`,
			menuEntry: secondaryFooterMenuEntries ?? null,
			languages: [
				{
					name: 'En',
				},
				{
					name: 'De',
				},
				{
					name: 'Fr',
				},
			],
		},
		socialMedia: [
			{
				icon: 'twitter',
				uri: twitterUri,
				alt: 'Twitter Icon',
			},
			{
				icon: 'facebook',
				uri: facebookUri,
				alt: 'Facebook Icon',
			},
			{
				icon: 'linkedin',
				uri: linkedinUri,
				alt: 'LinkedIn Icon',
			},
			{
				icon: 'shiftsync',
				uri: shiftsyncUri,
				alt: 'Shiftsync Icon',
			},
			{
				icon: 'youtube',
				uri: youtubeUri,
				alt: 'Youtube Icon',
			},
		],
	};

	// Pull out the footer CTA settings
	let footerCTALink = GlobalConstants.Footer.CTAFallbackLink;
	let footerCTATitle = '';
	let footerCTAText = '';
	if (gqlGlobalBackendOptions?.settingsFooter?.footerGroup?.footerDescription) {
		footerCTAText = gqlGlobalBackendOptions?.settingsFooter?.footerGroup?.footerDescription;
	}
	if (gqlGlobalBackendOptions?.settingsFooter?.footerGroup?.link) {
		footerCTALink = gqlGlobalBackendOptions?.settingsFooter?.footerGroup?.link?.url;
		footerCTATitle = gqlGlobalBackendOptions?.settingsFooter?.footerGroup?.link?.title;
	}

	// pull in real flag CTA settings
	footerData.footerActionBar = {
		logo: GlobalConstants.Footer.FooterLogo,
		ctaHref: mediateUrlPath(footerCTALink),
		ctaTitle: footerCTATitle,
		ctaText: footerCTAText,
	};

	// console.log('footerData', footerData);

	return footerData;
}
