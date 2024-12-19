import CardPress from './CardPress';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/CardPress',
	component: CardPress,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CardPress {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Small Card
export const SimpleCard = Template.bind({});

SimpleCard.args = {
	date: 'Feb. 21, 2021',
	title: 'How the world’s top financial organizations test',
	subTitle: 'SOURCE: GLOBAL BANKING & FINANCE REVIEW',
	description:
		'QA teams at leading financial organizations are caught between the competing forces of innovation pressure, complexity, and regulation.',
	button: {
		buttonStyle: 'TertiaryDefault',
		buttonText: 'Read More',
		link: 'https://www.google.com#secondary',
	},
};
