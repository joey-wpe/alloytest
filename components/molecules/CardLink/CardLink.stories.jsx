import CardLink from './CardLink';
import React from 'react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/CardLink',
	component: CardLink,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CardLink {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Small Card
export const SmallCard = Template.bind({});
SmallCard.args = {
	title: 'Lorem ipsum dolor sit amet eam quas',
	description:
		'Speed matters, which is why Tricentis prioritizes it. AI-driven, codeless, and fully automated, our continuous testing platform.',
	button: {
		buttonText: 'Explore the platform',
		link: 'https://www.google.com#secondary',
	},
	image: {
		src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/Mask-group-1.png',
		alt: 'Image with mask',
	},
};

export const BigCard = Template.bind({});
BigCard.args = {
	title: 'Lorem ipsum dolor sit amet eam quas',
	description:
		'Speed matters, which is why Tricentis prioritizes it. AI-driven, codeless, and fully automated, our continuous testing platform.',
	button: {
		buttonText: 'Explore the platform',
		link: 'https://www.google.com#secondary',
	},
	image: {
		src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/Background-2.png',
		alt: 'Image with mask',
	},
	type: 'featured',
};
