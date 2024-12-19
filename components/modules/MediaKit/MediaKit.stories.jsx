import MediaKit from './MediaKit';
import { MediaKitSampleData } from './MediaKit.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Template Parts/MediaKit',
	component: MediaKit,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <MediaKit {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const MediaKitRelasesLight = Template.bind({});

MediaKitRelasesLight.args = {
	...MediaKitSampleData,
};
