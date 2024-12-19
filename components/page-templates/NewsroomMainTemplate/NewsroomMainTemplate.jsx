import PropTypes from 'prop-types';
import React, { useRef, createRef } from 'react';
import { useTranslation } from 'next-i18next';
import styles from './NewsroomMainTemplate.module.scss';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import CardPressSection from '../../modules/CardPressSection/CardPressSection';
import NewsListItem from '../../molecules/NewsListItem/NewsListItem';
import MediaKit from '../../modules/MediaKit/MediaKit';
import AwardsGrid from '../../modules/AwardsGrid/AwardsGrid';
import SecondaryNav from '../../template-parts/SecondaryNav/SecondaryNav';
import MastheadMinimal from '../../template-parts/MastheadMinimal/MastheadMinimal';
import { formatDate, formatNewsDate } from '../../../wplib/dateFormatter';
import { mediateUrlPath } from '../../../wplib/urlHelpers';
import Disruptor from '../../modules/Disruptor/Disruptor';
import DisruptorSocialMedia from '../../modules/DisruptorSocialMedia/DisruptorSocialMedia';
import { transformToButtonObject } from '../../../data-mediators/ActionsResponseToButtons';
import { transformToBackgroundStructure } from '../../../data-mediators/BackgroundResponseToBackground';
import { disruptorSocialMediaResponseToDisruptorSocialMedia as disruptorResponseToDisruptor } from '../../modules/DisruptorSocialMedia/DisruptorSocialMedia.datamediator';

const NewsroomMainTemplate = ({ pageData, postTypeData, pageCTAData, globalAlertData, headerMenuData, footerMenu }) => {
	const { t } = useTranslation('common');

	const locale = pageData.locale === 'en-US' ? '' : `${pageData.locale}/`;
	const pressReleases = postTypeData?.postTypes?.PressReleases;
	const InTheNews = postTypeData?.postTypes?.IntheNews;
	const templateData = pageData?.template?.templateNewsroomMain;
	const awards = templateData?.awards;
	const mediaKit = templateData?.media;
	const footerCTA = templateData?.footerCTA?.callToActionGroup || null;
	const socialMediaDisruptorProps = templateData?.socialMediaDisruptor
		? disruptorResponseToDisruptor(templateData?.socialMediaDisruptor)
		: null;

	const btnTextCardBuiler = t('generic.readMore');
	const btnTextPressSettin = t('newsRoomMain.btnTextPressSetting');
	const btnTextNewsSetting = t('newsRoomMain.btnTextNewsSetting');

	const cardBuilder = (card, newsCardBtn) => {
		const {
			date,
			templateNews: { publishDisplayDate },
		} = card;

		return {
			date: formatNewsDate(publishDisplayDate) ?? formatDate(date) ?? null,
			title: card.title ?? null,
			subTitle: card.templateNews.resourceInfo ?? null,
			description: card?.excerpt ?? null,
			button: {
				buttonStyle: 'TertiaryDefault',
				buttonText: btnTextCardBuiler,
				link: mediateUrlPath(card?.uri ?? '#'),
				target: newsCardBtn ? newsCardBtn : '',
			},
		};
	};

	const mastheadSettings = {
		prehead: t('newsRoomMain.prehead'),
		title: t('newsRoomMain.mainTitle'),
		background: {
			type: 'pattern',
			color: 'blue',
		},
	};

	const pressSetting = {
		preHeader: t('newsRoomMain.featured'),
		preheadType: 'default',
		heading: t('newsRoomMain.release'),
		headingAnchor: t('newsRoomMain.release_anchor'),
		titleType: 'h2',
		button: {
			buttonStyle: 'SecondaryReverse',
			buttonText: btnTextPressSettin,
			link: mediateUrlPath(`/${locale}news/all-press-releases`),
		},
		stories: pressReleases.nodes
			.filter((card, index) => index < 3)
			.map((card) => {
				return cardBuilder(card);
			}),
		background: {
			type: 'color',
			color: 'none',
		},
	};

	let moduleDisruptor = null;
	if (footerCTA) {
		const { backgroundType, backgroundColor } = transformToBackgroundStructure(footerCTA);
		const buttonStyle = backgroundColor === 'warp' ? 'SecondaryReverse' : null;
		moduleDisruptor = {
			title: footerCTA.titleText,
			titleType: 'h5',
			description: null,
			buttons: {
				alignment: 'center',
				buttons: footerCTA?.actions?.map((action) => transformToButtonObject(action, buttonStyle)),
			},
			background: {
				type: backgroundType,
				color: backgroundColor,
			},
		};
	}

	//Awards and recognition data
	const awardSetting = {
		preHeader: t('newsRoomMain.featured'),
		preheadType: 'default',
		heading: t('newsRoomMain.awards'),
		headingAnchor: t('newsRoomMain.awards_anchor'),
		titleType: 'h2',
		background: {
			type: 'pattern',
			color: 'rainbow',
		},
		cards:
			awards?.map((award) => {
				return {
					image: {
						src: award.award?.awardLogo?.mediaItemUrl ?? null,
						alt: award.award?.awardLogo?.alt ?? '',
					},
					date: award.award?.awardYear ?? null,
					title: award.award?.awardInfoLine1 ?? '',
					subTitle: award.award?.awardInfoLine2 ?? '',
				};
			}) ?? [],
	};

	const newsSetting = {
		preHeader: t('newsRoomMain.featured'),
		preheadType: 'default',
		heading: t('newsRoomMain.news'),
		headingAnchor: t('newsRoomMain.news_anchor'),
		titleType: 'h2',
		button: {
			buttonStyle: 'SecondaryReverse',
			buttonText: btnTextNewsSetting,
			link: mediateUrlPath(`/${locale}news/all-news`),
		},
		stories: InTheNews?.nodes.slice(0, 2).map((card, index) => {
			const newsCardBtn = '_blank';
			return cardBuilder(card, newsCardBtn);
		}),
		storiesNews: InTheNews?.nodes.slice(2, 5).map((card, index) => {
			const newsCardBtn = '_blank';
			return cardBuilder(card, newsCardBtn);
		}),
		background: {
			type: 'pattern',
			color: 'light',
		},
	};

	//Media Kit
	const mediaKitSetting = {
		preHeader: t('generic.tricentis'),
		preheadType: 'default',
		heading: t('newsRoomMain.mediaKit'),
		headingAnchor: t('newsRoomMain.mediaKit_anchor'),
		titleType: 'h2',
		mediaStories:
			mediaKit?.map((media) => {
				const mediaKitDownloadLink = media?.mediaKitDownloadLink;
				const mediaKitLogo = media?.mediaKitLogo;
				return {
					image: {
						src: mediaKitLogo?.mediaItemUrl ?? null,
						alt: mediaKitLogo?.altTexr ?? '',
					},
					downloadBtn: {
						label: mediaKitDownloadLink?.title ?? null,
						link: mediaKitDownloadLink?.url ?? null,
					},
				};
			}) ?? [],
		background: {
			type: 'solid',
			color: 'light',
		},
	};

	//navScroll
	//const ref = useRef(null);
	const sectionsRefs = useRef([]);
	const contentComponents = [pressSetting, newsSetting, awardSetting, mediaKitSetting];
	if (sectionsRefs.current.length !== contentComponents.length) {
		sectionsRefs.current = Array(contentComponents.length)
			.fill()
			.map((_, i) => sectionsRefs.current[i] || createRef());
	}
	const navigation = contentComponents.map(({ heading, headingAnchor }) => {
		return {
			linkText: heading,
			target: '',
			uri: `#${headingAnchor}`,
		};
	});

	const logo = {
		mobile: 'Navigate to:',
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
			<SecondaryNav logo={logo} navigation={navigation} sectionRefs={sectionsRefs} />
			<CardPressSection {...pressSetting} id="section-0" scrollRefChild={sectionsRefs.current[0]} />
			<CardPressSection
				{...newsSetting}
				className={styles['content-news']}
				id="section-1"
				scrollRefChild={sectionsRefs.current[1]}
			>
				<div className={styles['news']}>
					{newsSetting.storiesNews.map((news, newsIndex) => {
						const isLast = (index) => index === newsSetting.storiesNews.length - 1;
						return <NewsListItem key={newsIndex} {...news} className={`${isLast(newsIndex) && styles['last-news']}`} />;
					})}
				</div>
			</CardPressSection>
			{socialMediaDisruptorProps && <DisruptorSocialMedia {...socialMediaDisruptorProps} />}
			<AwardsGrid {...awardSetting} id="section-2" scrollRefChild={sectionsRefs.current[2]} />
			{moduleDisruptor && <Disruptor {...moduleDisruptor} />}
			<MediaKit {...mediaKitSetting} id="section-3" scrollRefChild={sectionsRefs.current[3]} />
			{/* Main guts of template - end */}
		</BaseTemplateWrapper>
	);
};

NewsroomMainTemplate.propTypes = {
	pageData: PropTypes.object,
	globalAlertData: PropTypes.object,
	headerMenuData: PropTypes.object,
	footerMenu: PropTypes.object,
};

export default NewsroomMainTemplate;
