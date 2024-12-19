import React from 'react';
import VideoModule from './Video';
import {
	Videos_SampleData_BlueBackground,
	Videos_SampleData_BlueBackgroundOneVideo,
	Videos_SampleData_RainbowBackground,
	Videos_SampleData_RainbowBackgroundOneVideo,
} from './Video.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Modules/Video',
	component: VideoModule,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <VideoModule {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const RainbowBackground = Template.bind({});
RainbowBackground.args = {
	...Videos_SampleData_RainbowBackground,
};

export const RainbowBackgroundOneVideo = Template.bind({});
RainbowBackgroundOneVideo.args = {
	...Videos_SampleData_RainbowBackgroundOneVideo,
};

export const BlueBackground = Template.bind({});
BlueBackground.args = {
	...Videos_SampleData_BlueBackground,
};

export const BlueBackgroundOneVideo = Template.bind({});
BlueBackgroundOneVideo.args = {
	...Videos_SampleData_BlueBackgroundOneVideo,
};
