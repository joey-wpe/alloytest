import PropTypes from 'prop-types';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import OnetrustFloatingButton from '../../atoms/OnetrustFloatingButton/OnetrustFloatingButton';
import styles from './BasicOneColumnTemplate.module.scss';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import MastheadMinimal from '../../template-parts/MastheadMinimal/MastheadMinimal';
import { heroMinimalToMastheadMinimal } from '../../../data-mediators/PageHeaderToMastheadsMediator';

const BasicOneColumnTemplate = ({ pageData, pageCTAData, globalAlertData, headerMenuData, footerMenu }) => {
	const mastheadSettings = heroMinimalToMastheadMinimal(pageData.pageHeader);
	const WysiwygData = pageData?.template?.TemplateBasicOneColumn?.mainContent;
	const displayOnetrustSettings = pageData?.template?.TemplateBasicOneColumn?.displayOnetrustSettings;

	const { ref: refAnimation, inView } = useInView({
		threshold: 0,
	});
	const classAnimPlay = inView && styles['anim-play'];

	return (
		<>
			<BaseTemplateWrapper
				globalAlertData={globalAlertData}
				headerMenuData={headerMenuData}
				pageCTAData={pageCTAData}
				footerMenu={footerMenu}
			>
				{/* Main guts of template - start */}

				<MastheadMinimal {...mastheadSettings} />
				<div className={styles['container']} ref={refAnimation}>
					<div
						className={`${styles['primary-typography']} ${styles['primary-bullet-style']} ${styles['wysiwyg']} ${styles['anim-fade-in-up']} ${classAnimPlay}`}
						dangerouslySetInnerHTML={{ __html: WysiwygData }}
					/>
				</div>

				{/* Main guts of template - end */}
			</BaseTemplateWrapper>
			{displayOnetrustSettings ? <OnetrustFloatingButton /> : null}
		</>
	);
};

BasicOneColumnTemplate.propTypes = {
	pageData: PropTypes.object,
	globalAlertData: PropTypes.object,
	headerMenuData: PropTypes.object,
	footerMenu: PropTypes.object,
};

export default BasicOneColumnTemplate;
