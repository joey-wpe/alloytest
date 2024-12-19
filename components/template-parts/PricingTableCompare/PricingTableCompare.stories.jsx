import PricingTableCompare from './PricingTableCompare';
import { Pricing_Sample_Data_Dark } from './PricingTableCompare.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Template Parts/PricingTableCompare',
	component: PricingTableCompare,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <PricingTableCompare {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const PricingTableCompareBlaze = Template.bind({});

PricingTableCompareBlaze.args = {
	...Pricing_Sample_Data_Dark,
};
