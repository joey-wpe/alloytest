import GlobalConstants from '../../GlobalConstants';
import { getGlobalSettings } from '../../wplib/globalSettings';
import { getRevalidateOptions, createFullHead } from '../../wplib/util';
import BasePageWrapper from '../../components/page-templates/BasePageWrapper/BasePageWrapper';
import { transformToFooterStructure } from '../../components/template-parts/Footer/Footer.datamediator';
import { pageHeaderToGlobalAlert } from '../../data-mediators/PageHeaderToGlobalAlertMediator';
import { mainMenuToMenu } from '../../components/template-parts/Header/Header.datamediator';
import { getNewsYears } from '../../wplib/news';
import NewsArchive from '../../components/page-templates/NewsArchive/NewsArchive';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function PressReleases({ newsData, globalAlertData, footerMenu, menu }) {
	console.log(
		`news/all-press-releases.PressReleases() - rendering news: ${GlobalConstants.FrontendRoutes.News}/all-press-releases`
	);

	// TODO:: define SEO data for this page
	const seoData = {
		fullHead: createFullHead(
			'Latest Press Releases - Tricentis',
			'Discover the latest Tricentis press releases, highlighting innovations and industry insights. Stay up to date on software testing and quality assurance.'
		),
	};

	return (
		<BasePageWrapper title={'Press Releases'} seoData={seoData} translatedPages={menu?.translatedPages}>
			<NewsArchive
				newsData={newsData}
				headerMenuData={menu}
				footerMenu={footerMenu}
				type={'press'}
				globalAlertData={globalAlertData}
			/>
		</BasePageWrapper>
	);
}

export async function getStaticProps(context = {}) {
	const { globalSettings, menus } = await getGlobalSettings(false, context.locale);
	const { newsData } = await getNewsYears();

	const translatedPages = [
		{
			locale: {
				locale: 'en_US',
			},
			uri: '/news/all-press-releases',
		},
		{
			locale: {
				locale: 'fr_FR',
			},
			uri: '/fr/news/all-press-releases',
		},
		{
			locale: {
				locale: 'de_DE',
			},
			uri: '/de/news/all-press-releases',
		},
	];

	// we want to manipulate our response data here, so internal components are not dependent on knowledge of the underlying data
	const mediatedFooterMenu = transformToFooterStructure(menus, globalSettings, context.locale);

	const menu = mainMenuToMenu(menus, globalSettings, translatedPages, context.locale);

	// determine our global alert settings based off global settings and page settings
	const globalAlertData = pageHeaderToGlobalAlert(globalSettings, null);

	const revalidateOptions = getRevalidateOptions();
	return {
		props: {
			newsData,
			globalAlertData,
			footerMenu: mediatedFooterMenu,
			menu,
			...(await serverSideTranslations(context.locale, ['common'])),
		},
		...revalidateOptions,
	};
}
