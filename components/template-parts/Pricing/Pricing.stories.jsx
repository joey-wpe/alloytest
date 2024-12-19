import Pricing from './Pricing';
import { Pricing_Sample_Data_Dark, Pricing_Sample_Data_Blue } from './Pricing.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Template Parts/Pricing',
	component: Pricing,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Pricing {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const PricingBlaze = Template.bind({});

PricingBlaze.args = {
	...Pricing_Sample_Data_Dark,
};
export const PricingFullBlue = Template.bind({});
PricingFullBlue.args = {
	...Pricing_Sample_Data_Blue,
};
