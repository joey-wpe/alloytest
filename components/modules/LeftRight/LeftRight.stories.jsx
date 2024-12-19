import React from 'react';
import LeftRight from './LeftRight';
import { PrimaryImageSampleData, PrimaryVideoSampleData, PrimaryFormSampleData } from './LeftRight.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Modules/LeftRight',
	component: LeftRight,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <LeftRight {...args} />;

// Story: Image
export const PrimaryImage = Template.bind({});
PrimaryImage.args = {
	...PrimaryImageSampleData,
};

// Story: Video
export const PrimaryVideo = Template.bind({});
PrimaryVideo.args = {
	...PrimaryVideoSampleData,
};

// Story: Form
export const PrimaryForm = Template.bind({});
PrimaryForm.args = {
	...PrimaryFormSampleData,
};
