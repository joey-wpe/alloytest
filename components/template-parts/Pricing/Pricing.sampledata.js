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
	background: {
		type: 'pattern',
		color: 'blaze',
	},
};

const Pricing_Sample_Data_Blue = {
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
	background: {
		type: 'pattern',
		color: 'blue',
	},
};

export { Pricing_Sample_Data_Dark, Pricing_Sample_Data_Blue };
