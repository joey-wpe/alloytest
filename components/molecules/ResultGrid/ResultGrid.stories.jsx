import ResultGrid from './ResultGrid';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/ResultGrid',
	component: ResultGrid,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ResultGrid {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

const sampleCard = {
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
export const Datos = Template.bind({});

Datos.args = {
	modules: [
		{
			categories: 'Industry',
			cards: [
				{ ...sampleCard },
				{ ...sampleCard, description: 'Hola mundo' },
				{ ...sampleCard, description: 'Hola a todos' },
				{ ...sampleCard, description: 'Hola canvas' },
				{ ...sampleCard, description: 'pepe' },
				{ ...sampleCard },
			],
		},
		{
			categories: 'Products',
			cards: [
				{ ...sampleCard },
				{ ...sampleCard, description: 'Hola mundo' },
				{ ...sampleCard, description: 'Hola a todos' },
				{ ...sampleCard, description: 'Hola canvas' },
				{ ...sampleCard, description: 'pepe' },
				{ ...sampleCard },
			],
		},
	],

	background: {
		type: 'solid',
		color: 'light',
	},
};
