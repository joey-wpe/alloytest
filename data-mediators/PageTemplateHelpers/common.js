import StringConstants from '../../StringConstants';
import { cleanURI, extractTemplateName } from './utils';
import { templateTypeMap } from './mappings';

import { formatBasicOneColumnTemplate } from '../PageTemplates/BasicOneColumn';
import { formatROICalculatorMainTemplate } from '../PageTemplates/ROICalculatorMain';
import { formatROICalculatorResultsTemplate } from '../PageTemplates/ROICalculatorResults';
import { formatLocationsTemplate } from '../PageTemplates/Locations';
import { formatProductLoginTemplate } from '../PageTemplates/ProductLogin';
import { formatProductDemoFormTemplate } from '../PageTemplates/ProductDemoForm';
import { formatTeamMemberArchiveTemplate } from '../PageTemplates/TeamMemberArchive';
import { formmatModularWithSecondaryNavTemplate } from '../PageTemplates/ModularWithSecondaryNav';
import { formatModularTemplate } from '../PageTemplates/Modular';
import { formatPartnerTemplate } from '../PageTemplates/Partner';
import { formatArchiveTemplate } from '../PageTemplates/Archive';
import { formatNewsroomMainTemplate } from '../PageTemplates/NewsRoomMain';
import { formatCaseStudiesMainTemplate } from '../PageTemplates/CaseStudiesMain';

/**
 * Description: Format basic page data.
 */
export const transformBasicPagesRestToJson = (pages) => {
	if (!pages || pages.length === 0) return [];

	return pages.map((page) => ({
		__typename: 'Page',
		databaseId: page.id ?? null,
		id: page.id ?? null,
		title: page.title?.rendered ?? null,
		slug: page.slug ?? null,
		uri: cleanURI(page.uri),
		template: {
			__typename: templateTypeMap[extractTemplateName(page.template)],
			templateName: extractTemplateName(page.template),
		},
		locale: {
			__typename: 'Locale',
			locale: page.wpml_current_locale ?? null,
		},
	}));
};

/**
 * Description: Format Page Template data.
 */
export function transformPageTemplateRestToJson(restResponse, template, locale, postTypeData) {
	switch (template) {
		case StringConstants.PageTemplates.BasicOneColumn:
			return formatBasicOneColumnTemplate(restResponse, template, locale, postTypeData);
		case StringConstants.PageTemplates.ROICalculatorMain:
			return formatROICalculatorMainTemplate(restResponse, template, locale, postTypeData);
		case StringConstants.PageTemplates.ROICalculatorResult:
			return formatROICalculatorResultsTemplate(restResponse, template, locale, postTypeData);
		case StringConstants.PageTemplates.Locations:
			return formatLocationsTemplate(restResponse, template, locale, postTypeData);
		case StringConstants.PageTemplates.ProductLogin:
			return formatProductLoginTemplate(restResponse, template, locale, postTypeData);
		case StringConstants.PageTemplates.ProductDemoForm:
			return formatProductDemoFormTemplate(restResponse, template, locale, postTypeData);
		case StringConstants.PageTemplates.TeamMemberArchive:
			return formatTeamMemberArchiveTemplate(restResponse, template, locale, postTypeData);
		case StringConstants.PageTemplates.ModularWithSecondaryNav:
			return formmatModularWithSecondaryNavTemplate(restResponse, template, locale, postTypeData);
		case StringConstants.PageTemplates.Modular:
			return formatModularTemplate(restResponse, template, locale, postTypeData);
		case StringConstants.PageTemplates.Partners:
			return formatPartnerTemplate(restResponse, template, locale, postTypeData);
		case StringConstants.PageTemplates.Archive:
			return formatArchiveTemplate(restResponse, template, locale, postTypeData);
		case StringConstants.PageTemplates.NewsroomMain:
			return formatNewsroomMainTemplate(restResponse, template, locale, postTypeData);
		case StringConstants.PageTemplates.CaseStudiesMain:
			return formatCaseStudiesMainTemplate(restResponse, template, locale, postTypeData);
		default:
			console.error(`ERROR: transformPageTemplateRestToJson: template: ${template} was undefined, returning null`);
			return null;
	}
}
