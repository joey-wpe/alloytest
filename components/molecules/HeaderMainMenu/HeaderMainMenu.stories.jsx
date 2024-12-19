import React from 'react';
import HeaderMainMenu from './HeaderMainMenu';
import { HeaderMainMenuExampleData } from './HeaderMainMenu.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/HeaderMainMenu',
	component: HeaderMainMenu,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <HeaderMainMenu {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Content With Links
export const HeaderMainMenuData = Template.bind({});
HeaderMainMenuData.args = {
	...HeaderMainMenuExampleData,
	logo: '/tricentis-logo-blue.svg',
};
