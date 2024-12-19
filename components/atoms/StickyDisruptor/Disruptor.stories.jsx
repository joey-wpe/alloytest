import React from 'react';
import StickyDisruptor from './StickyDisruptor';
import {
	DisruptorSticky_BlueBackground,
} from './Disruptor.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Atoms/StickyDisruptor',
	component: StickyDisruptor,
};

const Template_StickyDisruptor = (args) => <StickyDisruptor {...args} />;

export const DisruptorSticky = Template_StickyDisruptor.bind({});
DisruptorSticky.args = {
	...DisruptorSticky_BlueBackground,
};
