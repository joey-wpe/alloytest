import React from 'react';
import LogoGroup from './LogoGroup';
import {
	PatternBlueBackgroundWithCarouselSampleData,
	PatternBlueBackgroundWithGridSampleData,
	SolidWhiteBackgroundWithCarouselSampleData,
	SolidWhiteBackgroundWithGridSampleData,
} from './LogoGroup.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Modules/LogoGroup',
	component: LogoGroup,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <LogoGroup {...args} />;

export const PatternBlueBackgroundWithCarousel = Template.bind({});
PatternBlueBackgroundWithCarousel.args = {
	...PatternBlueBackgroundWithCarouselSampleData,
};

export const PatternBlueBackgroundWithGrid = Template.bind({});
PatternBlueBackgroundWithGrid.args = {
	...PatternBlueBackgroundWithGridSampleData,
};

export const SolidWhiteBackgroundWithCarousel = Template.bind({});
SolidWhiteBackgroundWithCarousel.args = {
	...SolidWhiteBackgroundWithCarouselSampleData,
};

export const SolidWhiteBackgroundWithGrid = Template.bind({});
SolidWhiteBackgroundWithGrid.args = {
	...SolidWhiteBackgroundWithGridSampleData,
};
