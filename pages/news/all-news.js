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

export default function News({ newsData, globalAlertData, footerMenu, menu }) {
	console.log(`news/all-news.News() - rendering news: ${GlobalConstants.FrontendRoutes.News}/all-news`);

	// TODO:: define SEO data for this page
	const seoData = {
		fullHead: createFullHead(
			'Software Testing News - Tricentis',
			'Stay updated with the latest industry news. Explore insights from the world of test automation and keep ahead in software testing innovation with Tricentis.'
		),
	};

	return (
		<BasePageWrapper title={'News'} seoData={seoData} translatedPages={menu?.translatedPages}>
			<NewsArchive
				newsData={newsData}
				headerMenuData={menu}
				footerMenu={footerMenu}
				type={'news'}
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
			uri: '/news/all-news',
		},
		{
			locale: {
				locale: 'fr_FR',
			},
			uri: '/fr/news/all-news',
		},
		{
			locale: {
				locale: 'de_DE',
			},
			uri: '/de/news/all-news',
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
