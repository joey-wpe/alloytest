import React from 'react';
import ColumnItems from './ColumnItems';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/ColumnItems',
	component: ColumnItems,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ColumnItems {...args} />;

export const ColumnQuestion = Template.bind({});
ColumnQuestion.args = {
	type: 'list',
	items: [
		{ item: `NeoLoad Package for who ?` },
		{ item: `Code-less test design & maintenance` },
		{ item: `Workspaces` },
		{ item: `SaaS Load Generators (Fair usage) ` },
		{ item: `SSO (SaaS only) ` },
		{ item: `Resource Reservation` },
	],
};

export const ColumnCheck = Template.bind({});
ColumnCheck.args = {
	type: 'check',
	items: [
		{
			item: `<strong>For developers and testers</strong> who want to ensure that their application will perform at scale`,
		},
		{ item: true },
		{ item: false },
		{ item: false },
		{ item: false },
		{ item: `Resource Reservation` },
	],
	buttons: [
		{
			buttonStyle: 'PrimaryDefault',
			buttonText: 'Get started',
			link: 'https://www.google.com#secondary',
		},
		{
			buttonStyle: 'SecondaryReverse',
			buttonText: 'Get started',
			link: 'https://www.google.com#secondary',
		},
	],
};
