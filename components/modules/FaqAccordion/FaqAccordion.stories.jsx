import React from 'react';
import FaqAccordion from './FaqAccordion';
import { RainbowBackgroundData, BlueBackgroundData, DarkBackgroundData } from './FaqAccordion.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Modules/FaqAccordion',
	component: FaqAccordion,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <FaqAccordion {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: No params set
// export const AllUnset = Template.bind({});
// AllUnset.args = {};

export const RainbowBackground = Template.bind({});
RainbowBackground.args = { ...RainbowBackgroundData };

export const BlueBackground = Template.bind({});
BlueBackground.args = { ...BlueBackgroundData };

export const BlazeBackground = Template.bind({});
BlazeBackground.args = { ...DarkBackgroundData };
