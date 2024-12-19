import NewsListItem from './NewsListItem';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/NewsListItem',
	component: NewsListItem,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <NewsListItem {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const List = Template.bind({});

List.args = {
	date: 'Feb. 21, 2021',
	title: 'How the world’s top financial organizations test',
	button: {
		buttonStyle: 'TertiaryDefault',
		buttonText: 'Read More',
		link: 'https://www.google.com#secondary',
	},
};
