import CardMediaKit from './CardMediaKit';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/CardMediaKit',
	component: CardMediaKit,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CardMediaKit {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Small Card
export const SmallCard = Template.bind({});

SmallCard.args = {
	image: {
		src: `https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/05/image-6.png`,
		alt: 'Logo Media',
	},
	downloadBtn: {
		label: 'Tricentis logo black',
		link: 'https://www.google.com',
	},
};
