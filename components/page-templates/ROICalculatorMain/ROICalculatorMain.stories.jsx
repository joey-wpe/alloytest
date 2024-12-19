import React from 'react';
import ROICalculatorMain from './ROICalculatorMain';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Template Parts/ROICalculatorMain',
	component: ROICalculatorMain,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ROICalculatorMain {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Story: Content With Links
export const ROICalculatorMainFe = Template.bind({});
