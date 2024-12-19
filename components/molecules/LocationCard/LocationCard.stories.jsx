import React from 'react';
import LocationCard from './LocationCard';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/LocationCard',
	component: LocationCard,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <LocationCard {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

//Story Simple Card
export const BasicCard = Template.bind({});
BasicCard.args = {
	country: 'Austria',
	city: 'vienna',
	locationName: 'Tricentis GmbH',
	address: 'Address block',
	email: 'email@email.com',
	phone: '+43 1 263 24 09 – 0',
	fax: '+43 1 263 24 09 – 15',
};
