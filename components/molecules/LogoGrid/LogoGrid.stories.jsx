import React from 'react';
import LogoGrid from './LogoGrid';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/LogoGrid',
	component: LogoGrid,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <LogoGrid {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const LogosGrid = Template.bind({});
LogosGrid.args = {
	alignment: 'center',
	logosPerRow: 5,
	Grid: [
		{
			image_path: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/anz.png',
			alt: 'Logo Image',
			image_width: '150px',
			image_height: '69px',
		},
		{
			image_path: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/dell.png',
			alt: 'Logo Image',
			image_width: '150px',
			image_height: '69px',
		},
		{
			image_path: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/experian.png',
			alt: 'Logo Image',
			image_width: '150px',
			image_height: '69px',
		},
		{
			image_path: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/ihg.png',
			alt: 'Logo Image',
			image_width: '150px',
			image_height: '69px',
		},
		{
			image_path: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/mckesson.png',
			alt: 'Logo Image',
			image_width: '150px',
			image_height: '69px',
		},
		{
			image_path: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/anz.png',
			alt: 'Logo Image',
			image_width: '150px',
			image_height: '69px',
		},
		{
			image_path: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/dell.png',
			alt: 'Logo Image',
			image_width: '150px',
			image_height: '69px',
		},
		{
			image_path: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/experian.png',
			alt: 'Logo Image',
			image_width: '150px',
			image_height: '69px',
		},
		{
			image_path: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/ihg.png',
			alt: 'Logo Image',
			image_width: '150px',
			image_height: '69px',
		},
		{
			image_path: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/mckesson.png',
			alt: 'Logo Image',
			image_width: '150px',
			image_height: '69px',
		},
		{
			image_path: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/anz.png',
			alt: 'Logo Image',
			image_width: '150px',
			image_height: '69px',
		},
		{
			image_path: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/dell.png',
			alt: 'Logo Image',
			image_width: '150px',
			image_height: '69px',
		},
	],
};
