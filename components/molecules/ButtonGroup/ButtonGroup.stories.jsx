import React from 'react';
import ButtonGroup from './ButtonGroup';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/ButtonGroup',
	component: ButtonGroup,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template = (args) => <ButtonGroup {...args} />;
const Template = (args) => (
	<>
		<div className="light-theme light-theme-test">
			<ButtonGroup {...args} />
		</div>
		<div className="midtone-theme midtone-theme-test">
			<ButtonGroup {...args} />
		</div>
		<div className="dark-theme dark-theme-test">
			<ButtonGroup {...args} />
		</div>
	</>
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: No params set
export const AllUnset = Template.bind({});
AllUnset.args = {};

// Story: One primary button set, no alignment specified
export const OnePrimaryButtonCenterAligned = Template.bind({});
OnePrimaryButtonCenterAligned.args = {
	alignment: 'center',
	buttons: [
		{
			buttonStyle: 'PrimaryDefault',
			buttonText: 'Button',
			link: 'https://www.google.com#primary',
		},
	],
};

// Story: One secondary button, left aligned
export const OneSecondaryButtonLeftAligned = Template.bind({});
OneSecondaryButtonLeftAligned.args = {
	alignment: 'left',
	buttons: [
		{
			buttonStyle: 'PrimaryDefault',
			buttonText: 'Button',
			link: 'https://www.google.com#secondary',
		},
	],
};

// Story: One Primary Text Link with Arrow, left aligned
export const OnePrimaryTextLinkWithArrowLeftAligned = Template.bind({});
OnePrimaryTextLinkWithArrowLeftAligned.args = {
	alignment: 'left',
	buttons: [
		{
			buttonStyle: 'TertiaryDefault',
			buttonText: 'Button',
			link: 'https://www.google.com#secondary',
		},
	],
};
// Story: Two primary buttons set, left aligned
export const TwoPrimaryButtonLeftAligned = Template.bind({});
TwoPrimaryButtonLeftAligned.args = {
	alignment: 'left',
	buttons: [
		{
			buttonStyle: 'PrimaryDefault',
			buttonText: 'Button',
			link: 'https://www.google.com#primary',
		},
		{
			buttonStyle: 'PrimaryDefault',
			buttonText: 'Button',
			link: 'https://www.google.com#secondary',
		},
	],
};

// Story: One primary button, one secondary button, left aligned
export const OnePrimaryOneSecondaryLeftAligned = Template.bind({});
OnePrimaryOneSecondaryLeftAligned.args = {
	alignment: 'left',
	buttons: [
		{
			buttonStyle: 'PrimaryDefault',
			buttonText: 'Button',
			link: 'https://www.google.com#primary',
		},
		{
			buttonStyle: 'SecondaryDefault',
			buttonText: 'Button',
			link: 'https://www.google.com#primary',
		},
	],
};
// Story: Two primary text link with arrow , left aligned
export const TwoPrimaryTextLinkWithArrowLeftAligned = Template.bind({});
TwoPrimaryTextLinkWithArrowLeftAligned.args = {
	alignment: 'left',
	buttons: [
		{
			buttonStyle: 'TertiaryDefault',
			buttonText: 'Button',
			link: 'https://www.google.com#primary',
		},
		{
			buttonStyle: 'TertiaryDefault',
			buttonText: 'Button',
			link: 'https://www.google.com#secondary',
		},
	],
};
// Story: Three buttons set (primary, secondary, textLinkWithArrow), left aligned
export const ThreeButtonsLeftAligned = Template.bind({});
ThreeButtonsLeftAligned.args = {
	alignment: 'left',
	buttons: [
		{
			buttonStyle: 'PrimaryDefault',
			buttonText: 'Button',
			link: 'https://www.google.com#primary',
		},
		{
			buttonStyle: 'SecondaryDefault',
			buttonText: 'Button',
			link: 'https://www.google.com#primary',
		},
		{
			buttonStyle: 'TertiaryDefault',
			buttonText: 'Button',
			link: 'https://www.google.com#primary',
		},
	],
};
