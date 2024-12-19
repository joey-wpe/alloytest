import React from 'react';
import ProductTabber from './ProductTabber';
import { productDarkSampleData, productLightSampleData } from './ProductTabber.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Modules/ProductTabber',
	component: ProductTabber,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ProductTabber {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const ProductTabberBlaze = Template.bind({});

ProductTabberBlaze.args = {
	...productDarkSampleData,
};

export const ProductTabberLight = Template.bind({});

ProductTabberLight.args = {
	...productLightSampleData,
};
