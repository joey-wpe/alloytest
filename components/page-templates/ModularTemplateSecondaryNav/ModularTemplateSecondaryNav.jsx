import PropTypes from 'prop-types';
import React from 'react';
import dynamic from 'next/dynamic';
import styles from './ModularTemplateSecondaryNav.module.scss';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import SecondaryNav from '../../template-parts/SecondaryNav/SecondaryNav';
import { gqlSecondaryNavResponseToSecondaryNav } from '../../template-parts/SecondaryNav/SecondaryNav.datamediator';
import MastheadSwitcher from '../../non-visual/MastheadSwitcher/MastheadSwitcher';
import { useTranslation } from 'next-i18next';

const FlexibleContentArea = dynamic(() => import('../../molecules/FlexibleContentArea/FlexibleContentArea'));

const ModularTemplateWithSecondaryNav = ({ pageData, pageCTAData, postTypeData, globalAlertData, headerMenuData, footerMenu }) => {
	const { t } = useTranslation('common');

	const secondaryNavData = gqlSecondaryNavResponseToSecondaryNav(t, pageData.template?.moduleSecondaryNav);
	return (
		<BaseTemplateWrapper globalAlertData={globalAlertData} headerMenuData={headerMenuData} pageCTAData={pageCTAData} footerMenu={footerMenu}>
			<MastheadSwitcher pageHeader={pageData.pageHeader} page={pageData} />
			<SecondaryNav {...secondaryNavData} />
			{pageData?.contentBlocksModules?.modules && pageData?.contentBlocksModules?.modules.length > 0 && (
				<FlexibleContentArea
					modules={pageData?.contentBlocksModules?.modules}
					resourceGridQuery={postTypeData?.resourcesQuery}
				/>
			)}
		</BaseTemplateWrapper>
	);
};

ModularTemplateWithSecondaryNav.propTypes = {
	pageData: PropTypes.object,
};

export default ModularTemplateWithSecondaryNav;
