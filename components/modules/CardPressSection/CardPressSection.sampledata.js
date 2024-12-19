const storyCard = {
	date: 'Feb. 21, 2021',
	title: 'How the world’s top financial organizations test',
	subTitle: 'SOURCE: GLOBAL BANKING & FINANCE REVIEW',
	description: 'QA teams at leading financial organizations are caught between the competing forces of innovation pressure, complexity, and regulation.',
	button: {
		buttonStyle: 'TertiaryDefault',
		buttonText: 'Read More',
		link: 'https://www.google.com#secondary',
	},
};

export const PressSampleData = {
	preHeader: 'Featured',
	preheadType: 'default',
	heading: 'Press releases',
	titleType: 'h2',
	button: {
		buttonStyle: 'SecondaryReverse',
		buttonText: 'View all press releases',
		link: 'https://www.google.com#secondary',
	},
	stories: [{
			...storyCard
		},
		{
			...storyCard
		},
		{
			...storyCard
		},
	],
	background: {
		type: 'pattern',
		color: 'light',
	},
}