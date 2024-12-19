import PropTypes from 'prop-types';
import React from 'react';
import styles from './PricingDetailTemplate.module.scss';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import PricingTableCompare from '../../template-parts/PricingTableCompare/PricingTableCompare';
import MastheadMinimal from '../../template-parts/MastheadMinimal/MastheadMinimal';
import { gqlPricingDetailTemplateResponseToPricingDetailTemplate } from './PricingDetail.datamediator';
const PricingDetailTemplate = ({ pageData, pageCTAData, globalAlertData, headerMenuData, footerMenu }) => {
	const { mastheadSettings, price, tableCompare, faqAccordionData } =
		gqlPricingDetailTemplateResponseToPricingDetailTemplate(pageData.template.templatePriceDetail);

	return (
		<BaseTemplateWrapper
			globalAlertData={globalAlertData}
			headerMenuData={headerMenuData}
			pageCTAData={pageCTAData}
			footerMenu={footerMenu}
		>
			<PricingTableCompare price={price} tableCompare={tableCompare} />
		</BaseTemplateWrapper>
	);
};

PricingDetailTemplate.propTypes = {
	pageData: PropTypes.object,
	globalAlertData: PropTypes.object,
	headerMenuData: PropTypes.object,
	footerMenu: PropTypes.object,
};

export default PricingDetailTemplate;
