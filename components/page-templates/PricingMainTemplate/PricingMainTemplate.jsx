import PropTypes from 'prop-types';
import React from 'react';
import styles from './PricingMainTemplate.module.scss';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import MastheadMinimal from '../../template-parts/MastheadMinimal/MastheadMinimal';
import PricingCards from '../../template-parts/PricingCards/PricingCards';
import { useInView } from 'react-intersection-observer';
import { mediateUrlPath } from '../../../wplib/urlHelpers';
import { useTranslation } from 'next-i18next';

const PricingMainTemplate = ({ pageData, pageCTAData, globalAlertData, headerMenuData, footerMenu }) => {
	const { t } = useTranslation('common');

	const mastheadSettings = {
		prehead: t('pricingMain.prehead'),
		title: t('pricingMain.mainTitle'),
		background: {
			type: 'pattern',
			color: 'blaze',
		},
	};

	const pricingCards = pageData?.template?.templatePricingMain?.priceCards;
	const wysiwygContent = pageData?.template?.templatePricingMain?.contentMain;

	//Animation
	const { ref: refAnimation, inView } = useInView({
		threshold: 0,
	});
	const classAnimPlay = inView && styles['anim-play'];

	const cardsData = {
		cards: pricingCards.map((card) => {
			return {
				title: card?.titleText,
				subhead: card?.subTitleText,
				pricing: {
					package: {
						price: card?.amount,
						info: card?.amountDetail,
					},
					description: card?.cardDescription,
				},
				highlights: {
					description: card?.highlights,
					link: {
						uri: mediateUrlPath(card?.actionLink?.url),
						buttonText: card?.actionLink?.title,
					},
				},
			};
		}),
	};

	return (
		<BaseTemplateWrapper
			globalAlertData={globalAlertData}
			headerMenuData={headerMenuData}
			pageCTAData={pageCTAData}
			footerMenu={footerMenu}
		>
			{/* Main guts of template - start */}

			<MastheadMinimal {...mastheadSettings} />
			<div className={styles['pricing-main']}>
				<PricingCards {...cardsData} className={styles['pricing-main__cards']} />
				<div className={styles['container']} ref={refAnimation}>
					<div
						className={`${styles['primary-typography']} ${styles['primary-bullet-style']} ${styles['wysiwyg']} ${styles['anim-fade-in-up']} ${classAnimPlay}`}
						dangerouslySetInnerHTML={{ __html: wysiwygContent }}
					></div>
				</div>
			</div>

			{/* Main guts of template - end */}
		</BaseTemplateWrapper>
	);
};

PricingMainTemplate.propTypes = {
	pageData: PropTypes.object,
	globalAlertData: PropTypes.object,
	headerMenuData: PropTypes.object,
	footerMenu: PropTypes.object,
};

export default PricingMainTemplate;
