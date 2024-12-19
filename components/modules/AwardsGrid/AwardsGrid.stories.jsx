import AwardsGrid from './AwardsGrid';
import { AwardsSampleData } from './AwardsGrid.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Template Parts/AwardsGrid',
	component: AwardsGrid,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <AwardsGrid {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const AwardsFullGrid = Template.bind({});

AwardsFullGrid.args = {
	...AwardsSampleData,
};
