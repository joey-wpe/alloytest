import React from 'react';
import PropTypes from 'prop-types';
import Masthead from '../../template-parts/Masthead/Masthead';
import MastheadMinimal from '../../template-parts/MastheadMinimal/MastheadMinimal';
import {
	isMasthead,
	isMastheadMinimal,
	isMastheadNone,
	heroToMasthead,
	heroMinimalToMastheadMinimal,
} from '../../../data-mediators/PageHeaderToMastheadsMediator';
import { useTranslation } from 'next-i18next';

const MastheadSwitcher = ({ pageHeader, page, breadcrumb }) => {
	// console.log('ms-pageHeader', pageHeader);

	const { t } = useTranslation('common');

	if (isMastheadMinimal(pageHeader)) {
		return <MastheadMinimal {...heroMinimalToMastheadMinimal(pageHeader)} breadcrumb={breadcrumb} />;
	} else if (isMasthead(pageHeader)) {
		return <Masthead {...heroToMasthead(t, pageHeader, page)} />;
	} else if (isMastheadNone(pageHeader)) {
		return <></>;
	} else {
		console.error('MastheadSwitcher: no known Masthead type found: ', pageHeader?.heroType);
		return <div id="invalid_masthead_unknown_type"></div>;
	}
};

MastheadSwitcher.propTypes = {
	pageHeader: PropTypes.object,
	breadcrumb: PropTypes.object,
};

export default MastheadSwitcher;
