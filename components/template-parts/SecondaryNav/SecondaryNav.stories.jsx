import React from 'react';
import SecondaryNav from './SecondaryNav';
import { Default_SecondaryNav, NoLogoSecondaryNav } from './SecondaryNav.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Template Parts/SecondaryNavigation',
	component: SecondaryNav,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <SecondaryNav {...args} />;

// Story: SecondaryNav top menu and main menu data
export const DefaultSecondaryNav = Template.bind({});
DefaultSecondaryNav.args = {
	...Default_SecondaryNav,
};

// Story without Logo
export const noLogoSecondaryNav = Template.bind({});
noLogoSecondaryNav.args = {
	...NoLogoSecondaryNav,
};
