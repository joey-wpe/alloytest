import PropTypes from 'prop-types';
import React from 'react';
import BaseTemplateWrapper from '../BaseTemplateWrapper/BaseTemplateWrapper';
import ProductLogin from '../../template-parts/ProductLogin/ProductLogin';
import { mediateUrlPath } from '../../../wplib/urlHelpers';

const LocationsTemplate = ({ pageData, pageCTAData, globalAlertData, headerMenuData, footerMenu }) => {
	const data = pageData.template.productLoginFields;
	// console.log(data);

	const defaults = {
		prehead: {
			text: data.preheadText,
			Tag: data.preheadType,
		},
		title: {
			text: data.titleText,
			Tag: data.titleType,
		},
		description: data?.description,
		action: {
			alignment: 'left',
			buttons: [
				{
					buttonStyle: 'TertiaryDefault',
					buttonText: data.link?.title,
					link: mediateUrlPath(data.link?.url),
				},
			],
		},
		customLinks: data?.customLinks,
		siteUrl: data?.siteUrl,
		trial: data?.trial,
		productLogo: {
			src: data.productLogo?.mediaItemUrl,
			alt: data.productLogo?.altText,
		},
	};

	return (
		<BaseTemplateWrapper
			globalAlertData={globalAlertData}
			headerMenuData={headerMenuData}
			pageCTAData={null}
			footerMenu={footerMenu}
		>
			{/* Main guts of template - start */}

			<ProductLogin {...defaults} />

			{/* Main guts of template - end */}
		</BaseTemplateWrapper>
	);
};

LocationsTemplate.propTypes = {
	pageData: PropTypes.object,
	globalAlertData: PropTypes.object,
	headerMenuData: PropTypes.object,
	footerMenu: PropTypes.object,
};

export default LocationsTemplate;
