const card = {
	preheadLogo: {
		src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/05/Frame.png',
		alt: 'Logo',
	},
	tabTitle: 'NeoLoad Tab',
	title: {
		text: `NeoLoad`,
		Tag: 'h6',
	},
	subTitle: 'Management & analytics',
	description: {
		text: `Automated end-to-end data integrity testing that works across your data landscape to prevent costly data migration, integration, and reporting issues.`,
		Tag: 'p',
	},
	action: {
		alignment: 'left',
		buttons: [
			{
				buttonStyle: 'PrimaryDefault',
				buttonText: 'Get started',
				link: 'https://www.google.com#primary',
			},
			{
				buttonStyle: 'TertiaryDefault',
				buttonText: 'Explore the platform',
				link: 'https://www.google.com#primary',
			},
		],
	},
	image: {
		src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/05/Group-1349.png',
		alt: 'Featured Media',
	},
	orientation: 'vertical',
};

export const productDarkSampleData = {
	copyTop: {
		prehead: 'The Tricentis platform',
		title: 'Continuous testing for digital businesses',
		description:
			'The Tricentis Continuous Testing Platform accelerates end-to-end testing of all your applications, data and business processes across the digital enterprise.',
	},
	copyItems: [
		{
			item: {
				title: 'Totally automated',
				description: 'Accelerating all phases of testing, from unit to performance.',
			},
		},
		{
			item: {
				title: 'Totally automated',
				description: 'Accelerating all phases of testing, from unit to performance.',
			},
		},
		{
			item: {
				title: 'Totally automated',
				description: 'Accelerating all phases of testing, from unit to performance.',
			},
		},
	],
	product: [
		{
			...card,
			preheadLogo: {
				src: 'https://develop-tricentis-backend.pantheonsite.io/wp-content/uploads/2022/05/image-6-1.png',
				alt: 'Logo',
			},
			tabTitle: 'qTest Tab',
			title: {
				text: `qTest`,
				Tag: 'h6',
			},
			subTitle: 'Management & analytics',
		},
		{
			...card,
			preheadLogo: {
				src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/06/logo-energy-05-1-1.png',
				alt: 'Logo',
			},
			title: {
				text: `NeoLoad`,
				Tag: 'h6',
			},
			subTitle: 'Management & analytics',
		},
		{
			...card,
			tabTitle: 'DataI Tab',
			title: {
				text: `Data Integrity`,
				Tag: 'h6',
			},
			subTitle: 'End-to-end data testing',
		},
		{
			...card,
			title: {
				text: `LiveCompare`,
				Tag: 'h6',
			},
			subTitle: 'SAP change intelligence',
		},
		{
			...card,
			title: {
				text: `Vera`,
				Tag: 'h6',
			},
			subTitle: 'Digital validation',
		},
		{
			...card,
			title: {
				text: `Test Automation`,
				Tag: 'h6',
			},
			subTitle: 'ServiceNow testing',
		},
		{
			...card,
			title: {
				text: `Testim`,
				Tag: 'h6',
			},
			subTitle: 'Custom web app testing',
		},
		{
			...card,
			title: {
				text: `Tosca`,
				Tag: 'h6',
			},
			subTitle: 'Entreprise test automation ',
		},
		{
			...card,
			title: {
				text: `Tosca`,
				Tag: 'h6',
			},
			subTitle: 'Entreprise test automation ',
		},
		{
			...card,
			title: {
				text: `Tosca`,
				Tag: 'h6',
			},
			subTitle: 'Entreprise test automation ',
		},
	],
	background: {
		type: 'pattern',
		color: 'blaze',
		paddings: {
			verticalPadding: 'medium',
			bottomPadding: 'medium',
		},
	},
};

export const productLightSampleData = {
	copyTop: {
		prehead: 'The Tricentis platform',
		title: 'Continuous testing for digital businesses',
		description:
			'The Tricentis Continuous Testing Platform accelerates end-to-end testing of all your applications, data and business processes across the digital enterprise.',
	},
	copyItems: [
		{
			item: {
				title: 'Totally automated',
				description: 'Accelerating all phases of testing, from unit to performance.',
			},
		},
		{
			item: {
				title: 'Totally automated',
				description: 'Accelerating all phases of testing, from unit to performance.',
			},
		},
		{
			item: {
				title: 'Totally automated',
				description: 'Accelerating all phases of testing, from unit to performance.',
			},
		},
	],
	product: [
		{
			...card,
			title: {
				text: `qTest`,
				Tag: 'h6',
			},
			subTitle: 'Management & analytics',
			orientation: 'horizontal',
		},
		{
			...card,
			title: {
				text: `NeoLoad`,
				Tag: 'h6',
			},
			subTitle: 'Management & analytics',
		},
		{
			...card,
			tabTitle: 'DataI Tab',
			title: {
				text: `Data Integrity`,
				Tag: 'h6',
			},
			subTitle: 'End-to-end data testing',
		},
		{
			...card,
			title: {
				text: `LiveCompare`,
				Tag: 'h6',
			},
			subTitle: 'SAP change intelligence',
		},
		{
			...card,
			title: {
				text: `Vera`,
				Tag: 'h6',
			},
			subTitle: 'Digital validation',
		},
		{
			...card,
			title: {
				text: `Test Automation`,
				Tag: 'h6',
			},
			subTitle: 'ServiceNow testing',
		},
		{
			...card,
			title: {
				text: `Testim`,
				Tag: 'h6',
			},
			subTitle: 'Custom web app testing',
		},
		{
			...card,
			title: {
				text: `Tosca`,
				Tag: 'h6',
			},
			subTitle: 'Entreprise test automation ',
		},
		{
			...card,
			title: {
				text: `Tosca`,
				Tag: 'h6',
			},
			subTitle: 'Entreprise test automation ',
		},
		{
			...card,
			title: {
				text: `Tosca`,
				Tag: 'h6',
			},
			subTitle: 'Entreprise test automation ',
		},
	],
	background: {
		type: 'solid',
		color: 'white',
		paddings: {
			verticalPadding: 'medium',
			bottomPadding: 'medium',
		},
	},
};
