import React from 'react';
import Hamburger from './Hamburger';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Atoms/Hamburger',
	component: Hamburger,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Hamburger {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const HamburgerItem = Template.bind({});
HamburgerItem.args = {};
