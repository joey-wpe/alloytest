export function gqlCaseStudyTemplateResponseToCaseStudyTemplate(gqlModuleData) {
	if (!gqlModuleData) {
		console.error('ERROR: gqlCaseStudyTemplateResponseToCaseStudyTemplate: gqlModuleData is undefined');
		return null;
	}

	const mastheadSettings = {
		prehead: gqlModuleData.caseStudyFields?.customerName ?? '',
		title: gqlModuleData.title,
		background: {
			type: 'pattern',
			color: 'blue',
		},
	};
	const logoCompany = {
		src: gqlModuleData.caseStudyFields?.companyLogo?.mediaItemUrl,
		alt: gqlModuleData.caseStudyFields?.companyLogo?.altText,
	};
	const keyOutcomes = gqlModuleData.caseStudyFields?.keyOutcomes;
	const companyFacts = gqlModuleData.caseStudyFields?.companyFacts;
	const repeaterItems = gqlModuleData.caseStudyFields?.flexRepeater;

	return {
		mastheadSettings,
		keyOutcomes,
		companyFacts,
		repeaterItems,
		logoCompany,
	};
}
