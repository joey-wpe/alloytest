import React from 'react';
import Logo from './Logo';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Atoms/Logo',
	component: Logo,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Logo {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const LogoItem = Template.bind({});
LogoItem.args = {
	image_path: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/anz.png',
	alt: 'Logo Image',
	image_width: '169px',
	image_height: '69px',
	logoURL: '#',
};
