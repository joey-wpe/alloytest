import FeaturedPost from './FeaturedPost';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/FeaturedPost',
	component: FeaturedPost,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <FeaturedPost {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Feature Post section data
export const FeaturedPostInfo = Template.bind({});

FeaturedPostInfo.args = {
	image: {
		src: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/CustomerSuccessExampleImage1.jpg',
		alt: 'Alt image',
	},
	prehead: "What's new",
	title: 'Product release updates',
	excerpt:
		'Accelerate your Salesforce testing times and reduce the risk of updating Visualforce customizations, MuleSoft integrations, and AppExchange extensions.',
	link: {
		href: 'www.google.com',
		text: 'Learn More',
	},
};
