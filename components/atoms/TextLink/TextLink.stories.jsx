import React from 'react';
import TextLink from './TextLink';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Atoms/TextLink',
	component: TextLink,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <TextLink {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Default
export const DefaultTextLink = Template.bind({});
DefaultTextLink.args = {
	linkText: 'Click me',
	target: '_blank',
	uri: 'https://www.google.com#primary',
};
