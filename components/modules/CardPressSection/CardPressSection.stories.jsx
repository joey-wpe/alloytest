import CardPressSection from './CardPressSection';
import { PressSampleData } from './CardPressSection.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Template Parts/CardPressSection',
	component: CardPressSection,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CardPressSection {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const PressRelasesLight = Template.bind({});

PressRelasesLight.args = {
	...PressSampleData,
};
