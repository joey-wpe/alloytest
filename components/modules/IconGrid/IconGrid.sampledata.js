//Component Story

const storyCard = {
	icon: {
		src: '/icons/card-icon.svg',
		alt: 'Featured Icon',
	},
	title: 'Icon grid headline for this icon column',
	description:
		'Intelligent test automation takes the risk out of your digital initiatives, accelerates software releases, and helps you deliver new business functionality at high speed, low cost.',

	buttonStyle: 'TertiaryDefault',
	buttonText: 'Get a Free Trial',
	link: 'https://www.google.com#primary',
};

const information = {
	prehead: 'Preheader',
	preheadType: 'default',
	title: 'Icon grid Main Title',
	titleType: 'h2',
	description:
		'We’re the world’s number one continuous testing platform for a reason. Equipped with a unique set of features and capabilities, Tricentis products support the full testing lifecycle, from automation and performance to reporting and management.',
};

export const BasicGrid_SampleData = {
	contentAlignment: 'center',
	columnFormat: 'two-columns',
	content: {
		...information,
	},

	iconEntries: [
		{
			...storyCard,
		},
		{
			...storyCard,
		},
		{
			...storyCard,
		},
		{
			...storyCard,
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
	buttons: [
		{
			alignment: 'center',
			buttons: [
				{
					buttonStyle: 'PrimaryDefault',
					buttonText: 'Read more',
					link: 'https://www.google.com#primary',
				},
				{
					buttonStyle: 'TertiaryDefault',
					buttonText: 'View more success stories',
					link: 'https://www.google.com#primary',
				},
			],
		},
	],
};

export const MediumGrid_SampleData = {
	contentAlignment: 'center',
	columnFormat: 'three-columns',
	content: [
		{
			...information,
		},
	],
	iconEntries: [
		{
			...storyCard,
		},
		{
			...storyCard,
		},
		{
			...storyCard,
		},
		{
			...storyCard,
		},
		{
			...storyCard,
		},
		{
			...storyCard,
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
	buttons: [
		{
			alignment: 'left',
			buttons: [
				{
					buttonStyle: 'PrimaryDefault',
					buttonText: 'Read more',
					link: 'https://www.google.com#primary',
				},
				{
					buttonStyle: 'TertiaryDefault',
					buttonText: 'View more success stories',
					link: 'https://www.google.com#primary',
				},
			],
		},
	],
};

export const FullGrid_SampleData = {
	contentAlignment: 'left',
	columnFormat: 'four-columns',
	content: [
		{
			...information,
		},
	],
	iconEntries: [
		{
			...storyCard,
		},
		{
			...storyCard,
		},
		{
			...storyCard,
		},
		{
			...storyCard,
		},
		{
			...storyCard,
		},
		{
			...storyCard,
		},
		{
			...storyCard,
		},
		{
			...storyCard,
		},
		{
			...storyCard,
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
	buttons: [
		{
			alignment: 'left',
			buttons: [
				{
					buttonStyle: 'PrimaryDefault',
					buttonText: 'Read more',
					link: 'https://www.google.com#primary',
				},
				{
					buttonStyle: 'TertiaryDefault',
					buttonText: 'View more success stories',
					link: 'https://www.google.com#primary',
				},
			],
		},
	],
};
