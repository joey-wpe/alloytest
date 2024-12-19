import React from 'react';
import ProductLogin from './ProductLogin';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Template Parts/ProductLogin',
	component: ProductLogin,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ProductLogin {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Sample Video test 1
export const ProductLoginDefault = Template.bind({});
ProductLoginDefault.args = {
	prehead: {
		text: 'Product releases',
		Tag: 'default',
	},
	title: {
		text: `Deliver cloud-based applications with confidence`,
		Tag: 'h2',
	},
	description: {
		text: `Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus suscipit tortor eget felis porttitor volutpat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.`,
		Tag: 'p',
	},
	action: {
		alignment: 'left',
		buttons: [
			{
				buttonStyle: 'TertiaryDefault',
				buttonText: 'Explore the platform',
				link: 'https://www.google.com#primary',
			},
		],
	},
};
