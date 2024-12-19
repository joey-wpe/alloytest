import Card from './Card';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/Card',
	component: Card,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Card {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Small Card
export const CardSimple = Template.bind({});

CardSimple.args = {
	logoImage: {
		src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/05/Captura-de-Pantalla-2022-05-25-a-las-12.22.38.png',
		alt: 'Image Logo',
	},
	prehead: 'Energy',
	description: 'How a multinational chemical company achieved 16X more testing at 32% lower costs',
	button: {
		buttonStyle: 'TertiaryDefault',
		buttonText: 'View details',
		link: 'https://www.google.com#secondary',
	},
};
