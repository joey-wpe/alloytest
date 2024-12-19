import React from 'react';
import FooterActionBar from './FooterActionBar';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/FooterActionBar',
	component: FooterActionBar,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <FooterActionBar {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Default
export const DefaultFooterActionBar = Template.bind({});
DefaultFooterActionBar.args = {
	logo: '/tricentis-logo.svg',
	ctaHref: 'https://www.google.com#flag-cta',
	ctaTitle: 'Get a demo or trial',
	ctaText: 'Send your testing into overdrive',
};
