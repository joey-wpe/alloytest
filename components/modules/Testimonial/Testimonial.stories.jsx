import React from 'react';
import Testimonial from './Testimonial';
import { Testimonial_Basic, Testimonial_Slider } from './Testimonial.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Modules/Testimonial',
	component: Testimonial,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Testimonial {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Dark Pattern
export const Basic = Template.bind({});
Basic.args = {
	...Testimonial_Basic,
};

export const SliderTestimonial = Template.bind({});
SliderTestimonial.args = {
	...Testimonial_Slider,
};