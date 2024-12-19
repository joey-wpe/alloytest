import React from 'react';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import FilteringModule from '../../template-parts/FilteringModule/FilteringModule';
import MastheadSwitcher from '../../non-visual/MastheadSwitcher/MastheadSwitcher';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { parsePostTypes } from '../ArchiveTemplate/ArchiveTemplateTaxSelector';

const FlexibleContentArea = dynamic(() => import('../../molecules/FlexibleContentArea/FlexibleContentArea'));

const CaseStudiesMainTemplate = ({
	postTypeData,
	pageData,
	pageCTAData,
	globalAlertData,
	headerMenuData,
	footerMenu,
}) => {
	const requestData = {
		post_type: 'case_study',
		taxonomies: [],
		fields: {
			acf: [],
			core: ['title', 'permalink', 'post_thumbnail_url', 'excerpt'],
		},
	};
	const { t } = useTranslation('common');

	const copyPrehead = t('caseStudy.preHead');
	const copyTitle = t('caseStudiesMain.title');
	const copyContent = {
		prehead: copyPrehead,
		title: copyTitle,
	};
	const parsedPostTypes = parsePostTypes(postTypeData, 'case_study');

	const flexModules = pageData.contentBlocksModules?.modules;
	return (
		<BaseTemplateWrapper
			globalAlertData={globalAlertData}
			headerMenuData={headerMenuData}
			pageCTAData={pageCTAData}
			footerMenu={footerMenu}
		>
			{/* Main guts of template - start */}

			{/* <MastheadMinimal {...mastheadSettings} /> */}
			<MastheadSwitcher pageHeader={pageData.pageHeader} page={pageData} />
			{flexModules && flexModules.length > 0 && (
				<FlexibleContentArea modules={flexModules} resourceGridQuery={postTypeData?.resourcesQuery} />
			)}
			<FilteringModule
				postTypeData={parsedPostTypes}
				requestData={requestData}
				filterCopy={copyContent}
				paginatedPosts={postTypeData.paginatedPosts}
			/>

			{/* Main guts of template - end */}
		</BaseTemplateWrapper>
	);
};

export default CaseStudiesMainTemplate;
