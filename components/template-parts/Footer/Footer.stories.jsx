import React from 'react';
import Footer from './Footer';
import { FooterExampleData } from './Footer.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Template Parts/Footer',
	component: Footer,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Footer {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Story: Content With Links
export const DefaultFooter = Template.bind({});
DefaultFooter.args = {
	...FooterExampleData,
};
