import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { generateSchemaListItems } from '../../non-visual/SEOInserter/schemaService';

import SEOInserter from '../../non-visual/SEOInserter/SEOInserter';

const BasePageWrapper = ({ title, seoData, translatedPages = [], children, breadcrumbSchemaList }) => {
	const { asPath, locale } = useRouter();

	const modules = children?.props?.children?.props?.pageData?.templateBlog?.modules || [];

	const alernativeTranslations =
		Array.isArray(translatedPages) && translatedPages.length > 0
			? translatedPages
			: [
					{
						uri: asPath,
						locale: { locale },
					},
			  ];

	const schemaListItems = generateSchemaListItems(breadcrumbSchemaList?.breadcrumbsLinks);

	return (
		<>
			<SEOInserter
				title={title}
				seoData={seoData}
				modules={modules}
				translatedPages={alernativeTranslations}
				schemaListItems={schemaListItems}
			/>
			{/* Accessibility Toggle is removed until post-MVP */}
			{children}
		</>
	);
};

BasePageWrapper.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node,
};

export default BasePageWrapper;
