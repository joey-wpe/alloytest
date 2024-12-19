import React from 'react';
import LanguageSelect from './LanguageSelect';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Atoms/LanguageSelect',
	component: LanguageSelect,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <LanguageSelect {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Content With Links
export const UpDropdown = Template.bind({});
UpDropdown.args = {
	languages: [
		{
			name: 'En',
		},
		{
			name: 'De',
		},
		{
			name: 'Fr',
		},
	],
	translatedPages: [
		{
			uri: '/fr/',
			pageId: 1,
			locale: {
				locale: 'fr_FR',
			},
		},
		{
			uri: '/de/',
			pageId: 1,
			locale: {
				locale: 'de_DE',
			},
		},
	],
};
