import React from 'react';
import IconCard from './IconCard';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/IconCard',
	component: IconCard,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <IconCard {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

//Story Simple Card
export const BasicCard = Template.bind({});
BasicCard.args = {
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
