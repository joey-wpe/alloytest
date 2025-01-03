import { getGlobalSettings } from '../../wplib/globalSettings';
import { getRevalidateOptions } from '../../wplib/util';
import GlobalConstants from '../../GlobalConstants';
import { convertWPLocaleToNextJSLocale, handleInvalidDataResponse } from '../../wplib/util';
import { getAllPartners, getPreviewPartnerDataByDatabaseID, getPublishedPartnerDataBySlug } from '../../wplib/partners';
import BasePageWrapper from '../../components/page-templates/BasePageWrapper/BasePageWrapper';
import { transformToFooterStructure } from '../../components/template-parts/Footer/Footer.datamediator';
import { pageHeaderToGlobalAlert } from '../../data-mediators/PageHeaderToGlobalAlertMediator';
import { mainMenuToMenu } from '../../components/template-parts/Header/Header.datamediator';
import { globalSettingsAndPageFooterToPageCTAData } from '../../data-mediators/PageFooterAndSettingsToPageCTA';
import ModularTemplate from '../../components/page-templates/ModularTemplate/ModularTemplate';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// NOTE:: this method is called with data from getStaticProps for a specific route (as generated by getStaticPaths())
export default function Page({ slug, postTypeData, partner, globalAlertData, footerMenu, pageCTAData, menu }) {
	const { uri, title, seo, content } = partner;

	console.log(`partners/[slug].Page() - rendering partner: ${GlobalConstants.FrontendRoutes.Partners}/${slug}`);

	return (
		<BasePageWrapper title={title ?? ''} seoData={seo} translatedPages={menu?.translatedPages}>
			<ModularTemplate
				postTypeData={postTypeData}
				pageData={partner}
				pageCTAData={pageCTAData}
				globalAlertData={globalAlertData}
				headerMenuData={menu}
				footerMenu={footerMenu}
			/>
		</BasePageWrapper>
	);
}

export async function getStaticProps(context = {}) {
	// console.log('partners/[slug].getStaticProps() - context', context);

	const slug = [context?.params.slug];
	const isPreview = Boolean(context?.preview); // force to boolean
	var databaseID = isPreview ? context?.previewData?.id : null;
	var token = isPreview ? context?.previewData?.token : null;

	// get global data (ex: menus, etc.) that doesn't change per page
	const { globalSettings, menus } = await getGlobalSettings(isPreview, context.locale);
	const mediatedFooterMenu = transformToFooterStructure(menus, globalSettings, context.locale);

	// get details from WP
	let partner,
		postTypeData,
		translated = null;

	try {
		if (isPreview) {
			({ partner, postTypeData, translated } = await getPreviewPartnerDataByDatabaseID(
				databaseID,
				token,
				context.locale
			));
		} else {
			({ partner, postTypeData, translated } = await getPublishedPartnerDataBySlug(slug, context.locale));
		}
	} catch (error) {
		console.log(`partners/[slug].getStaticProps() - error while fetching partner`, error);
		return handleInvalidDataResponse(error);
	}

	const menu = mainMenuToMenu(menus, globalSettings, translated, context.locale);

	// determine our global alert settings based off global settings and page settings
	const globalAlertData = pageHeaderToGlobalAlert(globalSettings, partner.pageHeader);
	const pageCTAData = globalSettingsAndPageFooterToPageCTAData(globalSettings, partner.pageFooter);

	const revalidateOptions = getRevalidateOptions();
	return {
		props: {
			slug,
			partner,
			postTypeData,
			globalAlertData,
			pageCTAData,
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
	if (process.env.NO_PRERENDERED_PATHS_FALLBACK_ONLY === 'on' || process.env.SELECTIVE_PRERENDER === 'on') {
		console.info(
			`partners/[slug].getStaticPaths() - NO_PRERENDERED_PATHS_FALLBACK_ONLY or SELECTIVE_PRERENDER is on, not pre-generating any paths`
		);
		return {
			paths: [],
			fallback: 'blocking',
		};
	}

	const partners = await getAllPartners();
	const paths = partners.map((partnerPage) => {
		let pageLocale = convertWPLocaleToNextJSLocale(partnerPage.wpml_current_locale);
		return {
			params: {
				slug: partnerPage.slug,
			},
			locale: pageLocale,
		};
	});

	//console.log('partners paths=', paths);
	return {
		paths,
		fallback: false,
	};
}
