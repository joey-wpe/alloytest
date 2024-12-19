import React from 'react';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import News from '../../template-parts/News/News';
import { formatYear } from '../../../wplib/dateFormatter';
import MastheadMinimal from '../../template-parts/MastheadMinimal/MastheadMinimal';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import GlobalConstants from '../../../GlobalConstants';

const NewsArchive = ({ newsData, globalAlertData, headerMenuData, footerMenu, type }) => {
	const path = useRouter().pathname;
	console.log('*** News Year response transformed - Archive', newsData?.data?.allNews?.nodes[0]?.date);
	const currentYear = formatYear(newsData?.data?.allNews?.nodes[0]?.date || new Date());
	console.log('*** News Year response transformed - current year', currentYear);
	const years = yearsArray(currentYear);
	const { t } = useTranslation('common');

	let mastheadData = {
		prehead: t('generic.tricentis'),
		preheadType: 'default',
		title: path.endsWith(GlobalConstants.FrontendRoutes.NewsArchive)
			? t('newsDetail.prehead')
			: t('newsRoomMain.release'),
		titleType: 'h2',
		background: {
			type: 'pattern',
			color: 'blue',
		},
	};

	// TODO:: consider querying the oldest date dynamically instead of hardcoding
	// generate an array of years from 2019 through the current year
	function yearsArray(currentYear) {
		let years = [];
		do {
			years.push(currentYear);
			currentYear -= 1;
		} while (currentYear >= 2019);
		return years;
	}

	return (
		<BaseTemplateWrapper
			globalAlertData={globalAlertData}
			headerMenuData={headerMenuData}
			pageCTAData={null}
			footerMenu={footerMenu}
		>
			{/* Main guts of template - start */}

			<MastheadMinimal {...mastheadData} />
			<div>
				<News years={years} type={type} />
			</div>

			{/* Main guts of template - end */}
		</BaseTemplateWrapper>
	);
};

export default NewsArchive;
