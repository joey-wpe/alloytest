import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import LeftRight from '../../modules/LeftRight/LeftRight';
import { parseFormFields } from '../../../data-mediators/formFieldParser';
import { useTranslation } from 'next-i18next';
import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';
const FlexibleContentArea = dynamic(() => import('../../molecules/FlexibleContentArea/FlexibleContentArea'));
import { useRouter } from 'next/router';

const ResourceDetailTemplate = ({
	resource,
	postTypeData,
	pageCTAData,
	globalAlertData,
	headerMenuData,
	footerMenu,
}) => {
	const [showContent, setShowContent] = useState(false);
	const [skipForm, setSkipForm] = useState(useRouter().asPath.indexOf('leadId') > -1);
	const [isGated, setIsGated] = useState(resource.resourceGatedFields?.gated ?? false);
	const hiddenResourceAreaRef = useRef(null);
	const { ref, inView } = useInView({
		threshold: 0,
	});
	let customThankYou = null;
	const { t } = useTranslation('common');
	const { backgroundType, backgroundColor } = transformToBackgroundStructure(resource.resourceGatedFields?.header);
	let topSectionData = {
		orientation: 'left',
		className: 'className',
		prehead: {
			text: resource.resourceGatedFields?.header?.preheadText,
			Tag: resource.resourceGatedFields?.header?.preheadType,
		},
		title: {
			text: resource.title,
			Tag: 'h2',
		},
		description: [
			{
				text: resource?.content,
				Tag: 'p',
			},
		],
		background: {
			type: backgroundType,
			color: backgroundColor,
			paddings: {
				verticalPadding: 'none',
				bottomPadding: 'default',
			},
		},
	};
	if (resource.resourceGatedFields.gated) {
		const formData = parseFormFields(t, resource.resourceGatedFields.gatedDetails);
		if (formData) {
			// console.log('ResourceGatedTemplate - form exists, adding redirectCallback');
			formData.redirectCallback = () => {
				console.log('ResourceGatedTemplate - redirectCallback firing');
				setShowContent(true);

				setTimeout(() => {
					hiddenResourceAreaRef?.current?.scrollIntoView();
				}, 1000);
			};
			customThankYou = formData?.customThankYou ?? t('resourceDetail.thankYouMessage');
		} else {
			console.error('ResourceGatedTemplate - no form, cannot add redirectCallback!');
		}
		topSectionData.mediaContent = {
			form: formData,
		};
	} else {
		topSectionData.mediaContent = {
			image: {
				src: resource?.resourceGatedFields?.ungatedDetails?.ungatedMastheadImage?.mediaItemUrl,
				alt: resource?.resourceGatedFields?.ungatedDetails?.ungatedMastheadImage?.altText ?? '',
			},
		};
		if (resource?.resourceGatedFields?.ungatedDetails?.ungatedCta?.url) {
			topSectionData.buttons = {
				buttons: [
					{
						buttonStyle: 'PrimaryDefault',
						buttonText: resource?.resourceGatedFields?.ungatedDetails?.ungatedCta?.title,
						link: resource?.resourceGatedFields?.ungatedDetails?.ungatedCta?.url,
					},
				],
			};
		}
	}

	var showFlexArea = true;

	// if this is a gated resource and we arent showing content then hide the flex area
	if (isGated && !showContent && !skipForm) {
		showFlexArea = false;
	}

	if (showFlexArea) {
		if (process.env.NODE_ENV === 'development') {
			console.log('ResourceDetailTemplate - showing content blocks', resource.contentBlocksModules?.modules);
		}
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const locale = useRouter().locale === 'en-US' ? '' : `/${useRouter().locale}`;

	const breadcrumb = {
		breadcrumbsLinks: [
			{ label: t('breadcrumb.home'), url: `/${locale}` },
			{ label: 'Resources', url: `${locale}/resources` },
			{ label: resource.title, url: `${locale}/resources/${resource.slug}` },
		],
	};

	useEffect(() => {
		if (isGated && skipForm) {
			topSectionData.mediaContent.form.redirectCallback();
		}
	}, []);

	return (
		<BaseTemplateWrapper
			globalAlertData={globalAlertData}
			headerMenuData={headerMenuData}
			pageCTAData={pageCTAData}
			footerMenu={footerMenu}
		>
			<LeftRight
				{...topSectionData}
				useResourceDetailWysiwygStyles={true}
				showThankyou={showContent}
				thankYouMessage={customThankYou}
				breadcrumb={breadcrumb}
			/>
			<div ref={hiddenResourceAreaRef}>
				{showFlexArea &&
					resource.contentBlocksModules?.modules &&
					resource.contentBlocksModules?.modules.length > 0 && (
						<FlexibleContentArea
							modules={resource.contentBlocksModules?.modules}
							resourceGridQuery={postTypeData?.resourcesQuery}
						/>
					)}
			</div>
		</BaseTemplateWrapper>
	);
};

ResourceDetailTemplate.propTypes = {
	resource: PropTypes.object,
	globalAlertData: PropTypes.object,
	headerMenuData: PropTypes.object,
	footerMenu: PropTypes.object,
};

export default ResourceDetailTemplate;
