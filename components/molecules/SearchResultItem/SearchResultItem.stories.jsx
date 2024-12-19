import React from 'react';
import SearchResultItem from './SearchResultItem';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/SearchResultItem',
	component: SearchResultItem,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <SearchResultItem {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

//Story Simple Card
export const SearchResultItemData = Template.bind({});
SearchResultItemData.args = {
	contentType: 'Page',
	title: `How Tricentis Tosca's new mobile engine simplifies cross-platform testing and improves test coverage`,
	excerpt:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quam mauris semper nec nec. Dignissim quam phasellus fermentum sapien, massa ut. Non pharetra semper facilisis maecenas leo, et fringilla.',
	link: {
		url: '/url',
		text: 'Read More',
	},
};
