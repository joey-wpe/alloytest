import React from 'react';
import FlagCta from './FlagCta';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Atoms/FlagCta',
	component: FlagCta,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <FlagCta {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Default
export const DefaultFlagCta = Template.bind({});
DefaultFlagCta.args = {
	flagStyle: 'primary',
	title: 'Get a demo or trial',
	href: 'https://www.google.com#flag-cta',
};

// Story: With text
export const FlagCtaWithText = Template.bind({});
FlagCtaWithText.args = {
	flagStyle: 'secondary',
	title: 'Get a demo or trial',
	text: 'Send your testing into overdrive',
	href: 'https://www.google.com#flag-cta',
};
