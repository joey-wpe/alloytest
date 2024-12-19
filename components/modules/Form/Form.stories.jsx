import React from 'react';
import Form from './Form';
import { Form_SampleData_BlueBackground, Form_SampleData_LightPattern } from './Form.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Modules/Form',
	component: Form,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Form {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Default

export const bluePatternBackground = Template.bind({});
bluePatternBackground.args = {
	...Form_SampleData_BlueBackground,
};

export const LightPattern = Template.bind({});
LightPattern.args = {
	...Form_SampleData_LightPattern,
};
