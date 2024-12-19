import PropTypes from 'prop-types';
import React from 'react';
import dynamic from 'next/dynamic';
import StringConstants from '../../../StringConstants';
import CaseStudiesMainTemplate from '../CaseStudiesMainTemplate/CaseStudiesMainTemplate';

// we want to lazy load these imports so that we aren't loading them all to only show one
const ProductLoginTemplate = dynamic(() => import('../ProductLoginTemplate/ProductLoginTemplate'));
const BasicOneColumnTemplate = dynamic(() => import('../BasicOneColumnTemplate/BasicOneColumnTemplate'));
const LocationsTemplate = dynamic(() => import('../LocationsTemplate/LocationsTemplate'));
const ModularTemplate = dynamic(() => import('../ModularTemplate/ModularTemplate'));
const ModularTemplateWithSecondaryNav = dynamic(() =>
	import('../ModularTemplateSecondaryNav/ModularTemplateSecondaryNav')
);
const NewsroomMainTemplate = dynamic(() => import('../NewsroomMainTemplate/NewsroomMainTemplate'));
const PartnersMainTemplate = dynamic(() => import('../PartnersLandingTemplate/PartnersMainTemplate'));
const PricingMainTemplate = dynamic(() => import('../PricingMainTemplate/PricingMainTemplate'));
const PricingDetailTemplate = dynamic(() => import('../PricingDetailTemplate/PricingDetailTemplate'));
const ProductDemoFormTemplate = dynamic(() => import('../ProductDemoFormTemplate/ProductDemoFormTemplate'));
const TeamMemberArchiveTemplate = dynamic(() => import('../TeamMemberArchiveTemplate/TeamMemberArchiveTemplate'));
const ArchiveTemplate = dynamic(() => import('../ArchiveTemplate/ArchiveTemplate'));
const ROICalculatorMain = dynamic(() => import('../ROICalculatorMain/ROICalculatorMain'));
const ROICalculatorResult = dynamic(() => import('../ROICalculatorResult/ROICalculatorResult'));

const PageTemplateSelector = ({
	templateName,
	pageData,
	postTypeData,
	pageCTAData,
	globalAlertData,
	headerMenuData,
	footerMenu,
}) => {
	const commonTemplateProps = {
		pageData: pageData,
		postTypeData: postTypeData,
		pageCTAData: pageCTAData,
		globalAlertData: globalAlertData,
		headerMenuData: headerMenuData,
		footerMenu: footerMenu,
		useReducedNav: false,
		useReducedFooter: false,
	};

	return (
		// NOTE:: as new templates are added to this selector, be sure to:
		// * update the GetStaticPaths in  [...slug.js] (and/or other routes) to indicate what templates that route supports
		// * update wplib/pages.getPageTemplateDataByDatabaseID() to know the proper data query to run

		// prettier-ignore
		<>
			{ templateName === StringConstants.PageTemplates.BasicOneColumn && 
				<BasicOneColumnTemplate {...commonTemplateProps} />
			}
			{ templateName === StringConstants.PageTemplates.Locations && 
				<LocationsTemplate {...commonTemplateProps} />
			}
			{ templateName === StringConstants.PageTemplates.Modular && 
				<ModularTemplate {...commonTemplateProps} />
			}
			{ templateName === StringConstants.PageTemplates.NewsroomMain && 
				<NewsroomMainTemplate {...commonTemplateProps} />
			}
			{ templateName === StringConstants.PageTemplates.Partners && 
				<PartnersMainTemplate {...commonTemplateProps} />
			}
			{ templateName === StringConstants.PageTemplates.PricingMain && 
				<PricingMainTemplate {...commonTemplateProps} />
			}
			{ templateName === StringConstants.PageTemplates.PricingDetail && 
				<PricingDetailTemplate {...commonTemplateProps} />
			}
			{templateName === StringConstants.PageTemplates.ProductDemoForm && 
				<ProductDemoFormTemplate {...commonTemplateProps} />
			}
			{templateName === StringConstants.PageTemplates.TeamMemberArchive && 
				<TeamMemberArchiveTemplate {...commonTemplateProps} />
			}
			{templateName === StringConstants.PageTemplates.ProductLogin && 
				<ProductLoginTemplate {...commonTemplateProps} />
			}
			{templateName === StringConstants.PageTemplates.ModularWithSecondaryNav && 
				<ModularTemplateWithSecondaryNav {...commonTemplateProps} />
			}
			{templateName === StringConstants.PageTemplates.CaseStudiesMain && 
				<CaseStudiesMainTemplate {...commonTemplateProps} />
			}
			{templateName === StringConstants.PageTemplates.Archive && 
				<ArchiveTemplate {...commonTemplateProps} />
			}
			{templateName === StringConstants.PageTemplates.ROICalculatorMain && 
				<ROICalculatorMain {...commonTemplateProps} />
			}
			{templateName === StringConstants.PageTemplates.ROICalculatorResult && 
				<ROICalculatorResult {...commonTemplateProps} />
			}
		</>
	);
};

PageTemplateSelector.propTypes = {
	templateName: PropTypes.string.isRequired,
	pageData: PropTypes.object,
};

export default PageTemplateSelector;
