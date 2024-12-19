import React from 'react';
import Tabber from './Tabber';
import { TabberDarkSampleData, TabberLightSampleData } from './Tabber.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Modules/Tabber',
	component: Tabber,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Tabber {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const TabberBlaze = Template.bind({});

TabberBlaze.args = {
	...TabberDarkSampleData,
};

export const TabberLight = Template.bind({});

TabberLight.args = {
	...TabberLightSampleData,
};
