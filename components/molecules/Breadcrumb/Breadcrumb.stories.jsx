import React from 'react';
import Breadcrumb from './Breadcrumb';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/Breadcrumb',
	component: Breadcrumb,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Breadcrumb breadcrumb={args} />;

export const LinksBread = Template.bind({});

LinksBread.args = {
	breadcrumbsLinks: [
		{ label: 'Home', url: 'https://develop--nd-tricentis-dev.netlify.app/' },
		{ label: 'Dev', url: 'https://develop--nd-tricentis-dev.netlify.app/' },
		{ label: 'Case Study', url: 'https://develop--nd-tricentis-dev.netlify.app/_dev' },
	],
	breadcrumbBackground: {
		type: 'pattern',
		color: 'light',
	},
};
