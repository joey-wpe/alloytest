import { getGlobalSettings } from '../../wplib/globalSettings';
import { getRevalidateOptions } from '../../wplib/util';
import GlobalConstants from '../../GlobalConstants';
import { convertWPLocaleToNextJSLocale, handleInvalidDataResponse } from '../../wplib/util';
import BasePageWrapper from '../../components/page-templates/BasePageWrapper/BasePageWrapper';
import MarketingLandingTemplate from '../../components/page-templates/MarketingLandingTemplate/MarketingLandingTemplate';
import { transformToFooterStructure } from '../../components/template-parts/Footer/Footer.datamediator';
import { pageHeaderToGlobalAlert } from '../../data-mediators/PageHeaderToGlobalAlertMediator';
import { mainMenuToMenu } from '../../components/template-parts/Header/Header.datamediator';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
	getAllLandingPages,
	getPreviewLandingPageDataByDatabaseID,
	getPublishedLandingPageDataBySlug,
} from '../../wplib/landingPages';

export default function Page({ slug, globalAlertData, menu, footerMenu, landingPage, postTypeData }) {
	const { title, seo } = landingPage;

	console.log(`lp/[slug].Page() - rendering landing page: ${GlobalConstants.FrontendRoutes.LandingPages}/${slug}`);

	const headerMenuData = menu;
	return (
		<BasePageWrapper title={title ?? ''} seoData={seo} translatedPages={menu?.translatedPages}>
			<MarketingLandingTemplate
				globalAlertData={globalAlertData}
				headerMenuData={headerMenuData}
				footerMenu={footerMenu}
				landingPage={landingPage}
				postTypeData={postTypeData}
			/>
		</BasePageWrapper>
	);
}

export async function getStaticProps(context = {}) {
	// console.log('lp/[slug].getStaticProps() - context', context);

	const slug = context?.params.slug;
	const isPreview = Boolean(context?.preview); // force to boolean
	var databaseID = isPreview ? context?.previewData?.id : null;
	var token = isPreview ? context?.previewData?.token : null;

	// get global data (ex: menus, etc.) that doesn't change per page
	const { globalSettings, menus } = await getGlobalSettings(isPreview, context.locale);
	const mediatedFooterMenu = transformToFooterStructure(menus, globalSettings, context.locale);

	// get details from WP
	let landingPage,
		postTypeData,
		translated = null;

	try {
		if (isPreview) {
			({ landingPage, postTypeData, translated } = await getPreviewLandingPageDataByDatabaseID(
				databaseID,
				token,
				context.locale
			));
		} else {
			({ landingPage, postTypeData, translated } = await getPublishedLandingPageDataBySlug(slug, context.locale));
		}
	} catch (error) {
		console.log(`lp/[slug].getStaticProps() - error while fetching landingPage`, error);
		return handleInvalidDataResponse(error);
	}

	const menu = mainMenuToMenu(menus, globalSettings, translated, context.locale);

	// determine our global alert settings based off global settings and page settings
	const globalAlertData = pageHeaderToGlobalAlert(globalSettings, landingPage.pageHeader);

	const revalidateOptions = getRevalidateOptions();
	return {
		props: {
			slug,
			landingPage,
			postTypeData,
			globalAlertData,
			footerMenu: mediatedFooterMenu,
			menu,
			...(await serverSideTranslations(context.locale, ['common'])),
		},
		...revalidateOptions,
	};
}

// NOTE:: getStaticPaths always runs server side (ref: https://nextjs.org/docs/basic-features/data-fetching/get-static-paths)
export async function getStaticPaths() {
	// if the flag is set, do a build only - no building of actual pages
	if (process.env.NO_PRERENDERED_PATHS_FALLBACK_ONLY === 'on') {
		console.info(`lp/[slug].getStaticPaths() - NO_PRERENDERED_PATHS_FALLBACK_ONLY is on, not pre-generating any paths`);
		return {
			paths: [],
			fallback: 'blocking',
		};
	}

	const landingPages = await getAllLandingPages();

	const paths = landingPages?.map((landingPage) => {
		const pageLocale = convertWPLocaleToNextJSLocale(landingPage?.wpml_current_locale);
		return {
			params: {
				slug: landingPage?.slug,
			},
			locale: pageLocale,
		};
	});

	// console.log('landing page paths', paths);
	return {
		paths,
		fallback: false,
	};
}
