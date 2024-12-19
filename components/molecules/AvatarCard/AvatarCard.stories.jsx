import AvatarCard from './AvatarCard';
import React from 'react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/AvatarCard',
	component: AvatarCard,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <AvatarCard {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Small Card
export const SimpleAvatar = Template.bind({});

SimpleAvatar.args = {
	image: {
		src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/Kevin-Thompson-headshot-1-1.png',
		alt: 'Image Avatar',
	},
	name: 'Person Name',
	position: 'Position / Job title',
	button: {
		buttonStyle: 'TertiaryDefault',
		buttonText: 'View',
		link: 'https://www.google.com#secondary',
	},
};
