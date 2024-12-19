import React from 'react';
import FooterCTA from './FooterCTA';
import {
	FooterCTA_SampleData_ImageBackground,
	FooterCTA_SampleData_BlueBackground,
	FooterCTA_SampleData_MidtoneBackground,
	FooterCTA_SampleData_BlueBackgroundWithButton,
	FooterCTA_SampleData_WhiteSolid,
	FooterCTA_SampleData_LightPattern,
} from './FooterCTA.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Template Parts/FooterCTA',
	component: FooterCTA,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <FooterCTA {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Default
export const ImageBackground = Template.bind({});
ImageBackground.args = {
	...FooterCTA_SampleData_ImageBackground,
};

export const blueBackground = Template.bind({});
blueBackground.args = {
	...FooterCTA_SampleData_BlueBackground,
};

export const MidtoneBackground = Template.bind({});
MidtoneBackground.args = {
	...FooterCTA_SampleData_MidtoneBackground,
};

export const BlueBackgroundWithButton = Template.bind({});
BlueBackgroundWithButton.args = {
	...FooterCTA_SampleData_BlueBackgroundWithButton,
};
export const WhiteBackground = Template.bind({});
WhiteBackground.args = {
	...FooterCTA_SampleData_WhiteSolid,
};
export const LightPattern = Template.bind({});
LightPattern.args = {
	...FooterCTA_SampleData_LightPattern,
};
