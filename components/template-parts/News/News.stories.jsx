import News from './News';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Template Parts/News',
	component: News,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <News {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

//story
const article = {
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
export const NewsRelasesLight = Template.bind({});

NewsRelasesLight.args = {
	archive: [
		{
			dateArchive: 2021,
			articles: [
				{ ...article },
				{ ...article },
				{ ...article },
				{ ...article },
				{ ...article },
				{ ...article },
				{ ...article },
				{ ...article },
				{ ...article },
				{ ...article },
				{ ...article, title: 'pepe' },
				{ ...article, title: 'pepe' },
				{ ...article, title: 'pepe' },
			],
		},
		{
			dateArchive: 2022,
			articles: [{ ...article }, { ...article }],
		},
		{
			dateArchive: 2023,
			articles: [{ ...article }, { ...article }, { ...article }, { ...article }, { ...article }],
		},
	],
	background: {
		type: 'solid',
		color: 'light',
	},
};
