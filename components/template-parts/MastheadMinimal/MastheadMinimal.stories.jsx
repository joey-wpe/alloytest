import React from 'react';
import MastheadMinimal from './MastheadMinimal';
import {
	TertiaryDarkSampleData,
	TertiaryMidtoneSampleData,
	TertiaryLightSampleData,
} from './MastheadMinimal.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Template Parts/MastheadMinimal',
	component: MastheadMinimal,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <MastheadMinimal {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Tertiary Dark
export const TertiaryDark = Template.bind({});
TertiaryDark.args = { ...TertiaryDarkSampleData };

// Story: Tertiary Midtone
export const TertiaryMidtone = Template.bind({});
TertiaryMidtone.args = { ...TertiaryMidtoneSampleData };

// Story: Tertiary Light
export const TertiaryLight = Template.bind({});
TertiaryLight.args = { ...TertiaryLightSampleData };
