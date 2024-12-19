const story1 = {
	prehead: 'Case Study Slider stories',
	title: 'McKesson performed an extensive search ',
	description:
		'McKesson performed an extensive search for testing solutions that were equipped for their sophisticated IT landscape—both current and future-state. They discovered Tricentis and took up CEO Sandeep Johri’s bold challenge.',
	list: {
		title: 'Key Outcomes:',
		items: [
			{
				data: '$214.3B USD in revenue',
			},
			{
				data: '1/3 of all US prescription medicine in North America',
			},
			{
				data: '2.1M+ customers served daily across Europe',
			},
		],
	},
	image: {
		src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/CustomerSuccessExampleImage1.jpg',
		alt: 'Case Study Slider Image',
	},
	logo: {
		src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/Mckesson-1.png',
		alt: 'Case Study Slider Logo',
	},
	buttons: {
		alignment: 'left',
		buttons: [
			{
				buttonStyle: 'SecondaryReverse',
				buttonText: 'Read more',
				link: 'https://www.google.com#primary',
			},
			{
				buttonStyle: 'TertiaryReverse',
				buttonText: 'View more success stories',
				link: 'https://www.google.com#primary',
			},
		],
	},
};

const story2 = {
	prehead: 'Case Study Slider stories',
	title: 'Lorem ipsum dolor sit amet, consectetur',
	description:
		'Proin eu ligula nec risus facilisis aliquet. Phasellus in tortor ut ex feugiat elementum sit amet ut urna. Proin pulvinar nisi vitae placerat euismod. Morbi fermentum rutrum risus quis mollis. Sed at sem odio. Morbi ac nisi',
	list: {
		title: 'Key Outcomes:',
		items: [
			{
				data: '$123.4B USD Proin eu ligula',
			},
			{
				data: '1/3 Phasellus in tortor ut ex feugiat elementum sit',
			},
			{
				data: '2.1M+ Proin pulvinar nisi vitae',
			},
		],
	},
	image: {
		src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/CustomerSuccessExampleImage2.jpg',
		alt: 'Case Study Slider Image',
	},
	logo: {
		src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/Mckesson-1.png',
		alt: 'Case Study Slider Logo',
	},
	buttons: {
		alignment: 'left',
		buttons: [
			{
				buttonStyle: 'SecondaryReverse',
				buttonText: 'Read more',
				link: 'https://www.google.com#primary',
			},
			{
				buttonStyle: 'TertiaryReverse',
				buttonText: 'View more success stories',
				link: 'https://www.google.com#primary',
			},
		],
	},
};

export const CaseStudySlider_SampleData_Basic = {
	stories: [
		{
			...story1,
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

export const CaseStudySlider_SampleData_Carousel = {
	stories: [
		{
			...story1,
		},
		{
			...story2,
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

export const CaseStudySlider_SampleData_Homepage = CaseStudySlider_SampleData_Carousel;
