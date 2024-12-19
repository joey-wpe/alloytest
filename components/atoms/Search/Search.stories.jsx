import React from 'react';
import Search from './Search';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Atoms/Search',
	component: Search,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Search {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Default
export const DefaultSearch = Template.bind({});
DefaultSearch.args = {};
