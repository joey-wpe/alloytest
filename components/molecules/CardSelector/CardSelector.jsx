import React from 'react';
import { cardSetter } from './CardSelector.datamediator';
import CardPartner from '../CardPartner/CardPartner';
import styles from './CardSelector.module.scss';
import EventCard from '../EventCard/EventCard';
import { useTranslation } from 'next-i18next';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import GlobalConstants from '../../../GlobalConstants';
import { Trans } from 'react-i18next';

const CardSelector = ({ postType, cardData }) => {
	const router = useRouter();
	const locale = router.locale === 'en-US' ? '' : `/${router.locale}`;
	const { ref: refAnimation, inView } = useInView({
		threshold: 0,
	});
	const { t } = useTranslation('common');
	const classAnimPlay = inView && styles['anim-play'];

	function postTypeLabel(postType) {
		let currPostType = '';
		switch (postType) {
			case 'case_study':
				currPostType = t('postType.caseStudies');
				break;
			case 'partner':
				currPostType = t('postType.partners');
				break;
			case 'events':
				currPostType = t('postType.events');
				break;
			case 'resource':
				currPostType = t('postType.resources');
				break;
			case 'post':
				currPostType = t('postType.posts');
				break;
			default:
				currPostType = t('postType.resources');
				break;
		}
		return currPostType;
	}

	const searchLocale = `${locale}/${GlobalConstants.FrontendRoutes.Search}`;

	if (cardData.length === 0) {
		return (
			<h2 className={styles['not-found']}>
				<Trans
					i18nKey="filterSearch.noResults"
					values={{ postTypeLabel: postTypeLabel(postType), searching: t('emptySearch.searching') }}
					components={{
						searchLink: <a href={searchLocale} />,
						lowercaseText: <span className={styles['not-found-lowercase']}></span>,
					}}
				/>
			</h2>
		);
	}
	return (
		<div className={styles['grid-card']} ref={refAnimation}>
			{cardData
				.filter((result, index) => {
					const cardData = cardSetter(t, postType, result);
					return cardData;
				})
				.map((result, index) => {
					const cardData = cardSetter(t, postType, result);
					const classAnimDelay = `anim-delay-${index + 1}`;

					if (postType === 'partner' || postType === 'case_study') {
						return (
							<div
								key={cardData.id}
								className={`${styles.card} ${styles['anim-fade-in-up']} ${classAnimDelay} ${classAnimPlay}`}
							>
								<CardPartner {...cardData} />
							</div>
						);
					}

					if (postType === 'events') {
						const tileDate = result?.acf?.when?.customTileDate || result?.acf?.events_details?.when?.customTileDate;
						const eventDate = result?.acf?.when?.date || result?.acf?.events_details?.when?.fromDate;
						cardData.eventDate = tileDate ? tileDate : eventDate;

						return (
							<div
								key={cardData.id}
								className={`${styles.card} ${styles['anim-fade-in-up']} ${classAnimDelay} ${classAnimPlay}`}
							>
								<EventCard {...cardData} />
							</div>
						);
					}

					return (
						<div
							key={cardData.id}
							className={`${styles.card} ${styles['anim-fade-in-up']} ${classAnimDelay} ${classAnimPlay}`}
						>
							<EventCard {...cardData} />
						</div>
					);
				})}
		</div>
	);
};

export default CardSelector;
