import React from 'react';
import PricingCard from './PricingCard';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/PricingCard',
	component: PricingCard,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <PricingCard {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Story: No params set
export const AllUnset = Template.bind({});
AllUnset.args = {};

//Story Simple Card
export const PricingCardFull = Template.bind({});
PricingCardFull.args = {
	title: 'Tricentis qTest',
	subhead: 'Starting at',
	pricing: {
		package: {
			price: '20,000',
			info: 'for Essential Pack, billed annually',
		},
		description: 'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Sed porttitor lectus nibh.',
	},
	highlights: {
		description:
			'Tricentis qTest is a scalable test management solution that helps businesses unify testing and orchestrate quality at speed, with visibility throughout the software development lifecycle. ',
	},
};

//Story Card without pricing
export const PricingCardNoPricing = Template.bind({});
PricingCardNoPricing.args = {
	title: 'Tricentis qTest',
	subhead: 'Starting at',
	highlights: {
		description:
			'Tricentis qTest is a scalable test management solution that helps businesses unify testing and orchestrate quality at speed, with visibility throughout the software development lifecycle. ',
	},
};
