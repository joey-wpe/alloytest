import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import styles from './ExploreProductTemplate.module.scss';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import LeftRight from '../../modules/LeftRight/LeftRight';
import { parseFormFields } from '../../../data-mediators/formFieldParser';
import { useTranslation } from 'next-i18next';
import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';
const FlexibleContentArea = dynamic(() => import('../../molecules/FlexibleContentArea/FlexibleContentArea'));
import { useRouter } from 'next/router';

const ExploreProductTemplate = ({ exploreProduct }) => {
	const [showContent, setShowContent] = useState(false);
	const [isCookieSet, setIsCookieSet] = useState(false);
	const [skipForm, setSkipForm] = useState(useRouter().asPath.indexOf('leadId') > -1);
	const [isGated, setIsGated] = useState(exploreProduct.exploreProductsGatedFields?.gated ?? false);
	const hiddenexploreProductAreaRef = useRef(null);
	const { ref, inView } = useInView({
		threshold: 0,
	});
	let customThankYou = null;
	const { t } = useTranslation('common');
	const { backgroundType, backgroundColor } = transformToBackgroundStructure(
		exploreProduct.exploreProductsGatedFields?.header
	);
	let topSectionData = {
		orientation: 'left',
		className: 'className',
		prehead: {
			text: exploreProduct.exploreProductsGatedFields?.header?.preheadText,
			Tag: exploreProduct.exploreProductsGatedFields?.header?.preheadType,
		},
		title: {
			text: exploreProduct.title,
			Tag: 'h2',
		},
		description: [
			{
				text: exploreProduct?.content,
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
	if (exploreProduct.exploreProductsGatedFields.gated) {
		const formData = parseFormFields(t, exploreProduct.exploreProductsGatedFields.gatedDetails);
		if (formData) {
			// console.log('exploreProductGatedTemplate - form exists, adding redirectCallback');
			formData.redirectCallback = () => {
				console.log('exploreProductGatedTemplate - redirectCallback firing');
				setShowContent(true);

				setTimeout(() => {
					hiddenexploreProductAreaRef?.current?.scrollIntoView();
				}, 1000);
			};
			customThankYou = formData?.customThankYou ?? t('ExploreProduct.thankYouMessage');
		} else {
			console.error('exploreProductGatedTemplate - no form, cannot add redirectCallback!');
		}
		topSectionData.mediaContent = {
			form: formData,
		};
	} else {
		topSectionData.mediaContent = {
			image: {
				src: exploreProduct?.exploreProductsGatedFields?.ungatedDetails?.ungatedMastheadImage?.mediaItemUrl,
				alt: exploreProduct?.exploreProductsGatedFields?.ungatedDetails?.ungatedMastheadImage?.altText ?? '',
			},
		};
		if (exploreProduct?.exploreProductsGatedFields?.ungatedDetails?.ungatedCta?.url) {
			topSectionData.buttons = {
				buttons: [
					{
						buttonStyle: 'PrimaryDefault',
						buttonText: exploreProduct?.exploreProductsGatedFields?.ungatedDetails?.ungatedCta?.title,
						link: exploreProduct?.exploreProductsGatedFields?.ungatedDetails?.ungatedCta?.url,
					},
				],
			};
		}
	}

	var showFlexArea = true;

	// if this is a gated exploreProduct and we arent showing content then hide the flex area
	if (isGated && !showContent && !skipForm) {
		showFlexArea = false;
	}

	if (showFlexArea) {
		if (process.env.NODE_ENV === 'development') {
			console.log('ExploreProductTemplate - showing content blocks', exploreProduct.contentBlocksModules?.modules);
		}
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const locale = useRouter().locale === 'en-US' ? '' : `/${useRouter().locale}`;

	useEffect(() => {
		if (isGated && skipForm) {
			setIsCookieSet(true);
		}

		const cookieName = 'PageVisited_' + window.location.pathname.split('/').pop();

		// regex to find exact page URL match within browser set cookie values
		const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));

		if (match) {
			if (match[2] === cookieName) {
				setIsCookieSet(true);
			}
		}
	}, []);

	topSectionData.background = {};

	return (
		<div className={`${styles['explore-product']}`}>
			<BaseTemplateWrapper>
				<div
					className={`${styles['explore-product-desktop']} ${
						isCookieSet || showContent ? styles['explore-product-desktop-active'] : ''
					}`}
				>
					<div className={`${styles['explore-product-content']}`}>
						<LeftRight
							className={`${styles['explore-product']}`}
							{...topSectionData}
							useExploreProductWysiwygStyles={true}
							showThankyou={showContent}
							thankYouMessage={customThankYou}
						/>
					</div>
				</div>
				<div
					className={`${styles['explore-product-demo-preview']} ${
						isCookieSet || showFlexArea ? styles['explore-product-demo-preview-active'] : ''
					}`}
				>
					<iframe src={exploreProduct.exploreProductsGatedFields.demoUrl} allow="fullscreen" scrolling="no"></iframe>
				</div>
				<div className={`${styles['explore-product-mobile']}`}>
					<div className={`${styles['explore-product-mobile-card']}`}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="30"
							width="30"
							viewBox="0 0 24 24"
							strokeWidth="2"
							stroke="currentColor"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<rect x="3" y="4" width="18" height="12" rx="1"></rect>
							<line x1="7" y1="20" x2="17" y2="20"></line>
							<line x1="9" y1="16" x2="9" y2="20"></line>
							<line x1="15" y1="16" x2="15" y2="20"></line>
						</svg>
						<h1>We have big things to show you!</h1>
						<p>Please come back on a desktop device.</p>
					</div>
				</div>
			</BaseTemplateWrapper>
		</div>
	);
};

ExploreProductTemplate.propTypes = {
	exploreProduct: PropTypes.object,
	globalAlertData: PropTypes.object,
	headerMenuData: PropTypes.object,
	footerMenu: PropTypes.object,
};

export default ExploreProductTemplate;
