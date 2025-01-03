import React from 'react';
import ROICalculatorResult from './ROICalculatorResult';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Template Parts/ROICalculatorResult',
	component: ROICalculatorResult,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ROICalculatorResult {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Story: Content With Links
export const ROICalculatorResultFe = Template.bind({});
