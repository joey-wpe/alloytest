import React from 'react';
import CountBox from './CountBox';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Atoms/CountBox',
	component: CountBox,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CountBox {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Number Animation
export const NumberAnimation = Template.bind({});
NumberAnimation.args = {
	number: 1800,
	description: 'Enterprise customers trust Tricentis',
	size: 'small',
};

// Story: Fraction
export const Fraction = Template.bind({});
Fraction.args = {
	number: '7/10',
	description: 'Of the top banks use Tricentis products',
	size: 'small',
};

// Story: Dark Mode
export const DarkMode = Template.bind({});
DarkMode.args = {
	number: 1800,
	description: 'Enterprise customers trust Tricentis',
	size: 'small',
};

// Story: large
export const Large = Template.bind({});
Large.args = {
	number: 90,
	title: 'coverage',
	prehead: 'Improve software quality',
	description:
		'Leveraging artificial intelligence and the efficiencies of the cloud, accelerate software delivery by reducing test cycle times.',
	size: 'large',
	alignment: 'center',
};

// Story: large Dark Mode
export const LargeDarkMode = Template.bind({});
LargeDarkMode.args = {
	number: 90,
	title: 'coverage',
	prehead: 'Improve software quality',
	description:
		'Leveraging artificial intelligence and the efficiencies of the cloud, accelerate software delivery by reducing test cycle times.',
	size: 'large',
	alignment: 'center',
};

// Story: large Left Alignment
export const LargeLeftAlignment = Template.bind({});
LargeLeftAlignment.args = {
	number: 90,
	title: 'coverage',
	prehead: 'Improve software quality',
	description:
		'Leveraging artificial intelligence and the efficiencies of the cloud, accelerate software delivery by reducing test cycle times.',
	size: 'large',
	alignment: 'left',
};
