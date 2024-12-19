import React from 'react';
import CaseStudySlider from './CaseStudySlider';
import { CaseStudySlider_SampleData_Basic, CaseStudySlider_SampleData_Carousel } from './CaseStudySlider.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Modules/CaseStudySlider',
	component: CaseStudySlider,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CaseStudySlider {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Basic
export const Basic = Template.bind({});
Basic.args = {
	...CaseStudySlider_SampleData_Basic,
};

// Story: Carousel
export const Carousel = Template.bind({});
Carousel.args = {
	...CaseStudySlider_SampleData_Carousel,
};
