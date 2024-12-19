import React from 'react';
import FlipCard from './FlipCard';
import { FlipCard_SampleData_FlipCardFields } from './FlipCard.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Atoms/FlipCard',
	component: FlipCard,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <FlipCard {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: No params set
// export const AllUnset = Template.bind({});
// AllUnset.args = {};

export const FlipCardFields = Template.bind({});
FlipCardFields.args = {
	...FlipCard_SampleData_FlipCardFields,
};
