import React from 'react';
import MarketoForm from './MarketoForm';
import { SimpleFormSampleData } from './MarketoForm.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/MarketoForm',
	component: MarketoForm,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <MarketoForm {...args} />;

export const BasicFormStory = Template.bind({});
BasicFormStory.args = {
	...SimpleFormSampleData,
};
