import GlobalConstants from '../../../GlobalConstants';
import { mediateUrlPath } from '../../../wplib/urlHelpers';
import { langTransform } from '../../../wplib/util';

export function mainMenuToMenu(mainMenu, globalSettings, translated = null, locale = 'en-US') {
	if (!mainMenu) return null;
	const pageLanguage = langTransform(locale);

	const menuByLang = mainMenu.nodes.filter((menu) => {
		return menu.language === pageLanguage;
	});

	const menuOrder = [
		'PRODUCT_MEGAMENU',
		'SOLUTIONS_MEGAMENU',
		'SERVICE_MEGAMENU',
		'RESOURCES_MEGAMENU',
		'PRICING_MEGAMENU',
	];
	const globals = globalSettings?.settingsHeader ?? null;
	const headerMegaMenu = headerMegaMenuBuilder(menuByLang, menuOrder);
	const logos = logoBuilder(globals);
	const languages = languagesBuilder(GlobalConstants?.Languages);
	const flag = flagBuilder(globals?.flagCta);
	const headerTopDataMenu = menuByLang.filter((menu) => menu.locations[0] === 'TOP_MENU')[0];

	const HeaderExampleData = {
		languages: languages,
		translatedPages: translated,
		headerTopData: {
			languages: languages,
			translatedPages: translated,
			menu: headerTopDataMenu?.menuItems?.nodes ?? null,
		},
		logos: logos,
		headerMegaMenu: headerMegaMenu,
		flag: flag,
	};

	return HeaderExampleData;
}

function headerMegaMenuBuilder(menu, menuOrder) {
	if (!menu) return null;

	const megaMenus = [];

	for (let i = 0; i < menuOrder.length; i++) {
		menu.map((navItems) => {
			if (menuOrder[i] !== navItems.locations[0]) return; // Used to mantain the menu order

			const { MenusACF: CTA, FeaturedArticle, menuItems: megaMenu = null } = navItems;
			const [megaMenuPrimary = null] = megaMenu?.nodes;
			const { nodes: subMenu = null } = megaMenuPrimary?.childItems ?? {};
			const featureSection = featuredSectionRenderer(FeaturedArticle);

			return megaMenus.push({
				mainTitle: {
					label: megaMenuPrimary?.label,
					href: megaMenuPrimary?.url,
				},
				menuStyle: navItems.locations[0] == 'PRODUCT_MEGAMENU' ? 'Secondary' : 'Primary',
				globalCTA: {
					title: CTA?.globalCta?.title ?? null,
					uri: mediateUrlPath(CTA?.globalCta?.url ?? null),
					target: CTA?.globalCta?.target ?? null,
				},
				columnsType: CTA?.columnsType ?? null,
				headerMenuColumn:
					subMenu &&
					subMenu.map((column) => {
						return (
							column && {
								title: column?.label,
								titleUri: mediateUrlPath(column?.url),
								column: column?.megaMenuItemLocation?.column ?? null,
								cssClasses: column?.cssClasses ?? null,
								menu: column?.childItems?.nodes.map((link) => {
									return {
										uri: mediateUrlPath(link?.url),
										linkText: link?.label,
										target: link?.target,
										description: link?.ProductMenuLinkDescription?.description,
										buttonStyle: link?.cssClasses.includes('Secondary') ? 'TertiaryDefault' : null,
										cssClasses: link?.cssClasses ?? null,
									};
								}),
							}
						);
					}),
				featuredPostData: featureSection,
			});
		});
	}

	return megaMenus;
}

function logoBuilder(settingsHeader) {
	const logo = settingsHeader?.globalHeaderLogo;
	const coloredLogo = settingsHeader?.globalHeaderColorLogo;
	const logos = {
		logo: {
			uri: logo?.mediaItemUrl ?? null,
			altText: logo?.altText ?? null,
		},
		coloredLogo: {
			uri: coloredLogo?.mediaItemUrl ?? null,
			altText: logo?.altText ?? null,
		},
	};

	return logos;
}

function languagesBuilder(languagesConstants) {
	const languages = Object.values(languagesConstants).map((language) => {
		return {
			name: language,
		};
	});

	return languages;
}

function flagBuilder(flag) {
	return {
		title: flag?.title ?? null,
		cta: mediateUrlPath(flag?.url ?? null),
	};
}

function featuredSectionRenderer(section) {
	let response = {};

	const manual = section?.manualFields;

	response = {
		image: {
			src: manual?.backgroundImage?.mediaItemUrl ?? null,
			alt: manual?.backgroundImage?.altText ?? null,
		},
		prehead: manual?.prehead ?? null,
		title: manual?.title ?? null,
		excerpt: manual?.excerpt ?? null,
		link: {
			href: mediateUrlPath(manual?.url ?? null),
		},
	};

	return response;
}
