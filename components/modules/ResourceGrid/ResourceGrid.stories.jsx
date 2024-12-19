import React from 'react';
import ResourceGrid from './ResourceGrid';
import {
	ResourceGrid_SampleData_BasicGridWithWhitePattern,
	ResourceGrid_SampleData_BasicGridWithBluePattern,
	ResourceGrid_SampleData_FeatureGrid,
} from './ResourceGrid.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Modules/ResourceGrid',
	component: ResourceGrid,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ResourceGrid {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Basic
export const BasicGridWithWhitePattern = Template.bind({});
BasicGridWithWhitePattern.args = {
	...ResourceGrid_SampleData_BasicGridWithWhitePattern,
};

// Story: Grid With Blue Pattern
export const BasicGridWithBluePattern = Template.bind({});
BasicGridWithBluePattern.args = {
	...ResourceGrid_SampleData_BasicGridWithBluePattern,
};

// Story: Featured
export const FeaturedGrid = Template.bind({});
FeaturedGrid.args = {
	...ResourceGrid_SampleData_FeatureGrid,
};
