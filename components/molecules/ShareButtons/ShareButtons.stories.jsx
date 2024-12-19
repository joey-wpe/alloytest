import ShareButtons from './ShareButtons';
import React from 'react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/ShareButtons',
	component: ShareButtons,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ShareButtons {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Small Card
export const SocialMediaLinks = Template.bind({});
SocialMediaLinks.args = {
	socials: [
		{
			link: 'www.twitter.com',
			target: '_blank',
		},
		{
			link: 'www.twitter.com',
			target: '_blank',
		},
		{
			link: 'www.twitter.com',
			target: '_blank',
		},
	],
};
