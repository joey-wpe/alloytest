const mediaCard = {
	image: {
		src: `https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/05/image-6.png`,
		alt: 'Logo Media',
	},
	downloadBtn: {
		label: 'Tricentis logo black',
		link: 'google.com',
	},
};

export const MediaKitSampleData = {
	preHeader: 'Tricentis',
	preheadType: 'default',
	heading: 'Media Kit',
	titleType: 'h2',
	mediaStories: [{
		...mediaCard
	}, {
		...mediaCard
	}, {
		...mediaCard
	}, {
		...mediaCard
	}],
	background: {
		type: 'solid',
		color: 'light',
	},
	disruptor: {
		title: 'Deliver cloud-based apps with confidence',
		titleType: 'h5',
		buttons: {
			alignment: 'right',
			buttons: [{
				buttonStyle: 'SecondaryReverse',
				buttonText: 'Download',
				link: 'https://www.google.com',
			}, ],
		},
		background: {
			type: 'pattern',
			color: 'midtone',
		},
	}
};