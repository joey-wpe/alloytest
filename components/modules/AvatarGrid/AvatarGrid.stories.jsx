import AvatarGrid from './AvatarGrid';
import { AvatarGrid_SampleData, AvatarGrid_LightPattern_SampleData } from './AvatarGrid.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Template Parts/AvatarGrid',
	component: AvatarGrid,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <AvatarGrid {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const AvatarGridTemplate = Template.bind({});

AvatarGridTemplate.args = {
	...AvatarGrid_SampleData,
};

export const AvatarGridLight = Template.bind({});

AvatarGridLight.args = {
	...AvatarGrid_LightPattern_SampleData,
};
