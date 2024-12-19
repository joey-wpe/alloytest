import React from 'react';
import HeaderMegaMenu from './HeaderMegaMenu';
import { HeaderExampleData } from './HeaderMegaMenu.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/HeaderMegaMenu',
	component: HeaderMegaMenu,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <HeaderMegaMenu {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Content With Links
export const DefaultHeader = Template.bind({});
DefaultHeader.args = {
	...HeaderExampleData,
};
