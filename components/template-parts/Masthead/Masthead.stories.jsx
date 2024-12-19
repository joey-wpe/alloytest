import React from 'react';
import Masthead from './Masthead';
import {
	PrimaryLightSampleData,
	PrimaryDarkSampleData,
	PrimaryDarkLogoSampleData,
	PrimaryVideoSampleData,
	PrimaryVideoWithThumbnailSampleData,
} from './Masthead.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Template Parts/Masthead',
	component: Masthead,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Masthead {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Primary Light
export const PrimaryLight = Template.bind({});
PrimaryLight.args = { ...PrimaryLightSampleData };

// Story: Primary Blaze
export const PrimaryBlaze = Template.bind({});
PrimaryBlaze.args = { ...PrimaryDarkSampleData };

// Story: Primary Blaze with logo
export const PrimaryBlazeLogo = Template.bind({});
PrimaryBlazeLogo.args = { ...PrimaryDarkLogoSampleData };

// Story: Primary Video
export const PrimaryVideo = Template.bind({});
PrimaryVideo.args = { ...PrimaryVideoSampleData };

// Story: Primary Video With Thumbnail
export const PrimaryVideoWithThumbnail = Template.bind({});
PrimaryVideoWithThumbnail.args = { ...PrimaryVideoWithThumbnailSampleData };
