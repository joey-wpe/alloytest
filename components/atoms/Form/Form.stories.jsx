import React from 'react';
import Form from './Form';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Atoms/Form',
	component: Form,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Form {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Default
export const DefaultForm = Template.bind({});
DefaultForm.args = {};
