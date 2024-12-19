import React from 'react';
import LogoSlider from './LogoSlider';

export default {
	title: 'Narwhal Boilerplate/Molecules/LogoSlider',
	component: LogoSlider,
};

const Template = (args) => <LogoSlider {...args} />;

export const LogoSliderfive = Template.bind({});
LogoSliderfive.args = {
	alignment: 'center',
	logosPerRow: 4,
	slides: [
		{
			image_path: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/anz.png',
			alt: 'Logo Image',
			image_width: '150px',
			image_height: '69px',
			url: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/anz.png',
		},
		{
			image_path: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/dell.png',
			alt: 'Logo Image',
			image_width: '150px',
			image_height: '69px',
			url: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/anz.png',
		},
		{
			image_path: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/experian.png',
			alt: 'Logo Image',
			image_width: '150px',
			image_height: '69px',
			url: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/anz.png',
		},
		{
			image_path: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/ihg.png',
			alt: 'Logo Image',
			image_width: '150px',
			image_height: '69px',
			url: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/anz.png',
		},
		{
			image_path: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/mckesson.png',
			alt: 'Logo Image',
			image_width: '150px',
			image_height: '69px',
			url: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/anz.png',
		},
	],
};
