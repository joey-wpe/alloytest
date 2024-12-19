import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import StringConstants from '../../../StringConstants';
import { simplifyModuleName } from '../../../data-mediators/ModuleNameFullToSimple';
import FlexibleModuleWrapper from '../FlexibleModuleWrapper/FlexibleModuleWrapper';
import { scrollToElementWithOffset } from '../../../wplib/urlHelpers';

// we dynamically import these to reduce Javascript bundle size / overhead for this module
const BasicTabber = dynamic(() => import('../../modules/Tabber/Tabber'));
const CardGrid = dynamic(() => import('../../modules/CardGridProducts/CardGridProducts'));
const CaseStudySlider = dynamic(() => import('../../modules/CaseStudySlider/CaseStudySlider'));
const ComparisonChart = dynamic(() => import('../../modules/ComparisonChart/ComparisonChart'));
const CrossLinkTiles = dynamic(() => import('../../modules/CrossLinkTiles/CrossLinkTiles'));
const DataBoxLarge = dynamic(() => import('../../modules/DataBoxLarge/DataBoxLarge'));
const DataBoxSmall = dynamic(() => import('../../modules/DataBoxSmall/DataBoxSmall'));
const Disruptor = dynamic(() => import('../../modules/Disruptor/Disruptor'));
const FaqAccordion = dynamic(() => import('../../modules/FaqAccordion/FaqAccordion'));
const FooterCTA = dynamic(() => import('../../template-parts/FooterCTA/FooterCTA'));
const Form = dynamic(() => import('../../modules/Form/Form'));
const GlobalAlert = dynamic(() => import('../../template-parts/GlobalAlert/GlobalAlert'));
const IconFlipCard = dynamic(() => import('../../modules/IconFlipCard/FlipCards'));
const IconGrid = dynamic(() => import('../../modules/IconGrid/IconGrid'));
const LeftRight = dynamic(() => import('../../modules/LeftRight/LeftRight'));
const LogoGroup = dynamic(() => import('../../modules/LogoGroup/LogoGroup'));
const Masthead = dynamic(() => import('../../template-parts/Masthead/Masthead'));
const PlainText = dynamic(() => import('../../modules/PlainText/PlainText'));
const ProductTabber = dynamic(() => import('../../modules/ProductTabber/ProductTabber'));
const ResourceGrid = dynamic(() => import('../../modules/ResourceGrid/ResourceGrid'));
const Testimonial = dynamic(() => import('../../modules/Testimonial/Testimonial'));
const Video = dynamic(() => import('../../modules/Video/Video'));

// import our data mediators
import { gqlCardGridProductsResponseToCardGridProducts } from '../../modules/CardGridProducts/CardGridProducts.datamediator';
import { gqlCaseStudySliderResponseToCaseStudySlider } from '../../modules/CaseStudySlider/CaseStudySlider.datamediator';
import { gqlComparisonChartResponseToComparisonChart } from '../../modules/ComparisonChart/ComparisonChart.datamediator';
import { gqlCrossLinkTilesResponseToCrossLinkTiles } from '../../modules/CrossLinkTiles/CrossLinkTiles.datamediator';
import { gqlDataBoxLargeResponseToDataBoxLarge } from '../../modules/DataBoxLarge/DataBoxLarge.datamediator';
import { gqlDataBoxSmallResponseToDataBoxSmall } from '../../modules/DataBoxSmall/DataBoxSmall.datamediator';
import { gqlDisruptorResponseToDisruptor } from '../../modules/Disruptor/Disruptor.datamediator';
import { gqlFaqAccordionResponseToFaqAccordion } from '../../modules/FaqAccordion/FaqAccordion.datamediator';
import { gqlFormResponseToForm } from '../../modules/Form/Form.datamediator';
import { gqlIconFlipCardResponseToIconFlipCard } from '../../modules/IconFlipCard/FlipCards.datamediator';
import { gqlIconGridResponseToIconGrid } from '../../modules/IconGrid/IconGrid.datamediator';
import { gqlLeftRightResponseToLeftRight } from '../../modules/LeftRight/LeftRight.datamediator';
import { gqlLogoGroupResponseToLogoGroup } from '../../modules/LogoGroup/LogoGroup.datamediator';
import { gqlPlainTextResponseToPlainText } from '../../modules/PlainText/PlainText.datamediator';
import { gqlProductTabberResponseToProductTabber } from '../../modules/ProductTabber/ProductTabber.datamediator';
import { gqlResourceGridResponseToResourceGrid } from '../../modules/ResourceGrid/ResourceGrid.datamediator';
import { gqlTabberResponseToTabber } from '../../modules/Tabber/Tabber.datamediator';
import { gqlTestimonialResponseToTestimonial } from '../../modules/Testimonial/Testimonial.datamediator';
import { gqlVideoResponseToVideo } from '../../modules/Video/Video.datamediator';

const FlexibleContentArea = ({ modules, resourceGridQuery }) => {
	// console.log('- FlexibleContentArea - processing modules..');
	const routerRef = useRouter();
	const locale = useRouter().locale === 'en-US' ? '' : `${routerRef.locale}`;
	const { t } = useTranslation('common');

	useEffect(() => {
		const SCROLL_OFFSET = 60;
		const SCROLL_DELAY = 2000;
		const hash = window?.location?.hash?.substring(1);
		if (hash) {
			const element = document.getElementById(hash);
			if (element) {
				scrollToElementWithOffset(element, SCROLL_OFFSET, SCROLL_DELAY);
			}
		}
	}, []);

	if (!modules || modules.length === 0) {
		console.error('FlexibleContentArea - no modules provided');
		return <></>;
	}

	return modules
		.filter((moduleEntry) => {
			// NOTE:: for real page renderings we may have modules not yet handled here, so we check to see if there's more than one property (__typename) - if not then we skip it
			if (Object.keys(moduleEntry).length < 2) {
				console.warn('FlexibleContentArea - skipping module entry because it has no data!', moduleEntry.__typename);
				return false;
			}
			return true;
		})
		.map((moduleEntry, index) => {
			// console.log('- FlexibleContentArea - processing module entry: ', moduleEntry.__typename);
			const simpleModuleName = simplifyModuleName(moduleEntry.__typename);

			var internalPadding = false;
			if (moduleEntry.backgroundType !== 'color') {
				internalPadding = true;
			} else if (moduleEntry.backgroundType === 'color' && moduleEntry.backgroundColor !== 'none') {
				internalPadding = true;
			}
			if (
				moduleEntry.__typename === 'ContentNode_Contentblocksmodules_Modules_Disruptor' ||
				moduleEntry.__typename === 'ContentNode_Contentblocksmodules_Modules_TestimonialSlider'
			) {
				internalPadding = false;
			}

			if (simpleModuleName === null) {
				console.warn(`FlexibleContentArea - unknown module (__typename: ${moduleEntry.__typename})`);
			}

			var internalModule = null;
			switch (simpleModuleName) {
				// NOTE:: these already exist so they can be part of the hardcoded homepage layout
				// most are not wired up yet. See below if they are using a mediator yet

				case StringConstants.ModuleNames.BasicTabber:
					// console.log('moduleEntry: ', moduleEntry);
					const basicTabberData = gqlTabberResponseToTabber(moduleEntry, internalPadding);
					internalModule = <BasicTabber {...basicTabberData} />;
					break;
				case StringConstants.ModuleNames.CardGrid:
					const cardGridData = gqlCardGridProductsResponseToCardGridProducts(moduleEntry, internalPadding);
					internalModule = <CardGrid {...cardGridData} />;
					break;
				case StringConstants.ModuleNames.CrossLinkTiles:
					const crossLinkTilesData = gqlCrossLinkTilesResponseToCrossLinkTiles(moduleEntry, internalPadding);
					internalModule = <CrossLinkTiles {...crossLinkTilesData} />;
					break;
				case StringConstants.ModuleNames.CaseStudySlider:
					let caseStudySlider = gqlCaseStudySliderResponseToCaseStudySlider(
						t,
						moduleEntry,
						internalPadding,
						resourceGridQuery,
						locale
					);
					internalModule = <CaseStudySlider {...caseStudySlider} />;
					break;
				case StringConstants.ModuleNames.DataBoxLarge:
					const dataBoxLargeData = gqlDataBoxLargeResponseToDataBoxLarge(moduleEntry, internalPadding);
					internalModule = <DataBoxLarge {...dataBoxLargeData} />;
					break;
				case StringConstants.ModuleNames.DataBoxSmall:
					const dataBoxSmallData = gqlDataBoxSmallResponseToDataBoxSmall(moduleEntry, internalPadding);
					internalModule = <DataBoxSmall {...dataBoxSmallData} />;
					break;
				case StringConstants.ModuleNames.Disruptor:
					const disruptorData = gqlDisruptorResponseToDisruptor(moduleEntry);
					internalModule = <Disruptor {...disruptorData} />;
					break;
				case StringConstants.ModuleNames.FaqAccordion:
					const faqAccordionData = gqlFaqAccordionResponseToFaqAccordion(moduleEntry, internalPadding);
					internalModule = <FaqAccordion {...faqAccordionData} />;
					break;
				case StringConstants.ModuleNames.FooterCTA:
					internalModule = <FooterCTA {...moduleEntry} />;
					break;
				case StringConstants.ModuleNames.Form:
					const formData = gqlFormResponseToForm(t, moduleEntry, internalPadding);
					internalModule = <Form {...formData} />;
					break;
				case StringConstants.ModuleNames.GlobalAlert:
					internalModule = <GlobalAlert {...moduleEntry} />;
					break;
				case StringConstants.ModuleNames.IconFlipCard:
					const iconFlipCardData = gqlIconFlipCardResponseToIconFlipCard(moduleEntry, internalPadding);
					internalModule = <IconFlipCard {...iconFlipCardData} />;
					break;
				case StringConstants.ModuleNames.IconGrid:
					const iconGridData = gqlIconGridResponseToIconGrid(moduleEntry, internalPadding);
					internalModule = <IconGrid {...iconGridData} />;
					break;
				case StringConstants.ModuleNames.LeftRight:
					const leftRightData = gqlLeftRightResponseToLeftRight(t, moduleEntry, internalPadding);
					internalModule = <LeftRight {...leftRightData} />;
					break;
				case StringConstants.ModuleNames.Logos:
					const logoGroupData = gqlLogoGroupResponseToLogoGroup(moduleEntry, internalPadding);
					internalModule = <LogoGroup {...logoGroupData} />;
					break;
				case StringConstants.ModuleNames.Masthead:
					internalModule = <Masthead {...moduleEntry} />;
					break;
				case StringConstants.ModuleNames.PlainText:
					const plainTextData = gqlPlainTextResponseToPlainText(moduleEntry, internalPadding);
					internalModule = <PlainText {...plainTextData} />;
					break;
				case StringConstants.ModuleNames.ProductTabber:
					const productTabberData = gqlProductTabberResponseToProductTabber(moduleEntry, internalPadding);
					internalModule = <ProductTabber {...productTabberData} />;
					break;
				case StringConstants.ModuleNames.ResourcesGrid:
					let resourceData = gqlResourceGridResponseToResourceGrid(t, moduleEntry, resourceGridQuery, internalPadding);
					internalModule = <ResourceGrid {...resourceData} />;
					break;
				case StringConstants.ModuleNames.TestimonialSlider:
					const testimonialData = gqlTestimonialResponseToTestimonial(moduleEntry, resourceGridQuery);
					internalModule = <Testimonial {...testimonialData} />;
					break;
				case StringConstants.ModuleNames.Video:
					const videoData = gqlVideoResponseToVideo(moduleEntry, internalPadding);
					internalModule = <Video {...videoData} />;
					break;
				case StringConstants.ModuleNames.ComparisonChart:
					const comparisonChartData = gqlComparisonChartResponseToComparisonChart(moduleEntry, internalPadding);
					internalModule = <ComparisonChart {...comparisonChartData} />;
					break;

				default:
					internalModule = null;
			}

			// console.log(`<<< paddingTop: ${moduleEntry.paddingTop}, paddingBottom: ${moduleEntry.paddingBottom}`);

			// NOTE:: we read the common values from moduleEntry - which is a raw GQL response - it has not gone through a mediator above.
			// All module queries include these common fields via MODULE_COMMON_FIELDS_QUERY.
			return (
				<FlexibleModuleWrapper
					key={index}
					moduleName={simpleModuleName}
					anchor={moduleEntry.anchor}
					additionalClasses={moduleEntry.additionalClasses}
					verticalSpacingTop={moduleEntry.paddingTop}
					verticalSpacingBottom={moduleEntry.paddingBottom}
					internalPadding={internalPadding}
				>
					{internalModule}
				</FlexibleModuleWrapper>
			);
		});
};

FlexibleContentArea.propTypes = {
	modules: PropTypes.array,
};

export default FlexibleContentArea;
