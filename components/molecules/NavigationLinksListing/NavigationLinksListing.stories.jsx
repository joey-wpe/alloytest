import NavigationLinksListing from './NavigationLinksListing';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/NavigationLinksListing',
	component: NavigationLinksListing,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <NavigationLinksListing {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

//Story Simple Card
export const BasicNavigation = Template.bind({});
BasicNavigation.args = {
	navigation: [
		{
			url: 'www.google.com',
			textLink: 'Tosca Mobile Engine',
		},
		{
			url: 'www.google.com',
			textLink: 'iOS on Windows',
		},
		{
			url: 'www.google.com',
			textLink: 'React Native support',
		},
		{
			url: 'www.google.com',
			textLink: 'Cycle time reduction',
		},
		{
			url: 'www.google.com',
			textLink: 'Mobile cloud connectivity',
		},
		{
			url: 'www.google.com',
			textLink: 'Emulator and simulator support',
		},
	],
};
