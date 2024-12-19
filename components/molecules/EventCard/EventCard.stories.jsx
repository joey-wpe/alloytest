import React from 'react';
import EventCard from './EventCard';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/EventCard',
	component: EventCard,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <EventCard {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Small
export const Small = Template.bind({});
Small.args = {
	prehead: 'Guides & insights',
	title: 'East coasts Oracle Users Conference',
	featuredImage: {
		src: '/img/event-card.jpg',
		alt: 'Featured Image Alt',
	},
	uri: 'https://www.google.com',
};

// Story: Big
export const Big = Template.bind({});
Big.args = {
	prehead: 'Guides & insights',
	title: 'East coasts Oracle Users Conference',
	featuredImage: {
		src: '/img/event-card.jpg',
		alt: 'Featured Image Alt',
	},
	description:
		'Discover how you can achieve end-to-end Business Assurance when implementing and upgrading your SAP projects in our webinar. Discover how you can achieve end-to-end Business Assurance when implementing...',
	type: 'featured',
	uri: 'https://www.google.com',
};
