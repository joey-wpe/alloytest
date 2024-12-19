import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './ProductDemoFormTemplate.module.scss';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import Loader from '../../atoms/Loader/Loader';
import { mediateUrlPath } from '../../../wplib/urlHelpers';
import FlexibleContentArea from '../../molecules/FlexibleContentArea/FlexibleContentArea';
import { heroToMasthead } from '../../../data-mediators/PageHeaderToMastheadsMediator';
import Form from '../../modules/Form/Form';
import Background from '../../atoms/Background/Background';
import HeadingTag from '../../atoms/HeadingTag/HeadingTag';
import ButtonGroup from '../../molecules/ButtonGroup/ButtonGroup';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const ProductDemoFormTemplate = ({
	pageData,
	postTypeData,
	pageCTAData,
	globalAlertData,
	headerMenuData,
	footerMenu,
}) => {
	// console.log('ProductDemoFormTemplate: ', pageData);
	const { t } = useTranslation('common');

	const [isLoading, setIsLoading] = useState(false);
	const [showContent, setShowContent] = useState(false);
	const hiddenResourceAreaRef = useRef(null);
	const { ref, inView } = useInView({
		threshold: 0,
	});

	const classAnimPlay = inView && styles['anim-play'];
	const classFadeInLeft = styles['anim-fade-in-left'];

	const topSection = pageData.template.pageHeaderProductDemo?.hero;

	let gqlTopModuleData = {
		hero: {
			defaultHeroBackgroundColor: 'blaze',
			defaultHeroBackgroundPattern: 'blaze_pattern',
			defaultHeroBackgroundType: 'pattern',
			defaultHeroDescription: topSection.defaultHeroDescription,
			defaultHeroPreheadText: topSection.defaultHeroPreheadPreheadText,
			defaultHeroPreheadType: topSection.defaultHeroPreheadPreheadType,
			defaultHeroTitleText: topSection.defaultHeroTitleTitleText,
			defaultHeroTitleType: topSection.defaultTitleTitleType,
			defaultHeroPreheadLogo: topSection.defaultHeroPreheadLogo,
			defaultHeroActions: topSection.defaultHeroActions,
			defaultHeroMediaMediaType: 'form',
			defaultHeroMediaFormGroup: {
				formHeadline: topSection.defaultHeroFormGroup.formHeadline,
				formSubHeadline: topSection.defaultHeroFormGroup.formSubHeadline,
				coCode: topSection.defaultHeroFormGroup.coCode,
				comboboxChoices: topSection.defaultHeroFormGroup.comboboxChoices,
				consentCheckbox: topSection.defaultHeroFormGroup.consentCheckbox,
				customThankYou: topSection.defaultHeroFormGroup.customThankYou,
				fremiumEmails: topSection.defaultHeroFormGroup.fremiumEmails,
				initiative: topSection.defaultHeroFormGroup.initiative,
				marketingOptInCheckbox: topSection.defaultHeroFormGroup.marketingOptInCheckbox,
				nextForm: topSection.defaultHeroFormGroup.nextForm,
				persona: topSection.defaultHeroFormGroup.persona,
				product: topSection.defaultHeroFormGroup.product,
				redirectUrl: mediateUrlPath(topSection.defaultHeroFormGroup.redirectUrl),
				reportingTitle: topSection.defaultHeroFormGroup.reportingTitle,
				resourceFormCta: topSection.defaultHeroFormGroup.resourceFormCta,
				selectForm: topSection.defaultHeroFormGroup.selectForm,
				stage: topSection.defaultHeroFormGroup.stage,
				termsOptInCheckbox: topSection.defaultHeroFormGroup.termsOptInCheckbox,
				toggle: topSection.defaultHeroFormGroup.toggle,
				type: topSection.defaultHeroFormGroup.type,
			},
		},
	};
	const mastheadSettings = heroToMasthead(t, gqlTopModuleData);
	const { prehead, preheadLogo, title, description, action, mediaContent, background } = mastheadSettings;

	const preHeadSEODefault = 'h2';
	const titleSEODefault = 'h1';
	const preheadTag = !prehead?.Tag || prehead?.Tag === 'default' ? preHeadSEODefault : prehead?.Tag;
	const titleTag = !title.Tag || title.Tag === 'default' ? titleSEODefault : title.Tag;

	// try and wire up to the form submitting to fire some code
	if (mediaContent?.form) {
		// console.log('ProductDemoFormTemplate - form exists, adding redirectCallback');
		mediaContent.form.redirectCallback = () => {
			console.log('ProductDemoFormTemplate - redirectCallback firing');

			setShowContent(true);

			// we only want to scroll to the content if there is content to show
			if (pageData.contentBlocksModules?.modules && pageData.contentBlocksModules?.modules.length > 0) {
				hiddenResourceAreaRef?.current?.scrollIntoView();
			}
		};
	} else {
		console.error('ProductDemoFormTemplate - no form, cannot add redirectCallback!');
	}
	const thankYouMessage = mediaContent?.form?.customThankYou ?? t('generic.thankYouMessage');

	return (
		<BaseTemplateWrapper
			globalAlertData={globalAlertData}
			headerMenuData={headerMenuData}
			pageCTAData={null}
			footerMenu={footerMenu}
		>
			{/* Main guts of template - start */}
			{isLoading && (
				<div>
					<Loader className={styles['loader']} />
				</div>
			)}

			<Background {...background}>
				<div className={`${styles.masthead} ${styles['primary']} ${styles[background.color]}`}>
					<div className={`${styles['container']} ${styles.content}`}>
						<div className={styles['text-container']} ref={ref}>
							{preheadLogo && (
								<div className={`${styles.logo} ${'anim-delay-1'} ${classFadeInLeft} ${classAnimPlay}`}>
									<Image width={75} height={46} layout="fixed" src={preheadLogo.src} alt={preheadLogo.alt} />
								</div>
							)}

							{prehead && (
								<HeadingTag
									Tag={preheadTag}
									className={`${styles.subhead} ${'anim-delay-2'} ${classFadeInLeft} ${classAnimPlay}`}
									text={prehead.text}
								/>
							)}
							{title ? (
								<HeadingTag
									Tag={titleTag}
									className={`${styles.title} ${styles.h1} ${'anim-delay-3'} ${classFadeInLeft} ${classAnimPlay}`}
									text={title.text}
								/>
							) : (
								''
							)}

							{description ? (
								<div
									className={`${styles['body-p']} ${styles.description}  ${
										styles['primary-bullet-style']
									} ${'anim-delay-4'} ${classFadeInLeft} ${classAnimPlay}`}
									dangerouslySetInnerHTML={{ __html: description?.text ?? '' }}
								/>
							) : (
								''
							)}

							<div className={`${'anim-delay-3'} ${classFadeInLeft} ${classAnimPlay}`}>
								{action && <ButtonGroup alignment={action.alignment} buttons={action.buttons} />}
							</div>
						</div>

						{/* when we're showing the content we hide the form, otherwise it stays stuck on 'Please wait' and the user can still see it */}
						{mediaContent && !showContent && (
							<div>{mediaContent.form && <Form className={styles.form} formOptions={mediaContent.form} />}</div>
						)}

						{/* when we're showing the content we want to show a thankyou message instead of the form */}
						{mediaContent && showContent && (
							<div className={styles['thank-you-wrapper']}>
								<h4 className={styles['h4']}>{t('generic.thankYou')}</h4>
								<p className={styles['body-p']}>{thankYouMessage}</p>
							</div>
						)}
					</div>
				</div>
			</Background>

			<div className={`${styles['one-column']}`} ref={hiddenResourceAreaRef}>
				{showContent && (
					<FlexibleContentArea
						modules={pageData.contentBlocksModules?.modules}
						resourceGridQuery={postTypeData?.resourcesQuery}
					/>
				)}
			</div>
			{/* Main guts of template - end */}
		</BaseTemplateWrapper>
	);
};

ProductDemoFormTemplate.propTypes = {
	pageData: PropTypes.object,
	globalAlertData: PropTypes.object,
	headerMenuData: PropTypes.object,
	footerMenu: PropTypes.object,
};

export default ProductDemoFormTemplate;
