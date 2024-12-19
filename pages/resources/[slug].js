import { getGlobalSettings } from '../../wplib/globalSettings';
import { getRevalidateOptions, handleInvalidDataResponse } from '../../wplib/util';
import GlobalConstants from '../../GlobalConstants';
import { convertWPLocaleToNextJSLocale } from '../../wplib/util';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import BasePageWrapper from '../../components/page-templates/BasePageWrapper/BasePageWrapper';
import ResourceDetailTemplate from '../../components/page-templates/ResourceDetailTemplate/ResourceDetailTemplate';
import { transformToFooterStructure } from '../../components/template-parts/Footer/Footer.datamediator';
import { pageHeaderToGlobalAlert } from '../../data-mediators/PageHeaderToGlobalAlertMediator';
import { mainMenuToMenu } from '../../components/template-parts/Header/Header.datamediator';
import {
	getAllResources,
	getRecentResources,
	getPreviewResourceDataByDatabaseID,
	getPublishedResourceDataBySlug,
} from '../../wplib/resources';

export default function Page({ slug, postTypeData, globalAlertData, menu, footerMenu, resource }) {
	const { title, seo } = resource;

	console.log(`resources/[slug].Page() - rendering resource: ${GlobalConstants.FrontendRoutes.Resources}/${slug}`);

	const headerMenuData = menu;
	return (
		<BasePageWrapper title={title ?? ''} seoData={seo} translatedPages={menu?.translatedPages}>
			<ResourceDetailTemplate
				globalAlertData={globalAlertData}
				postTypeData={postTypeData}
				headerMenuData={headerMenuData}
				footerMenu={footerMenu}
				resource={resource}
			/>
		</BasePageWrapper>
	);
}

export async function getStaticProps(context = {}) {
	// console.log('resources/[slug].getStaticProps() - context', context);

	const slug = [context?.params.slug];
	const isPreview = Boolean(context?.preview); // force to boolean
	var databaseID = isPreview ? context?.previewData?.id : null;
	var token = isPreview ? context?.previewData?.token : null;

	// get global data (ex: menus, etc.) that doesn't change per page
	const { globalSettings, menus } = await getGlobalSettings(isPreview, context.locale);
	const mediatedFooterMenu = transformToFooterStructure(menus, globalSettings, context.locale);

	// get details from WP
	let resource,
		postTypeData,
		translated = null;

	try {
		if (isPreview) {
			({ resource, postTypeData, translated } = await getPreviewResourceDataByDatabaseID(
				databaseID,
				token,
				context.locale
			));
		} else {
			({ resource, postTypeData, translated } = await getPublishedResourceDataBySlug(slug, context.locale));
		}
	} catch (error) {
		console.log(`resources/[slug].getStaticProps() - error while fetching resource`, error);
		return handleInvalidDataResponse(error);
	}

	const menu = mainMenuToMenu(menus, globalSettings, translated, context.locale);

	// determine our global alert settings based off global settings and page settings
	const globalAlertData = pageHeaderToGlobalAlert(globalSettings, resource.pageHeader);

	const revalidateOptions = getRevalidateOptions();
	return {
		props: {
			slug,
			postTypeData,
			resource,
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
		console.info(
			`resources/[slug].getStaticPaths() - NO_PRERENDERED_PATHS_FALLBACK_ONLY is on, not pre-generating any paths`
		);
		return {
			paths: [],
			fallback: 'blocking',
		};
	}

	var resources;
	if (process.env.SELECTIVE_PRERENDER === 'on') {
		console.info(
			`resources/[slug].getStaticPaths() - limited build - only getting latest ${GlobalConstants.Options.ResourcePartialLimit} resources`
		);
		resources = await getRecentResources();
	} else {
		resources = await getAllResources();
	}

	const paths = resources.map((resourcesPage) => {
		let pageLocale = convertWPLocaleToNextJSLocale(resourcesPage.wpml_current_locale);
		return {
			params: {
				slug: resourcesPage.slug,
			},
			locale: pageLocale,
		};
	});

	return {
		paths,
		fallback: false,
	};
}
