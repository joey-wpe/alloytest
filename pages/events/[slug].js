import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getGlobalSettings } from '../../wplib/globalSettings';
import { getRevalidateOptions, handleInvalidDataResponse } from '../../wplib/util';
import { convertWPLocaleToNextJSLocale } from '../../wplib/util';
import GlobalConstants from '../../GlobalConstants';
import BasePageWrapper from '../../components/page-templates/BasePageWrapper/BasePageWrapper';
import EventDetailsTemplate from '../../components/page-templates/EventDetailsTemplate/EventDetails';
import { mainMenuToMenu } from '../../components/template-parts/Header/Header.datamediator';
import { transformToFooterStructure } from '../../components/template-parts/Footer/Footer.datamediator';
import { pageHeaderToGlobalAlert } from '../../data-mediators/PageHeaderToGlobalAlertMediator';
import {
	getPreviewEventDataByDatabaseID,
	getPublishedEventDataBySlug,
	getAllEventsStaticPaths,
} from '../../wplib/events';

export default function Page({ slug, globalAlertData, menu, footerMenu, event, postTypeData }) {
	const { title, seo } = event;
	console.log(`events/[slug].Page() - rendering event: ${GlobalConstants.FrontendRoutes.Events}/${slug}`);

	const headerMenuData = menu;

	return (
		<BasePageWrapper title={title ?? ''} seoData={seo} translatedPages={menu?.translatedPages}>
			<EventDetailsTemplate
				globalAlertData={globalAlertData}
				headerMenuData={headerMenuData}
				footerMenu={footerMenu}
				event={event}
				postTypeData={postTypeData}
			/>
		</BasePageWrapper>
	);
}

export async function getStaticProps(context = {}) {
	const slug = [context?.params.slug];
	const isPreview = Boolean(context?.preview); // force to boolean
	var databaseID = isPreview ? context?.previewData?.id : null;
	var token = isPreview ? context?.previewData?.token : null;

	// get global data (ex: menus, etc.) that doesn't change per page
	const { globalSettings, menus } = await getGlobalSettings(isPreview, context.locale);
	const mediatedFooterMenu = transformToFooterStructure(menus, globalSettings, context.locale);

	// get details from WP
	let event,
		postTypeData,
		translated = null;

	try {
		if (isPreview) {
			({ event, postTypeData, translated } = await getPreviewEventDataByDatabaseID(databaseID, token, context.locale));
		} else {
			({ event, postTypeData, translated } = await getPublishedEventDataBySlug(slug, context.locale));
		}
	} catch (error) {
		console.log(`events/[slug].getStaticProps() - error while fetching event`, error);
		return handleInvalidDataResponse(error);
	}

	const menu = mainMenuToMenu(menus, globalSettings, translated, context.locale);

	// determine our global alert settings based off global settings and page settings
	const globalAlertData = pageHeaderToGlobalAlert(globalSettings, event.eventsHeader);

	const revalidateOptions = getRevalidateOptions();
	return {
		props: {
			slug,
			event,
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
	//if the flag is set, do a build only - no building of actual pages
	if (process.env.NO_PRERENDERED_PATHS_FALLBACK_ONLY === 'on') {
		return {
			paths: [],
			fallback: 'blocking',
		};
	}

	const events = await getAllEventsStaticPaths();

	const eventsPath = events.map((eventPage) => {
		let pageLocale = convertWPLocaleToNextJSLocale(eventPage.wpml_current_locale);
		return {
			params: {
				slug: eventPage.slug,
			},
			locale: pageLocale,
		};
	});

	return {
		paths: eventsPath,
		fallback: false,
	};
}
