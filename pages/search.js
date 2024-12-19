import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getGlobalSettings } from '../wplib/globalSettings';
import BasePageWrapper from '../components/page-templates/BasePageWrapper/BasePageWrapper';
import SearchTemplate from '../components/page-templates/SearchTemplate/SearchTemplate';
import { transformToFooterStructure } from '../components/template-parts/Footer/Footer.datamediator';
import { pageHeaderToGlobalAlert } from '../data-mediators/PageHeaderToGlobalAlertMediator';
import { mainMenuToMenu } from '../components/template-parts/Header/Header.datamediator';
import { createFullHead } from '../wplib/util';

export default function SearchPage({ globalAlertData, footerMenu, menu }) {
	console.log(`search.SearchPage() - rendering page`);

	// TODO:: define SEO data for this page
	const seoData = {
		fullHead: createFullHead(
			'Tricentis Search Results - Tricentis',
			'Do you want to learn more about software testing or our products? By using our search tool you can easily find what you need across our entire website.'
		),
	};

	return (
		<BasePageWrapper title={'Search'} seoData={seoData} translatedPages={menu?.translatedPages}>
			<SearchTemplate globalAlertData={globalAlertData} headerMenuData={menu} footerMenu={footerMenu} />
		</BasePageWrapper>
	);
}

export async function getStaticProps({ locale }) {
	// get details from GraphQL
	const { globalSettings, menus } = await getGlobalSettings(false, locale);

	// we want to manipulate our response data here, so internal components are not dependent on knowledge of the underlying data
	const mediatedFooterMenu = transformToFooterStructure(menus, globalSettings, locale);

	// determine our global alert settings based off global settings and page settings
	const globalAlertData = pageHeaderToGlobalAlert(globalSettings, null);

	const translatedPages = [
		{
			locale: {
				locale: 'en_US',
			},
			uri: '/search',
		},
		{
			locale: {
				locale: 'fr_FR',
			},
			uri: '/fr/search',
		},
		{
			locale: {
				locale: 'de_DE',
			},
			uri: '/de/search',
		},
	];

	const menu = mainMenuToMenu(menus, globalSettings, translatedPages, locale);

	return {
		props: {
			globalAlertData,
			footerMenu: mediatedFooterMenu,
			menu,
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}
