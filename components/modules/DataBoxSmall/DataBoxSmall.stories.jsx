import React from 'react';
import DataBoxSmall from './DataBoxSmall';
import {
	DataBoxSmall_SampleData_Light,
	DataBoxSmall_SampleData_Dark,
	DataBoxSmall_SampleData_Blue,
	DataBoxSmall_SampleData_ThreeBoxes,
	DataBoxSmall_SampleData_TwoBoxes,
} from './DataBoxSmall.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Modules/DataBoxSmall',
	component: DataBoxSmall,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <DataBoxSmall {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Light
export const Light = Template.bind({});
Light.args = {
	...DataBoxSmall_SampleData_Light,
};
//Story: Blue
export const Blue = Template.bind({});
Blue.args = {
	...DataBoxSmall_SampleData_Blue,
};

// Story: Blaze
export const Blaze = Template.bind({});
Blaze.args = {
	...DataBoxSmall_SampleData_Dark,
};

// Story: Three Boxes
export const ThreeBoxes = Template.bind({});
ThreeBoxes.args = {
	...DataBoxSmall_SampleData_ThreeBoxes,
};

// Story: Two Boxes
export const TwoBoxes = Template.bind({});
TwoBoxes.args = {
	...DataBoxSmall_SampleData_TwoBoxes,
};
