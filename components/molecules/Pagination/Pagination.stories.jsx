import Pagination from './Pagination';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/Pagination',
	component: Pagination,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Pagination {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Pagination
export const PaginationSimple = Template.bind({});

PaginationSimple.args = {
	pageLinks: [
		{
			link: '1',
			label: '1',
		},
		{
			link: '2',
			label: '2',
		},

		{
			link: '3',
			label: '3',
		},

		{
			link: '4',
			label: '4',
		},
		{
			link: '5',
			label: '5',
		},
		{
			link: '6',
			label: '6',
		},
		{
			link: '7',
			label: '7',
		},
		{
			link: '8',
			label: '8',
		},
		{
			link: '9',
			label: '9',
		},
		{
			link: '10',
			label: '10',
		},
		{
			link: '11',
			label: '11',
		},
	],
};
