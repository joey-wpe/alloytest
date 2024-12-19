import PropTypes from 'prop-types';
import React from 'react';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import { useTranslation } from 'next-i18next';
import FlipCards from '../../modules/IconFlipCard/FlipCards';
import Masthead from '../../template-parts/Masthead/Masthead';
import styles from './404PageTemplate.module.scss';

const Custom404PageTemplate = ({ globalAlertData, headerMenuData, footerMenu, notFound404Page }) => {
	const { t } = useTranslation('common');

	let notFound404PageData = notFound404Page;

	if (!notFound404PageData?.flip) {
		throw new Error('404PageTemplate - missing flip data, 404 page cannot be rendered!');
	}

	const mastheadData = {
		title: {
			text: notFound404PageData.masthead_404_title,
			Tag: notFound404PageData.masthead_404_type,
		},
		description: {
			text: notFound404PageData.masthead_404_description,
			Tag: 'p',
		},
		action: {
			alignment: 'left',
			buttons: [
				{
					buttonStyle: 'PrimaryDefault',
					buttonText: notFound404PageData.masthead_404_actions[0].link.title,
					link: notFound404PageData.masthead_404_actions[0].link.url,
				},
				{
					buttonStyle: 'TertiaryDefault',
					buttonText: notFound404PageData.masthead_404_actions[1].link.title,
					link: notFound404PageData.masthead_404_actions[1].link.url,
				},
			],
		},
		background: {
			type: 'pattern',
			color: 'rainbow',
		},
		mediaContent: {
			image: {
				src: notFound404PageData.image,
				alt: '404 Not found',
			},
		},
	};

	var desktop_0_BackgroundImage = null,
		desktop_1_BackgroundImage = null,
		desktop_2_BackgroundImage = null;

	var icon_0_svg = null,
		icon_1_svg = null,
		icon_2_svg = null;

	desktop_0_BackgroundImage = notFound404PageData.flip[0].background_image.image.url;
	desktop_1_BackgroundImage = notFound404PageData.flip[1].background_image.image.url;
	desktop_2_BackgroundImage = notFound404PageData.flip[2].background_image.image.url;

	icon_0_svg = notFound404PageData.flip[0].icon_wrapper.support_icon;
	icon_1_svg = notFound404PageData.flip[1].icon_wrapper.support_icon;
	icon_2_svg = notFound404PageData.flip[2].icon_wrapper.support_icon;

	const flipCardsData = {
		columnsPerRow: 3,
		background: {
			type: 'solid',
			color: 'white',
		},
		flipCards: [
			{
				icon: icon_0_svg,
				title: notFound404PageData.flip[0].title_text,
				description: notFound404PageData.flip[0].description,
				frontOverlay: 'warp',
				backOverlay: {
					type: 'solid',
					color: 'blue',
				},
				button: {
					buttonText: notFound404PageData.flip[0].link.title,
					link: notFound404PageData.flip[0].link.url,
					//link: `/${GlobalConstants.FrontendRoutes.Products}`,
					buttonStyle: 'TertiaryReverse',
				},
				background: {
					type: 'image',
					desktopBackgroundImage: desktop_0_BackgroundImage,
					color: 'blaze',
				},
			},
			{
				icon: icon_1_svg,
				title: notFound404PageData.flip[1].title_text,
				description: notFound404PageData.flip[1].description,
				frontOverlay: 'velocity',
				backOverlay: {
					type: 'solid',
					color: 'blue',
				},
				button: {
					buttonText: notFound404PageData.flip[1].link.title,
					link: notFound404PageData.flip[1].link.url,
					//link: `/${GlobalConstants.FrontendRoutes.ProductTours}`,
					buttonStyle: 'TertiaryReverse',
				},
				background: {
					type: 'image',
					desktopBackgroundImage: desktop_1_BackgroundImage,
					color: 'blaze',
				},
			},
			{
				icon: icon_2_svg,
				title: notFound404PageData.flip[2].title_text,
				description: notFound404PageData.flip[2].description,
				frontOverlay: 'white',
				backOverlay: {
					type: 'solid',
					color: 'blue',
				},
				button: {
					buttonText: notFound404PageData.flip[2].link.title,
					link: notFound404PageData.flip[2].link.url,
					//link: `/${GlobalConstants.FrontendRoutes.Resources}`,
					buttonStyle: 'TertiaryReverse',
				},
				background: {
					type: 'image',
					desktopBackgroundImage: desktop_2_BackgroundImage,
					color: 'blaze',
				},
			},
		],
	};

	return (
		<BaseTemplateWrapper globalAlertData={globalAlertData} headerMenuData={headerMenuData} footerMenu={footerMenu}>
			{/* Main guts of template - start */}
			<Masthead {...mastheadData} />
			<div className={styles['flip-cards-wrapper']}>
				<FlipCards {...flipCardsData} />
			</div>
			{/* Main guts of template - end */}
		</BaseTemplateWrapper>
	);
};

Custom404PageTemplate.propTypes = {
	globalAlertData: PropTypes.object,
	headerMenuData: PropTypes.object,
	footerMenu: PropTypes.object,
};

export default Custom404PageTemplate;
