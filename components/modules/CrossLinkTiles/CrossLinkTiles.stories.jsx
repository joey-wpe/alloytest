import React from 'react';
import CrossLinkTiles from './CrossLinkTiles';
import { CrossLinkTile_BasicGrid, CrossLinkTile_FeaturedGrid } from './CrossLinkTiles.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Modules/CrossLinkTiles',
	component: CrossLinkTiles,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CrossLinkTiles {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const FeaturedGrid = Template.bind({});
FeaturedGrid.args = {
	...CrossLinkTile_FeaturedGrid,
};

export const BasicGrid = Template.bind({});
BasicGrid.args = {
	...CrossLinkTile_BasicGrid,
};