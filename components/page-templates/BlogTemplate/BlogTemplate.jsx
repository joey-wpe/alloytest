import PropTypes from 'prop-types';
import React, { useRef } from 'react';

import BlogSection from '../../template-parts/BlogSection/BlogSection';
import BlogWidget from '../../molecules/BlogWidget/BlogWidget';
import ResourceGrid from '../../modules/ResourceGrid/ResourceGrid';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import { gqlResourceGridResponseToResourceGrid } from '../../modules/ResourceGrid/ResourceGrid.datamediator';
import MastheadSwitcher from '../../non-visual/MastheadSwitcher/MastheadSwitcher';
import { mediateUrlPath } from '../../../wplib/urlHelpers';
import { useTranslation } from 'next-i18next';
import { formatDate } from '../../../wplib/util';
import ReadingProgressBar from '../../modules/ReadingProgressBar/ReadingProgressBar';

const BlogTemplate = ({
	pageData,
	postTypeData,
	pageCTAData,
	globalAlertData,
	headerMenuData,
	footerMenu,
	breadcrumb,
}) => {
	const { t } = useTranslation('common');
	const articleContentRef = useRef(null);
	const resourcesData = gqlResourceGridResponseToResourceGrid(
		t,
		pageData.templateBlog.resourceSection,
		postTypeData?.resourcesQuery,
		true
	);

	// Blog Widget component displays on left rail on blog details page above social icons and authors
	let blogWidget = (pageData.resourceProducts?.nodes || []).find(
		(node) => node?.categoryEditBlogWidget?.primary
	)?.categoryEditBlogWidget;
	if (!blogWidget && pageData.resourceProducts?.nodes?.length) {
		blogWidget = pageData.resourceProducts?.nodes[0]?.categoryEditBlogWidget;
	}

	const BlogData = {
		navigation: pageData?.templateBlog?.leftNavMenu?.map((menuItem) => {
			return {
				url: mediateUrlPath(menuItem.navItem?.url ?? '#'),
				textLink: menuItem.navItem?.title ?? null,
			};
		}),
		blog: pageData?.templateBlog?.blogContentMain,
		author: {
			name:
				pageData?.templateBlog?.author && pageData?.templateBlog?.author?.length > 0
					? pageData?.templateBlog?.author[0]?.title
					: '',
			position:
				pageData?.templateBlog?.author && pageData?.templateBlog?.author?.length > 0
					? pageData?.templateBlog?.author[0]?.authorDetails?.description
					: '',
		},
		publishedDate: formatDate(pageData?.date),
		blogWidget: blogWidget,
	};

	return (
		<BaseTemplateWrapper
			globalAlertData={globalAlertData}
			headerMenuData={headerMenuData}
			pageCTAData={pageCTAData}
			footerMenu={footerMenu}
		>
			{/* Main guts of template - start */}
			<div ref={articleContentRef}>
				<ReadingProgressBar containerRef={articleContentRef} />
				<MastheadSwitcher pageHeader={pageData.pageHeader} breadcrumb={breadcrumb} />
				<BlogSection {...BlogData} />
				{resourcesData?.items.length > 0 ? <ResourceGrid {...resourcesData} /> : false}
			</div>
			{/* Main guts of template - end */}
		</BaseTemplateWrapper>
	);
};

BlogTemplate.propTypes = {
	pageData: PropTypes.object,
	globalAlertData: PropTypes.object,
	headerMenuData: PropTypes.object,
	footerMenu: PropTypes.object,
};

export default BlogTemplate;
