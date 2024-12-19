import React from 'react';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import FilteringModule from '../../template-parts/FilteringModule/FilteringModule';
import { taxSelector } from './ArchiveTemplateTaxSelector';
import { gqlResourceGridResponseToResourceGrid } from '../../modules/ResourceGrid/ResourceGrid.datamediator';
import ResourceGrid from '../../modules/ResourceGrid/ResourceGrid';
import { useTranslation } from 'next-i18next';
import MastheadSwitcher from '../../non-visual/MastheadSwitcher/MastheadSwitcher';
import { parsePostTypes } from './ArchiveTemplateTaxSelector';

const ArchiveTemplate = ({ pageData, pageCTAData, globalAlertData, headerMenuData, footerMenu, postTypeData }) => {
	const { t } = useTranslation('common');
	const taxAcf = pageData.template.contentBlocksArchive?.postSection?.taxonomies;
	const postType = pageData.template.contentBlocksArchive?.postSection.postTypes.postType;
	const parsedPostTypes = parsePostTypes(postTypeData, postType);
	const taxParams = taxSelector(postType, parsedPostTypes, taxAcf);
	const resourcesData = gqlResourceGridResponseToResourceGrid(
		t,
		pageData.template?.contentBlocksArchive?.resourceSection,
		postTypeData.resourcesQuery,
		true
	);

	const relatedResourcesData = gqlResourceGridResponseToResourceGrid(
		t,
		pageData.template?.contentBlocksArchive?.relatedResourceSection,
		postTypeData.resourcesQuery,
		true
	);

	const fields = {
		acf: ['exclude_from_archive_page', 'events_details', 'when'],
		core: ['title', 'permalink', 'excerpt', 'post_thumbnail_url'],
	};

	const requestData = {
		post_type: postType,
		fields: fields,
		taxonomies: taxParams.length > 0 ? taxParams : [],
	};
	return (
		<BaseTemplateWrapper
			globalAlertData={globalAlertData}
			headerMenuData={headerMenuData}
			pageCTAData={pageCTAData}
			footerMenu={footerMenu}
		>
			<MastheadSwitcher pageHeader={pageData.pageHeader} page={pageData} />
			{resourcesData?.items.length > 0 ? <ResourceGrid {...resourcesData} prehead={null} /> : false}
			<FilteringModule
				postTypeData={parsedPostTypes}
				requestData={requestData}
				paginatedPosts={postTypeData.paginatedPosts}
			/>
			{relatedResourcesData?.items.length > 0 ? (
				<ResourceGrid {...relatedResourcesData} items={relatedResourcesData.items.slice(0, 3)} />
			) : (
				false
			)}
		</BaseTemplateWrapper>
	);
};

export default ArchiveTemplate;
