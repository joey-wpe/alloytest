import React from 'react';
import HeadingTag from './HeadingTag';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Atoms/HeadingTag',
	component: HeadingTag,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <HeadingTag {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const TagItem = Template.bind({});
TagItem.args = {
	Tag: 'h2',
	text: 'Hello word',
};
