import React from 'react';
import FlipCards from './FlipCards';
import { FlipCard_RainbowBackgroundData, FlibCard_WhiteBackgroundData } from './FlipCards.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Modules/FlipCards',
	component: FlipCards,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <FlipCards {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const PatternRainbowBackground = Template.bind({});
PatternRainbowBackground.args = {
	...FlipCard_RainbowBackgroundData,
};

export const SolidWhiteBackground = Template.bind({});
SolidWhiteBackground.args = {
	...FlibCard_WhiteBackgroundData,
};
