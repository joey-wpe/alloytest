import BlogSection from './BlogSection';
import { BlogSampleData } from './BlogSection.sampledata';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Template Parts/BlogSection',
	component: BlogSection,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <BlogSection {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const BlogExample = Template.bind({});

BlogExample.args = {
	...BlogSampleData,
};
