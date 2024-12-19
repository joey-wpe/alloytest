import React from 'react';
import Loader from './Loader';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Atoms/Loader',
	component: Loader,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Loader {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const LoaderItem = Template.bind({});
LoaderItem.args = {};
