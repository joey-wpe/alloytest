import React from 'react';
import DataBoxLarge from './DataBoxLarge';
import { LightSampleData, BlueSampleData, DarkLeftSampleData, LightNumbersSampleData } from './DataBoxLarge.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Modules/DataBoxLarge',
	component: DataBoxLarge,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <DataBoxLarge {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Light
export const Light = Template.bind({});
Light.args = {
	...LightSampleData,
};

// Story: Blue
export const BlueBackground = Template.bind({});
BlueBackground.args = {
	...BlueSampleData,
};

// Story: Blaze left
export const BlazeLeft = Template.bind({});
BlazeLeft.args = {
	...DarkLeftSampleData,
};

export const LightNumber = Template.bind({});

LightNumber.args = {
	...LightNumbersSampleData,
};
