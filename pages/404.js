import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getGlobalSettings } from '../wplib/globalSettings';
import BasePageWrapper from '../components/page-templates/BasePageWrapper/BasePageWrapper';
import { transformToFooterStructure } from '../components/template-parts/Footer/Footer.datamediator';
import { pageHeaderToGlobalAlert } from '../data-mediators/PageHeaderToGlobalAlertMediator';
import { mainMenuToMenu } from '../components/template-parts/Header/Header.datamediator';
import Custom404PageTemplate from '../components/page-templates/404PageTemplate/404PageTemplate';
import { get404Page } from '../wplib/notFound404Page';

export default function Custom404({ globalAlertData, footerMenu, menu, notFound404PageData }) {
	console.log(`404.Custom404() - rendering page`);

	// TODO:: define SEO data for this page
	const seoData = {};
	return (
		<BasePageWrapper title="404" seoData={seoData} translatedPages={menu?.translatedPages}>
			<Custom404PageTemplate
				globalAlertData={globalAlertData}
				headerMenuData={menu}
				footerMenu={footerMenu}
				notFound404Page={notFound404PageData}
			/>
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

	const translatedPages = [];

	const menu = mainMenuToMenu(menus, globalSettings, translatedPages, locale);

	const { notFound404PageData } = await get404Page(locale);

	return {
		props: {
			globalAlertData,
			footerMenu: mediatedFooterMenu,
			menu,
			...(await serverSideTranslations(locale, ['common'])),
			notFound404PageData,
		},
	};
}
