const storySimple = {
	image: {
		src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/Tricentis-logos.png',
		alt: 'Logo Image',
	},
	title: 'H3 Product Card headline for this Card',
	description:
		'Intelligent test automation takes the risk out of your digital initiatives, accelerates software releases, and helps you deliver new business functionality at high speed, low cost.',
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
		{
			buttonStyle: 'TertiaryDefault',
			buttonText: 'Get a Free Trial',
			link: 'https://www.google.com#secondary',
		},
	],
};

const storyMedium = {
	image: {
		src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/Tricentis-logos.png',
		alt: 'Logo Image',
	},
	title: 'H4 Product Card headline for this Card',
	description:
		'Intelligent test automation takes the risk out of your digital initiatives, accelerates software releases, and helps you deliver new business functionality at high speed, low cost.',
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
};

const storyFull = {
	image: {
		src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/Tricentis-logos.png',
		alt: 'Logo Image',
	},
	title: 'H6 Smart testing starts now',
	description: 'Intelligent test automation takes the risk out of your digital',
	buttons: [
		{
			buttonStyle: 'TertiaryDefault',
			buttonText: 'Get a Free Trial',
			link: 'https://www.google.com#secondary',
		},
	],
};

export const OneColumn = {
	commonHeaderDetails: {
		contentAlignment: 'center',
		prehead: 'Preheader',
		preheadType: 'default',
		title: 'Product Card Module Main Title',
		titleType: 'h2',
		description:
			'We’re the world’s number one continuous testing platform for a reason. Equipped with a unique set of features and capabilities, Tricentis products support the full testing lifecycle, from automation and performance to reporting and management.',
	},
	stories: [
		{
			...storySimple,
		},
		{
			...storySimple,
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
	type: 'one-column',
};

export const Simple = {
	commonHeaderDetails: {
		contentAlignment: 'center',
		prehead: 'Preheader',
		preheadType: 'default',
		title: 'Product Card Module Main Title',
		titleType: 'h2',
		description:
			'We’re the world’s number one continuous testing platform for a reason. Equipped with a unique set of features and capabilities, Tricentis products support the full testing lifecycle, from automation and performance to reporting and management.',
	},
	stories: [
		{
			...storySimple,
		},
		{
			...storySimple,
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
	type: 'two-columns',
};

export const Medium = {
	commonHeaderDetails: {
		contentAlignment: 'center',
		prehead: 'Preheader',
		preheadType: 'default',
		title: 'Product Card Module Main Title',
		titleType: 'h2',
		description:
			'We’re the world’s number one continuous testing platform for a reason. Equipped with a unique set of features and capabilities, Tricentis products support the full testing lifecycle, from automation and performance to reporting and management.',
	},
	stories: [
		{
			...storyMedium,
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
				{
					buttonStyle: 'TertiaryDefault',
					buttonText: 'Get a Free Trial',
					link: 'https://www.google.com#secondary',
				},
			],
		},
		{
			...storyMedium,
		},
		{
			...storyMedium,
			buttons: [
				{
					buttonStyle: 'PrimaryDefault',
					buttonText: 'Get started',
					link: 'https://www.google.com#secondary',
				},
				{
					buttonStyle: 'TertiaryDefault',
					buttonText: 'Get a Free Trial',
					link: 'https://www.google.com#secondary',
				},
			],
		},
		{
			...storyMedium,
		},
		{
			...storyMedium,
		},
		{
			...storyMedium,
			buttons: [
				{
					buttonStyle: 'PrimaryDefault',
					buttonText: 'Get started',
					link: 'https://www.google.com#secondary',
				},
				{
					buttonStyle: 'TertiaryDefault',
					buttonText: 'Get a Free Trial',
					link: 'https://www.google.com#secondary',
				},
			],
		},
	],
	background: {
		type: 'pattern',
		color: 'rainbow',
		paddings: {
			verticalPadding: 'medium',
			bottomPadding: 'medium',
		},
	},
	type: 'three-columns',
};

export const Full = {
	commonHeaderDetails: {
		contentAlignment: 'center',
		prehead: 'Preheader',
		preheadType: 'default',
		title: 'Product Card Module Main Title',
		titleType: 'h2',
		description:
			'We’re the world’s number one continuous testing platform for a reason. Equipped with a unique set of features and capabilities, Tricentis products support the full testing lifecycle, from automation and performance to reporting and management.',
	},
	stories: [
		{
			...storyFull,
		},
		{
			...storyFull,
		},
		{
			...storyFull,
		},
		{
			...storyFull,
		},
		{
			...storyFull,
		},
		{
			...storyFull,
		},
		{
			...storyFull,
		},
		{
			...storyFull,
		},
	],
	background: {
		type: 'pattern',
		color: 'rainbow',
		paddings: {
			verticalPadding: 'medium',
			bottomPadding: 'medium',
		},
	},
	type: 'four-columns',
};
