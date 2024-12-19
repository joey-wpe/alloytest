import React from 'react';
import CardGridProducts from './CardGridProducts';
import { OneColumn, Simple, Medium, Full } from './CardGridProducts.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Modules/CardGridProducts',
	component: CardGridProducts,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CardGridProducts {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Story: Content With Links

export const OneCardGrid = Template.bind({});

OneCardGrid.args = {
	...OneColumn,
};

export const SimpleCardGrid = Template.bind({});

SimpleCardGrid.args = {
	...Simple,
};

export const MediumCardGrid = Template.bind({});

MediumCardGrid.args = {
	...Medium,
};

export const FullCardGrid = Template.bind({});

FullCardGrid.args = {
	...Full,
};
