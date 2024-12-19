import { getGlobalSettings } from '../../wplib/globalSettings';
import { getRevalidateOptions, handleInvalidDataResponse } from '../../wplib/util';
import GlobalConstants from '../../GlobalConstants';
import { convertWPLocaleToNextJSLocale } from '../../wplib/util';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import BasePageWrapper from '../../components/page-templates/BasePageWrapper/BasePageWrapper';
import ExploreProductTemplate from '../../components/page-templates/ExploreProductTemplate/ExploreProductTemplate';
import { transformToFooterStructure } from '../../components/template-parts/Footer/Footer.datamediator';
import { pageHeaderToGlobalAlert } from '../../data-mediators/PageHeaderToGlobalAlertMediator';
import { mainMenuToMenu } from '../../components/template-parts/Header/Header.datamediator';
import {
	getAllExploreProducts,
	getPreviewExploreProductsDataByDatabaseID,
	getPublishedExploreProductsDataBySlug,
} from '../../wplib/exploreProducts';

export default function Page({ slug, exploreProduct, menu }) {
	const { title, seo } = exploreProduct;

	console.log(
		`explore-products/[slug].Page() - rendering explore products: ${GlobalConstants.FrontendRoutes.ExploreProducts}/${slug}`
	);

	return (
		<BasePageWrapper title={title ?? ''} seoData={seo} translatedPages={menu?.translatedPages}>
			<ExploreProductTemplate exploreProduct={exploreProduct} />
		</BasePageWrapper>
	);
}

export async function getStaticProps(context = {}) {
	// console.log('explore-products/[slug].getStaticProps() - context', context);

	const slug = context?.params.slug;
	const isPreview = Boolean(context?.preview); // force to boolean
	var databaseID = isPreview ? context?.previewData?.id : null;
	var token = isPreview ? context?.previewData?.token : null;

	// get global data (ex: menus, etc.) that doesn't change per page
	const { globalSettings, menus } = await getGlobalSettings(isPreview, context.locale);
	const mediatedFooterMenu = transformToFooterStructure(menus, globalSettings, context.locale);

	// get details from WP
	let exploreProduct,
		translated = null;

	try {
		if (isPreview) {
			({ exploreProduct, translated } = await getPreviewExploreProductsDataByDatabaseID(
				databaseID,
				token,
				context.locale
			));
		} else {
			({ exploreProduct, translated } = await getPublishedExploreProductsDataBySlug(slug, context.locale));
		}
	} catch (error) {
		console.log(`explore-products/[slug].getStaticProps() - error while fetching exploreProduct`, error);
		return handleInvalidDataResponse(error);
	}

	const menu = mainMenuToMenu(menus, globalSettings, translated, context.locale);

	// determine our global alert settings based off global settings and page settings
	const globalAlertData = pageHeaderToGlobalAlert(globalSettings, exploreProduct?.pageHeader);

	const revalidateOptions = getRevalidateOptions();
	return {
		props: {
			slug,
			exploreProduct,
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
			`explore-products/[slug].getStaticPaths() - NO_PRERENDERED_PATHS_FALLBACK_ONLY is on, not pre-generating any paths`
		);
		return {
			paths: [],
			fallback: 'blocking',
		};
	}

	const exploreProducts = await getAllExploreProducts();

	const paths = exploreProducts?.map((exploreProduct) => {
		const pageLocale = convertWPLocaleToNextJSLocale(exploreProduct?.wpml_current_locale);
		return {
			params: {
				slug: exploreProduct?.slug,
			},
			locale: pageLocale,
		};
	});

	// console.log('explore-product paths', JSON.stringify(paths));
	return {
		paths,
		fallback: false,
	};
}
