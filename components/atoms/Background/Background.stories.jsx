import React from 'react';
import Background from './Background';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Atoms/Background',
	component: Background,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
	<Background {...args}>
		{/* force there to be some height, otherwise you wont see it */}
		<p style={{ minHeight: 200 }} />
	</Background>
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: Blaze Pattern
export const BlazePattern = Template.bind({});
BlazePattern.args = {
	color: 'blaze',
	type: 'pattern',
};

// Story: Blue Pattern
export const BluePattern = Template.bind({});
BluePattern.args = {
	color: 'blue',
	type: 'pattern',
};

// Story: Light Pattern
export const LightPattern = Template.bind({});
LightPattern.args = {
	color: 'light',
	type: 'pattern',
};

// Story: Rainbow Pattern
export const RainbowPattern = Template.bind({});
RainbowPattern.args = {
	color: 'rainbow',
	type: 'pattern',
};

// Story: Blaze Solid
export const BlazeSolid = Template.bind({});
BlazeSolid.args = {
	color: 'blaze',
	type: 'solid',
};

// Story: Blue Solid
export const BlueSolid = Template.bind({});
BlueSolid.args = {
	color: 'blue',
	type: 'solid',
};

// Story: Light Solid
export const LightSolid = Template.bind({});
LightSolid.args = {
	color: 'light',
	type: 'solid',
};

// Story: accelerate gradient
export const AccelerateGradient = Template.bind({});
AccelerateGradient.args = {
	color: 'accelerate',
	type: 'gradient',
};

// Story: accelerate gradient
export const WarpGradient = Template.bind({});
WarpGradient.args = {
	color: 'warp',
	type: 'gradient',
};

// Story: custom image - desktop only
export const DesktopOnlyImage = Template.bind({});
DesktopOnlyImage.args = {
	type: 'image',
	desktopBackgroundImage: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/code-background.jpg',
	color: 'blaze',
};

export const DesktopAndMobileImage = Template.bind({});
DesktopAndMobileImage.args = {
	type: 'image',
	desktopBackgroundImage: 'https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/code-background.jpg',
	mobileBackgroundImage: `https://develop-tricentis-backend.pantheonsite.io/media-assets/2022/04/footer-sample-background.png`,
	color: 'blaze',
};
