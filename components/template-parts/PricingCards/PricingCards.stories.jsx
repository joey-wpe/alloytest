import React from 'react';
import PricingCards from './PricingCards';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Template Parts/PricingCards',
	component: PricingCards,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <PricingCards {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Story: No params set
export const AllUnset = Template.bind({});
AllUnset.args = {};

//Story Simple Card
export const PricingCardsInfo = Template.bind({});
PricingCardsInfo.args = {
	cards: [
		{
			title: 'Tricentis qTest',
			subhead: 'Starting at',
			pricing: {
				package: {
					price: '1,000',
					info: '/user, /year, billed annually',
				},
				description:
					'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Sed porttitor lectus nibh.',
			},
			highlights: {
				description:
					'Tricentis qTest is a scalable test management solution that helps businesses unify testing and orchestrate quality at speed, with visibility throughout the software development lifecycle. ',
			},
		},
		{
			title: 'Tricentis qTest',
			subhead: 'Starting at',
			pricing: {
				package: {
					price: '20,000',
					info: 'for Essential Pack, billed annually',
				},
				description:
					'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Sed porttitor lectus nibh.',
			},
			highlights: {
				description:
					'Tricentis qTest is a scalable test management solution that helps businesses unify testing and orchestrate quality at speed, with visibility throughout the software development lifecycle. ',
			},
		},
		{
			title: 'Tricentis qTest',
			subhead: 'Starting at',
			pricing: {
				package: {
					price: '20,000',
					info: 'for Essential Pack, billed annually',
				},
				description:
					'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Sed porttitor lectus nibh.',
			},
			highlights: {
				description:
					'Tricentis qTest is a scalable test management solution that helps businesses unify testing and orchestrate quality at speed, with visibility throughout the software development lifecycle. ',
			},
		},
		{
			title: 'Tricentis Test Automation for ServiceNow',
			subhead: 'Starting at',
			pricing: {
				package: {
					price: '20,000',
					info: 'for Essential Pack, billed annually',
				},
				description:
					'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Sed porttitor lectus nibh.',
			},
			highlights: {
				description:
					'Tricentis qTest is a scalable test management solution that helps businesses unify testing and orchestrate quality at speed, with visibility throughout the software development lifecycle. ',
			},
		},
		{
			title: 'Tricentis qTest',
			subhead: 'Starting at',
			pricing: {
				package: {
					price: '20,000',
					info: 'for Essential Pack, billed annually',
				},
				description:
					'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Sed porttitor lectus nibh.',
			},
			highlights: {
				description:
					'Tricentis qTest is a scalable test management solution that helps businesses unify testing and orchestrate quality at speed, with visibility throughout the software development lifecycle. ',
			},
		},
	],
};
