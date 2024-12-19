import ColumnItemMobile from './ColumnItemMobile';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/ColumnItemMobile',
	component: ColumnItemMobile,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ColumnItemMobile {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const Card = Template.bind({});
Card.args = {
	headTable: {
		type: 'list',
		items: [
			{ item: 'NeoLoad Package for who ?' },
			{ item: 'Code-less test design & maintenance' },
			{ item: 'Workspaces' },
			{ item: 'SaaS Load Generators (Fair usage) ' },
			{ item: 'SSO (SaaS only) ' },
			{ item: 'Resource Reservation' },
		],
	},
	currentTable: {
		type: 'check',
		items: [
			{
				item: `<strong>For developers and testers</strong> who want to ensure that their application will perform at scale`,
			},
			{
				item: true,
			},
			{
				item: 'developers',
			},
			{
				item: false,
			},
			{
				item: false,
			},
			{
				item: false,
			},
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
	},
};
