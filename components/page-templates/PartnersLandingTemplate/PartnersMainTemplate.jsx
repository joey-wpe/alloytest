import PropTypes from 'prop-types';
import React from 'react';
import dynamic from 'next/dynamic';
import styles from './PartnersMainTemplate.module.scss';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import FilteringModule from '../../template-parts/FilteringModule/FilteringModule';
import { useTranslation } from 'next-i18next';
import ResourceGrid from '../../modules/ResourceGrid/ResourceGrid';
import { gqlResourceGridResponseToResourceGrid } from '../../modules/ResourceGrid/ResourceGrid.datamediator';
import { parsePostTypes } from '../ArchiveTemplate/ArchiveTemplateTaxSelector';
import MastheadSwitcher from '../../non-visual/MastheadSwitcher/MastheadSwitcher';
const FlexibleContentArea = dynamic(() => import('../../molecules/FlexibleContentArea/FlexibleContentArea'));

const PartnersMainTemplate = ({ postTypeData, pageData, pageCTAData, globalAlertData, headerMenuData, footerMenu }) => {
	// console.log(postTypeData.resourcesQuery);
	const { t } = useTranslation('common');
	const resourcesData = gqlResourceGridResponseToResourceGrid(
		t,
		pageData.template?.partnerMainPage?.partnerResourceGrid,
		postTypeData?.resourcesQuery,
		true
	);

	const requestData = {
		post_type: 'partner',
		taxonomies: [],
		fields: {
			core: ['title', 'permalink', 'post_thumbnail_url', 'excerpt'],
		},
	};

	const parsedPostTypes = parsePostTypes(postTypeData, 'partner');

	const copyContent = {
		title: t('partner.copyTitle'),
	};

	return (
		<BaseTemplateWrapper
			globalAlertData={globalAlertData}
			headerMenuData={headerMenuData}
			pageCTAData={pageCTAData}
			footerMenu={footerMenu}
		>
			<MastheadSwitcher pageHeader={pageData.pageHeader} />
			{pageData.contentBlocksModules?.modules && pageData.contentBlocksModules?.modules.length > 0 && (
				<FlexibleContentArea modules={pageData.contentBlocksModules?.modules} />
			)}
			<FilteringModule
				postTypeData={parsedPostTypes}
				paginatedPosts={postTypeData.paginatedPosts}
				requestData={requestData}
				filterCopy={copyContent}
				className={styles.filter}
			/>
			{resourcesData?.items?.length > 0 ? <ResourceGrid {...resourcesData} /> : false}
		</BaseTemplateWrapper>
	);
};

PartnersMainTemplate.propTypes = {
	pageData: PropTypes.object,
};

export default PartnersMainTemplate;
