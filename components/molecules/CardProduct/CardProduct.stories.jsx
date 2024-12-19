import React from 'react';
import CardProduct from './CardProduct';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/CardProduct',
	component: CardProduct,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CardProduct {...args} />;

export const FullCard = Template.bind({});

FullCard.args = {
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
	type: 'full',
};
