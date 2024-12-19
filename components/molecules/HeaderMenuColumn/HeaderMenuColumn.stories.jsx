import React from 'react';
import HeaderMenuColumn from './HeaderMenuColumn';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/HeaderMenuColumn',
	component: HeaderMenuColumn,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <HeaderMenuColumn {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Content With Links
export const HeaderMenuColumnData = Template.bind({});
HeaderMenuColumnData.args = {
	title: 'By Industry',
	menu: [
		{
			linkText: 'Energy & Utilities',
			target: '_blank',
			uri: 'https://www.google.com#our-team',
			color: 'blaze',
			buttonStyle: 'secondary',
			description: 'test',
		},
		{
			linkText: 'Financial Services',
			target: '_blank',
			uri: 'https://www.google.com#our-partners',
			color: 'blaze',
			description: 'test',
		},
		{
			linkText: 'Government',
			target: '_blank',
			uri: 'https://www.google.com#community-projects',
			color: 'blaze',
			description: 'test',
		},
		{
			linkText: 'Healthcare',
			target: '_blank',
			uri: 'https://www.google.com#our-equality-stance',
			color: 'blaze',
			description: 'test',
		},
		{
			linkText: 'Technology',
			target: '_blank',
			uri: 'https://www.google.com#newsroom',
			color: 'blaze',
			description: 'test',
		},
		{
			linkText: 'Telecom',
			target: '_blank',
			uri: 'https://www.google.com#newsroom',
			color: 'blaze',
			description: 'test',
		},
	],
};
