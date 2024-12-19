import React from 'react';
import GlobalAlert from './GlobalAlert';
import { AccelerateBackgroundSample, BoltBackgroundSample } from './GlobalAlert.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Template Parts/GlobalAlert',
	component: GlobalAlert,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <GlobalAlert {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Light
export const AccelerateBackground = Template.bind({});
AccelerateBackground.args = {
	...AccelerateBackgroundSample,
};

export const BoltBackground = Template.bind({});
BoltBackground.args = {
	...BoltBackgroundSample,
};
