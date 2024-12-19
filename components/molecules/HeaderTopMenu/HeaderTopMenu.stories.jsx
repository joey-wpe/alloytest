import React from 'react';
import HeaderTopMenu from './HeaderTopMenu';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/HeaderTopMenu',
	component: HeaderTopMenu,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <HeaderTopMenu {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Content With Links
export const ColumnWithLinks = Template.bind({});
ColumnWithLinks.args = {
	languages: [
		{
			name: 'En',
		},
		{
			name: 'De',
		},
		{
			name: 'Fr',
		},
	],
	menu: [
		{
			linkText: 'Our team',
			target: '_blank',
			uri: 'https://www.google.com#our-team',
		},
		{
			linkText: 'Our partners',
			target: '_blank',
			uri: 'https://www.google.com#our-partners',
		},
		{
			linkText: 'Community projects',
			target: '_blank',
			uri: 'https://www.google.com#community-projects',
		},
		{
			linkText: 'Our equality stance',
			target: '_blank',
			uri: 'https://www.google.com#our-equality-stance',
		},
		{
			linkText: 'Newsroom',
			target: '_blank',
			uri: 'https://www.google.com#newsroom',
		},
	],
};
