import React from 'react';
import VideoCard from './VideoCard';
import { Video_SampleData_VideoCardFields } from './VideoCard.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Atoms/VideoCard',
	component: VideoCard,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <VideoCard {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: No params set
// export const AllUnset = Template.bind({});
// AllUnset.args = {};

export const VideoCardFields = Template.bind({});
VideoCardFields.args = {
	...Video_SampleData_VideoCardFields,
};
