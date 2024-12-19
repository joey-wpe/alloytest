const card = {
	prehead: {
		text: 'Preheader',
		Tag: 'h6',
	},
	tabTitle: 'Tab Title',
	title: {
		text: `Tabber that is short`,
		Tag: 'h6',
	},
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
		src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/05/Group-1865.png',
		alt: 'Featured Media',
	},
};
export const TabberDarkSampleData = {
	contentTabber: [
		{
			...card,
			title: {
				text: `Tabber Title Area that is long`,
				Tag: 'h6',
			},
		},
		{
			...card,
			tabTitle: 'Tab Title 2',
			title: {
				text: `Tabber that is short`,
				Tag: 'h6',
			},
		},
		{
			...card,
			title: {
				text: `Tabber Title Area that is long`,
				Tag: 'h6',
			},
		},
		{
			...card,
			tabTitle: 'Tab Title 4',
			title: {
				text: `Tabber that is short`,
				Tag: 'h6',
			},
		},
		{
			...card,
			title: {
				text: `Tabber that is short`,
				Tag: 'h6',
			},
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

export const TabberLightSampleData = {
	contentTabber: [
		{
			...card,
			tabTitle: 'Tab Title 1',
			title: {
				text: `Tabber Title Area that is long`,
				Tag: 'h6',
			},
		},
		{
			...card,
			title: {
				text: `Tabber that is short`,
				Tag: 'h6',
			},
		},
		{
			...card,
			tabTitle: 'Tab Title 3',
			title: {
				text: `Tabber Title Area that is long`,
				Tag: 'h6',
			},
		},
		{
			...card,
			title: {
				text: `Tabber that is short`,
				Tag: 'h6',
			},
		},
		{
			...card,
			tabTitle: 'Tab Title 5',
			title: {
				text: `Tabber that is short`,
				Tag: 'h6',
			},
		},
	],
	background: {
		type: 'solid',
		color: 'light',
		paddings: {
			verticalPadding: 'medium',
			bottomPadding: 'medium',
		},
	},
};
