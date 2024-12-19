import LocationRegionSection from './LocationRegionSection';
import { LocationsSampleData } from './LocationRegionSection.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Template Parts/LocationRegionSection',
	component: LocationRegionSection,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <LocationRegionSection {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const LocationGridTemplate = Template.bind({});

LocationGridTemplate.args = {
	...LocationsSampleData,
};
