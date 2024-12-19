import Heading from './Heading';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/Heading',
	component: Heading,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Heading {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const InformationCopy = Template.bind({});

InformationCopy.args = {
	prehead: 'Preheader',
	title: 'Avatar Module Headline',
	description:
		'We’re the world’s number one continuous testing platform for a reason. Equipped with a unique set of features and capabilities, Tricentis products support the full testing lifecycle, from automation and performance to reporting and management.',
};
