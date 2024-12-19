import PropTypes from 'prop-types';
import React from 'react';
import styles from './BaseTemplateWrapper.module.scss';
import HeaderTopMenu from '../../molecules/HeaderTopMenu/HeaderTopMenu';
import Header from '../../template-parts/Header/Header';
import Footer from '../../template-parts/Footer/Footer';
import FooterCTA from '../../template-parts/FooterCTA/FooterCTA';
import GlobalAlert from '../../template-parts/GlobalAlert/GlobalAlert';
import FlexibleModuleWrapper from '../../molecules/FlexibleModuleWrapper/FlexibleModuleWrapper';
import { navReducer, footerReducer } from '../../../data-mediators/NavAndFooterReducer';

const BaseTemplateWrapper = ({
	globalAlertData,
	headerMenuData,
	pageCTAData,
	footerMenu,
	children,
	useReducedNav,
	useReducedFooter,
}) => {
	// console.log('pageCTAData', pageCTAData);
	headerMenuData = useReducedNav ? navReducer(headerMenuData) : headerMenuData;
	footerMenu = useReducedFooter ? footerReducer(footerMenu) : footerMenu;
	// console.log(headerMenuData);
	// see if we have any SecondaryNav as children
	var hasSecondaryNav = false;
	if (children && Array.isArray(children)) {
		children?.map((item) => {
			// Item is possible null on conditional rendering.
			if (item?.type?.name === 'SecondaryNav') {
				hasSecondaryNav = true;
			}
		});
	}

	if (globalAlertData) {
		console.log('- rendering GlobalAlert on page');
	}

	return (
		<>
			{/* globalAlertData will be null if there is no global alert to show */}
			{globalAlertData && <GlobalAlert {...globalAlertData} />}

			{!useReducedNav && headerMenuData && (
				<HeaderTopMenu
					menu={headerMenuData.headerTopData.menu}
					languages={headerMenuData.headerTopData.languages}
					translatedPages={headerMenuData.translatedPages}
				/>
			)}
			{headerMenuData && <Header className={hasSecondaryNav && styles['header-nav-position']} {...headerMenuData} />}

			<>
				{/* main guts of template is inserted here */}
				<div>{children}</div>

				{/* Page Call to Action is optionally shown here */}
				{pageCTAData && (
					<FlexibleModuleWrapper
						moduleName="FooterCTA"
						verticalSpacingTop={pageCTAData.paddingTop}
						verticalSpacingBottom={'large'}
						anchor="FooterCTA"
					>
						<FooterCTA {...pageCTAData} />
					</FlexibleModuleWrapper>
				)}
			</>

			{footerMenu && <Footer {...footerMenu} translatedPages={headerMenuData?.translated ?? null} />}
		</>
	);
};

BaseTemplateWrapper.propTypes = {
	globalAlertData: PropTypes.object,
	headerMenuData: PropTypes.object,
	footerMenu: PropTypes.object,
	children: PropTypes.node,
};

export default BaseTemplateWrapper;
