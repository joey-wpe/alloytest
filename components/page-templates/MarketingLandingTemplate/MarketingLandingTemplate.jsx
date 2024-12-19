import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import { gqlLeftRightResponseToLeftRight } from '../../modules/LeftRight/LeftRight.datamediator';
import { mediateUrlPath } from '../../../wplib/urlHelpers';
import LeftRight from '../../modules/LeftRight/LeftRight';
import PlainText from '../../modules/PlainText/PlainText';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'next-i18next';

const FlexibleContentArea = dynamic(() => import('../../molecules/FlexibleContentArea/FlexibleContentArea'));

const MarketingLandingTemplate = ({
	landingPage,
	postTypeData,
	pageCTAData,
	globalAlertData,
	headerMenuData,
	footerMenu,
}) => {
	const [showContent, setShowContent] = useState(false);
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const hiddenResourceAreaRef = useRef(null);

	const { t } = useTranslation('common');

	let topSection = landingPage?.campaignLandingPages?.basicLandingPage?.topSection;

	let gqlTopModuleData = {
		additionalClasses: topSection.additionalClasses,
		anchor: topSection.anchor,
		backgroundColor: topSection.backgroundColor,
		backgroundPattern: topSection.backgroundPattern,
		backgroundType: topSection.backgroundType,
		paddingTop: topSection.paddingTop,
		paddingBottom: topSection.paddingBottom,
		description: topSection.description,
		preheadText: topSection.preheadText,
		preheadType: topSection.preheadType,
		titleText: topSection.titleText,
		titleType: topSection.titleType,
		actions: topSection.actions,
		mediaMediaType: topSection.image ? 'image' : 'form',
		contentSide: 'left',
		mediaFormGroup: {
			formCoCode: topSection.formCoCode,
			formComboboxChoices: topSection.formComboboxChoices,
			formConsentCheckbox: topSection.formConsentCheckbox,
			formCustomThankYou: topSection.formCustomThankYou,
			formFremiumEmails: topSection.formFremiumEmails,
			formInitiative: topSection.formInitiative,
			formMarketingOptInCheckbox: topSection.formMarketingOptInCheckbox,
			formNextForm: topSection.formNextForm,
			formPersona: topSection.formPersona,
			formProduct: topSection.formProduct,
			formRedirectUrl: mediateUrlPath(topSection.formRedirectUrl),
			formReportingTitle: topSection.formReportingTitle,
			formResourceFormCta: topSection.formResourceFormCta,
			formSelectForm: topSection.formSelectForm,
			formStage: topSection.formStage,
			formTermsOptInCheckbox: topSection.formTermsOptInCheckbox,
			formType: topSection.formType,
		},
		mediaImage: topSection.image,
	};

	const topSectionData = gqlLeftRightResponseToLeftRight(t, gqlTopModuleData, true);
	if (topSectionData?.mediaContent?.form) {
		// console.log('MarketingLandingPageTemplate - form exists, adding redirectCallback');
		topSectionData.mediaContent.form.redirectCallback = () => {
			// console.log('MarketingLandingPageTemplate - redirectCallback firing!!');
			setShowContent(true);
			hiddenResourceAreaRef?.current?.scrollIntoView();
		};
	} else {
		console.log('MarketingLandingPageTemplate - no form, cannot add redirectCallback');
	}

	const flexModules = landingPage?.campaignLandingPages?.basicLandingPage?.contentSection?.contentModules;
	const revealModules = landingPage?.campaignLandingPages?.basicLandingPage?.revealSection?.revealModules;
	const customThankYou = topSection.formCustomThankYou ?? t('generic.thankYouMessage');

	return (
		<BaseTemplateWrapper
			globalAlertData={globalAlertData}
			headerMenuData={headerMenuData}
			pageCTAData={pageCTAData}
			footerMenu={footerMenu}
			useReducedFooter={true}
			useReducedNav={true}
		>
			<>
				<LeftRight {...topSectionData} showThankyou={showContent} thankYouMessage={customThankYou} />
				{flexModules && flexModules.length > 0 && (
					<FlexibleContentArea modules={flexModules} resourceGridQuery={postTypeData?.resourcesQuery} />
				)}
			</>
			<div ref={hiddenResourceAreaRef}>
				{showContent && revealModules && revealModules.length > 0 && (
					<FlexibleContentArea modules={revealModules} resourceGridQuery={postTypeData?.resourcesQuery} />
				)}
			</div>
		</BaseTemplateWrapper>
	);
};

MarketingLandingTemplate.propTypes = {
	landingPage: PropTypes.object,
	globalAlertData: PropTypes.object,
	headerMenuData: PropTypes.object,
	footerMenu: PropTypes.object,
};

export default MarketingLandingTemplate;
