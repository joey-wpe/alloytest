const information = {
	prehead: 'Preheader',
	preheadType: 'default',
	title: 'Avatar Module Headline',
	titleType: 'h2',
	description: `We're the world's number one continuous testing platform for a reason. Equipped with a unique set of features and capabilities, Tricentis products support the full testing lifecycle, from automation and performance to reporting and management.`,
};

const samplePerson = {
	image: {
		src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/Kevin-Thompson-headshot-1-1.png',
		alt: 'Image Avatar',
	},
	name: 'Person Name',
	position: 'Position / Job title',
	button: {
		buttonStyle: 'TertiaryDefault',
		buttonText: 'View',
		link: 'https://www.google.com#secondary',
	},
};

export const AvatarGrid_SampleData = {
	copy: {
		...information,
	},
	avatars: [{
			...samplePerson,
		},
		{
			...samplePerson,
		},
		{
			...samplePerson,
		},
		{
			...samplePerson,
		},
		{
			...samplePerson,
		},
		{
			...samplePerson,
		},
		{
			...samplePerson,
		},
	],
	background: {
		type: 'solid',
		color: 'light',
	}
};

export const AvatarGrid_LightPattern_SampleData = {
	copy: {
		...information,
	},
	avatars: [{
			...samplePerson,
		},
		{
			...samplePerson,
		},
		{
			...samplePerson,
		},
		{
			...samplePerson,
		},
		{
			...samplePerson,
		},
		{
			...samplePerson,
		},
		{
			...samplePerson,
		},
	],
	background: {
		type: 'pattern',
		color: 'light',
	}
};