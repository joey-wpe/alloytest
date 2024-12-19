const tile = {
	title: 'Lorem ipsum dolor sit amet eam quas',
	description:
		'Speed matters, which is why Tricentis prioritizes it. AI-driven, codeless, and fully automated, our continuous testing platform.',
	button: {
		buttonStyle: 'TertiaryDefault',
		buttonText: 'Explore the platform',
		link: 'https://www.google.com#secondary',
	},
	image: {
		src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/Mask-group-1.png',
		alt: 'Image with mask',
	},
};

export const CrossLinkTile_FeaturedGrid = {
	tiles: [
		{ ...tile },
		{
			...tile,
			image: {
				src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/Background.png',
				alt: 'Image with mask',
			},
		},
		{
			...tile,
			image: {
				src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/Background-1.png',
				alt: 'Image with mask',
			},
		},
	],

	background: {
		type: 'pattern',
		color: 'light',
		paddings: {
			verticalPadding: 'medium',
			bottomPadding: 'medium',
		},
	},
};

export const CrossLinkTile_BasicGrid = {
	tiles: [
		{
			...tile,
			image: {
				src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/Background-3.png',
				alt: 'Image with mask',
			},
		},
		{
			...tile,
			image: {
				src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/Background-2.png',
				alt: 'Image with mask',
			},
		},
	],
	background: {
		type: 'pattern',
		color: 'blue',
		paddings: {
			verticalPadding: 'medium',
			bottomPadding: 'medium',
		},
	},
};
