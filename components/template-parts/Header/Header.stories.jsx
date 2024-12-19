import React from 'react';
import Header from './Header';
import { HeaderExampleData } from './Header.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Template Parts/Header',
	component: Header,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Header {...args} />;

// Story: Header top menu and main menu data
export const DefaultHeader = Template.bind({});
DefaultHeader.args = {
	...HeaderExampleData,
};
