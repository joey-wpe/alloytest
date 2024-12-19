import React from 'react';
import PlainText from './PlainText';
import {
	PlainText_SolidBlueBackgroundData,
	PlainText_PatternBlueBackgroundData,
	PlainText_SolidWhiteBackgroundData,
	PlainText_PatternDarkBackgroundData,
	PlainText_PatternWhiteBackgroundData,
} from './PlainText.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Modules/PlainText',
	component: PlainText,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <PlainText {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const SolidBlueBackground = Template.bind({});
SolidBlueBackground.args = {
	...PlainText_SolidBlueBackgroundData,
};

export const PatternBlueBackground = Template.bind({});
PatternBlueBackground.args = {
	...PlainText_PatternBlueBackgroundData,
};
export const SolidWhiteBackground = Template.bind({});
SolidWhiteBackground.args = {
	...PlainText_SolidWhiteBackgroundData,
};

export const PatternBlazeBackground = Template.bind({});
PatternBlazeBackground.args = {
	...PlainText_PatternDarkBackgroundData,
};

export const PatternWhiteBackground = Template.bind({});
PatternWhiteBackground.args = {
	...PlainText_PatternWhiteBackgroundData,
};
