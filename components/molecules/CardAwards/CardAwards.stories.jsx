import CardAwards from './CardAwards';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/CardAwards',
	component: CardAwards,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CardAwards {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Small Card
export const SimpleCard = Template.bind({});

SimpleCard.args = {
	image: {
		src: `https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/05/image-14.png`,
		alt: 'Image Awards',
	},
	date: '2020',
	title: 'Deloitte 2020 Technology Fast 500',
};
