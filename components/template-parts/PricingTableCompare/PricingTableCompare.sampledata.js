const card = {
	prehead: { text: 'Essential', color: 'mist' },
	subHead: 'For developers and testers',
	price: '$20K/year',
	description: `Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Sed porttitor lectus nibh.`,
	itemsTitle: 'Highlights:',
	items: [
		{
			item: 'Code-less test design',
		},
		{
			item: 'Code-less test design',
		},
		{
			item: 'Code-less test design',
		},
	],
	button: {
		buttonStyle: 'PrimaryDefault',
		buttonText: 'Start free trial',
		link: 'https://www.google.com#secondary',
	},
};

const Pricing_Sample_Data_Dark = {
	price: {
		imageLogo: {
			src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/05/Tricentis_NeoLoad-Secondary-1.png',
			alt: 'Mask Logo',
		},
		description: `Tricentis NeoLoad is used to build continuous performance and load testing for all use cases from APIs and microservices to end-to-end system wide testing of monolithic applications. `,
		button: {
			buttonStyle: 'TertiaryDefault',
			buttonText: 'Start free trial',
			link: 'https://www.google.com#secondary',
		},
		cards: [
			{ ...card },
			{ ...card, prehead: { text: 'Pro', color: 'thruster' } },
			{ ...card, prehead: { text: 'Enterprise', color: 'bolt' }, items: [{ item: 'Code-less test design' }] },
		],

	},
	tableCompare: {
		table: {
			headTable: {
				type: 'list',
				items: [
					{ item: 'NeoLoad Package for who ?' },
					{ item: 'Code-less test design & maintenance' },
					{ item: 'Workspaces' },
					{ item: 'SaaS Load Generators (Fair usage) ' },
					{ item: 'SSO (SaaS only) ' },
					{ item: 'Resource Reservation' },
				],
			},
			bodies: [
				{
					type: 'ckeck',
					items: [
						{
							item: `<strong>For developers and testers</strong> who want to ensure that their application will perform at scale`,
						},
						{
							item: true,
						},
						{
							item: false,
						},
						{
							item: false,
						},
						{
							item: false,
						},
						{
							item: false,
						},
					],
					buttons: [
						{
							buttonStyle: 'PrimaryDefault',
							buttonText: 'Get started',
							link: 'https://www.google.com#secondary',
						},
						{
							buttonStyle: 'SecondaryReverse',
							buttonText: 'Get started',
							link: 'https://www.google.com#secondary',
						},
					],
				},
				{
					type: 'ckeck',
					items: [
						{
							item: `<strong>For enterprise organizations</strong> who need to standardize on a performance engineering solution that supports all use cases, development models and business critical applications. `,
						},
						{
							item: true,
						},
						{
							item: `Unlimited`,
						},
						{
							item: true,
						},
						{
							item: true,
						},
						{
							item: true,
						},
					],
					buttons: [
						{
							buttonStyle: 'PrimaryDefault',
							buttonText: 'Get started',
							link: 'https://www.google.com#secondary',
						},
						{
							buttonStyle: 'SecondaryReverse',
							buttonText: 'Get started',
							link: 'https://www.google.com#secondary',
						},
					],
				},
				{
					type: 'ckeck',
					items: [
						{
							item: `<strong>For developers and testers</strong> who want to ensure that their application will perform at scale`,
						},
						{
							item: true,
						},
						{
							item: `SaaS or On-Premise`,
						},
						{
							item: true,
						},
						{
							item: true,
						},
						{
							item: true,
						},
					],
					buttons: [
						{
							buttonStyle: 'PrimaryDefault',
							buttonText: 'Get started',
							link: 'https://www.google.com#secondary',
						},
						{
							buttonStyle: 'SecondaryReverse',
							buttonText: 'Get started',
							link: 'https://www.google.com#secondary',
						},
					],
				},
			],
		},
	},
};

export { Pricing_Sample_Data_Dark };
