import PropTypes from 'prop-types';
import React from 'react';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import styles from './NewsDetailTemplate.module.scss';
import { mediateUrlPath } from '../../../wplib/urlHelpers';
import MastheadMinimal from '../../template-parts/MastheadMinimal/MastheadMinimal';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'next-i18next';

const NewsDetailTemplate = ({ pageData, pageCTAData, globalAlertData, headerMenuData, footerMenu }) => {
	const { t } = useTranslation('common');
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const classAnimPlay = inView && styles['anim-play'];
	const classFadeInUp = styles['anim-fade-in-up'];

	const mastheadSettings = {
		prehead: t('newsDetail.prehead'),
		title: pageData?.title ?? '',
		background: {
			type: 'pattern',
			color: 'blue',
		},
	};

	const content = pageData?.content;

	return (
		<BaseTemplateWrapper
			globalAlertData={globalAlertData}
			headerMenuData={headerMenuData}
			pageCTAData={pageCTAData}
			footerMenu={footerMenu}
		>
			{/* Main guts of template - start */}
			<MastheadMinimal {...mastheadSettings} />
			<div className={styles.container} ref={ref}>
				{content && (
					<div
						className={`${styles.wysiwyg} ${'anim-delay-3'} ${styles['primary-bullet-style']} ${classFadeInUp} ${classAnimPlay}`}
						dangerouslySetInnerHTML={{ __html: content ?? '' }}
					/>
				)}
			</div>
			{/* Main guts of template - end */}
		</BaseTemplateWrapper>
	);
};

NewsDetailTemplate.propTypes = {
	pageData: PropTypes.object,
	globalAlertData: PropTypes.object,
	headerMenuData: PropTypes.object,
	footerMenu: PropTypes.object,
};

export default NewsDetailTemplate;
