import React from 'react';
import IconGrid from './IconGrid';
import { BasicGrid_SampleData, MediumGrid_SampleData, FullGrid_SampleData } from './IconGrid.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Modules/IconGrid',
	component: IconGrid,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <IconGrid {...args} />;

//Component Story

const storyCard = {
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

const information = {
	prehead: 'Preheader',
	title: 'Icon grid Main Title',
	description:
		'We’re the world’s number one continuous testing platform for a reason. Equipped with a unique set of features and capabilities, Tricentis products support the full testing lifecycle, from automation and performance to reporting and management.',
};
//Card Basic
export const BasicIconGrid = Template.bind({});
BasicIconGrid.args = {
	...BasicGrid_SampleData,
};

//Card Medium
export const MediumIconGrid = Template.bind({});
MediumIconGrid.args = {
	...MediumGrid_SampleData,
};

//Card Full
export const FullIconGrid = Template.bind({});
FullIconGrid.args = {
	...FullGrid_SampleData,
};
