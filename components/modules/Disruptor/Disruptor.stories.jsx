import React from 'react';
import Disruptor from './Disruptor';
import {
	Disruptor_BlueBackground,
	Disruptor_MidtoneBackground,
	Disruptor_Test
} from './Disruptor.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Modules/Disruptor',
	component: Disruptor,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Disruptor {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Light
export const BlueBackground = Template.bind({});
BlueBackground.args = {
	...Disruptor_BlueBackground,
};

export const MidtoneBackground = Template.bind({});
MidtoneBackground.args = {
	...Disruptor_MidtoneBackground,
};

export const Test = Template.bind({});
Test.args = {
	...Disruptor_Test,
};
