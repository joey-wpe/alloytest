import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import styles from './EventDetailsTemplate.module.scss';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import MastheadMinimal from '../../template-parts/MastheadMinimal/MastheadMinimal';
import { gqlFormResponseToForm } from '../../modules/Form/Form.datamediator';
import ShareButtons from '../../molecules/ShareButtons/ShareButtons';
import { useTranslation } from 'next-i18next';

const FlexibleContentArea = dynamic(() => import('../../molecules/FlexibleContentArea/FlexibleContentArea'), {
	loading: () => <div />,
});
const Form = dynamic(() => import('../../modules/Form/Form'), {
	loading: () => <div />,
});

const EventDetailsTemplate = ({ globalAlertData, postTypeData, headerMenuData, footerMenu, event }) => {
	let formFields = event.eventsPage.eventsDetails;
	let eventHeader = event.eventsPage.eventsHeader;
	const [showThankyou, setShowThankyou] = useState(false);
	const hiddenResourceAreaRef = useRef(null);
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const { t } = useTranslation('common');
	const showEventForm = event.eventsPage.showEventForm;
	const formData = gqlFormResponseToForm(t, formFields);

	if (formData?.formOptions) {
		// console.log('EventDetailsTemplate - form exists, adding redirectCallback');
		formData.formOptions.redirectCallback = () => {
			console.log('EventDetailsTemplate - redirectCallback firing');
			setShowThankyou(true);
			hiddenResourceAreaRef?.current?.scrollIntoView();
		};
	} else {
		console.info('EventDetailsTemplate - no form, cannot add redirectCallback');
	}

	const mastheadSetting = {
		prehead: event?.eventsPage?.eventsHeader?.preheadText ?? '',
		preheadType: event?.eventsPage?.eventsHeader?.preheadType ?? 'default',
		title: event?.eventsPage?.eventsHeader?.titleText ?? '',
		titleType: event?.eventsPage?.eventsHeader?.titleType ?? 'default',
		description: event?.eventsPage?.eventsHeader?.description,
		background: {
			desktopBackgroundImage: eventHeader?.backgroundImage?.image?.mediaItemUrl ?? '',
			type: eventHeader?.backgroundType ?? 'pattern',
			color: 'light',
			isPriorityImage: true, // prefetch all masthead images as they should be above the fold
		},
	};

	const eventDateInfo = event?.eventsPage?.eventsDetails?.when?.eventDateInfo ?? '';
	const fromDate = event?.eventsPage?.eventsDetails?.when?.fromDate ?? '';
	const thankYouMessage = formData?.formOptions?.customThankYou ?? t('generic.thankYouMessage');

	return (
		<BaseTemplateWrapper
			globalAlertData={globalAlertData}
			headerMenuData={headerMenuData}
			pageCTAData={null}
			footerMenu={footerMenu}
		>
			<MastheadMinimal {...mastheadSetting} />
			{showEventForm === 'yes' && (
				<section className={`${styles[`wrapper`]}`}>
					<div className={`${styles[`container`]}`}>
						<div className={`${styles[`content-wrapper`]}`}>
							<div className={`${styles[`text-wrapper`]}`}>
								<div
									dangerouslySetInnerHTML={{ __html: event.content }}
									className={` ${styles[`primary-bullet-style`]}`}
								/>
							</div>
							<div className={`${styles[`form-wrapper`]}`}>
								<div>
									<h6 className={`${styles[`h6`]}`}>{t('eventDetail.sideRailTitle')}</h6>
									<ul className={`${styles[`detail-date`]}`}>
										<li>
											<b>{t('eventDetail.sideRailWhen')}:</b>
											<span>{eventDateInfo !== '' ? eventDateInfo : fromDate}</span>
										</li>
										<li>
											<b>{t('eventDetail.sideRailWhere')}:</b>
											<span>
												{event?.eventsPage?.eventsDetails?.where?.venue} /{' '}
												{event?.eventsPage?.eventsDetails?.where?.location}{' '}
											</span>
										</li>
									</ul>
									<ShareButtons className={`${styles[`social-icons`]}`} />
								</div>
								{!showThankyou ? (
									<div className={`${styles[`form-outer-wrapper`]}`}>
										<Form formOptions={formData.formOptions} />
									</div>
								) : (
									<div className={styles['thank-you-wrapper']}>
										<h4 className={styles['h4']}>{t('generic.thankYou')}</h4>
										<p className={styles['body-p']}>{thankYouMessage}</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</section>
			)}
		</BaseTemplateWrapper>
	);
};

EventDetailsTemplate.propTypes = {
	globalAlertData: PropTypes.object,
	headerMenuData: PropTypes.object,
	footerMenu: PropTypes.object,
};

export default EventDetailsTemplate;
