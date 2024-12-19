const sampleFormOptions = {
	formOptions: {
		shouldFormPrefill: true,
		channel: 'None',
		goal: {
			name: 'PlaceholderName',
			type: 'PlaceholderGoalType',
			use_form_count: false,
		},
		areaOfInterest: 'PlaceholderAreaOfInterest',
		ctaLabel: 'Contact us',
		formID: '797',
		leadSource: 'Contact (English)',
		nextFormID: null,
		ContentOffer:
			'technology_leadership,business_applications,strategic_quality,strategic_it,tactical_tester,tactical_user,strategic_salesforce,strategic_sap,strategic_di,strategic_servicenow,strategic_it_expansion,strategic_quality_expansion,strategic_sap_expansion',
		Initiative: 'tricentis_platform',
		COStage: 'prospect',
		contentOffer: 'N-CO-4-674784',
		COTitle: 'Contact Form Submission',
		Product: 'tricentis_platform',
		AssetType: 'contact_us_accelerator',
		allowFreemiumEmails: true,
		redirectURL: '/thank-you/',
		marketingOptInCheckbox: 'explicit',
		termsOptInCheckbox: 'explicit',
	},
};

export const Form_SampleData_BlueBackground = {
	preHeader: 'Preheader',
	preHeadType: 'default',
	heading: 'Form Module Headline',
	headingType: 'h2',
	background: {
		type: 'pattern',
		color: 'blue',
		paddings: {
			verticalPadding: 'medium',
			bottomPadding: 'medium',
		},
	},
	...sampleFormOptions,
};

export const Form_SampleData_LightPattern = {
	preHeader: 'Preheader',
	preHeadType: 'default',
	heading: 'Form Module Headline',
	headingType: 'h2',
	background: {
		type: 'pattern',
		color: 'light',
		paddings: {
			verticalPadding: 'medium',
			bottomPadding: 'medium',
		},
	},
	...sampleFormOptions,
};
