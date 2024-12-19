import PropTypes from 'prop-types';
import React from 'react';
import dynamic from 'next/dynamic';
import styles from './ModularTemplate.module.scss';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import MastheadSwitcher from '../../non-visual/MastheadSwitcher/MastheadSwitcher';

const FlexibleContentArea = dynamic(() => import('../../molecules/FlexibleContentArea/FlexibleContentArea'));

const ModularTemplate = ({
	pageData,
	postTypeData,
	pageCTAData,
	globalAlertData,
	headerMenuData,
	footerMenu,
	useReducedFooter,
	useReducedNav,
}) => {
	return (
		<BaseTemplateWrapper
			globalAlertData={globalAlertData}
			headerMenuData={headerMenuData}
			pageCTAData={pageCTAData}
			footerMenu={footerMenu}
			useReducedNav={useReducedNav}
			useReducedFooter={useReducedFooter}
		>
			<MastheadSwitcher pageHeader={pageData.pageHeader} page={pageData} />
			{pageData.contentBlocksModules?.modules && pageData.contentBlocksModules?.modules.length > 0 && (
				<FlexibleContentArea
					modules={pageData.contentBlocksModules?.modules}
					resourceGridQuery={postTypeData?.resourcesQuery}
				/>
			)}
		</BaseTemplateWrapper>
	);
};

ModularTemplate.propTypes = {
	pageData: PropTypes.object,
};

export default ModularTemplate;
