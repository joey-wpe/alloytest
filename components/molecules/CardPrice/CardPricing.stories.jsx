import CardPrice from './CardPrice';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/CardPrice',
	component: CardPrice,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CardPrice {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Small Card
export const Card = Template.bind({});

Card.args = {
	prehead: { text: 'Essential', color: 'mist' },
	subHead: 'For developers and testers',
	price: '$20K/year',
	description: `Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Sed porttitor lectus nibh.`,
	itemsTitle: 'Highlights:',
	items: [
		{
			item: 'Code-less test design',
		},
		{
			item: 'Code-less test design',
		},
		{
			item: 'Code-less test design',
		},
	],
	button: {
		buttonStyle: 'PrimaryDefault',
		buttonText: 'Start free trial',
		link: 'https://www.google.com#secondary',
	},
};
