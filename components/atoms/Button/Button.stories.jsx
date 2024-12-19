import React from 'react';
import Button from './Button';
import storybookStyles from '../../../.storybook/storybook.scss';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Atoms/Button',
	component: Button,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
	<>
		<div className="light-theme light-theme-test">
			<Button {...args} />
		</div>
		<div className="midtone-theme midtone-theme-test">
			<Button {...args} />
		</div>
		<div className="dark-theme dark-theme-test">
			<Button {...args} />
		</div>
	</>
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: No params set
export const AllUnset = Template.bind({});
AllUnset.args = {};

// Story: Filled Button with Primary styles

export const ButtonPrimary = Template.bind({});
ButtonPrimary.args = {
	buttonStyle: 'PrimaryDefault',
	buttonText: 'Primary Button',
	link: 'https://www.google.com#primary',
};

// Story: Filled Button with Secondary styles

export const ButtonSecondary = Template.bind({});
ButtonSecondary.args = {
	buttonStyle: 'SecondaryDefault',
	buttonText: 'Secondary Button',
	link: 'https://www.google.com#primary',
};

// Story: Button with Tertiary styles

export const ButtonTertiary = Template.bind({});
ButtonTertiary.args = {
	buttonStyle: 'TertiaryDefault',
	buttonText: 'Tertiary Button',
	link: 'https://www.google.com#secondary',
};

// Story: Reverse Button with Primary styles

export const ButtonPrimaryReverse = Template.bind({});
ButtonPrimaryReverse.args = {
	buttonStyle: 'PrimaryReverse',
	buttonText: 'Primary Button',
	link: 'https://www.google.com#primary',
};

// Story: Reverse Button with Secondary styles

export const ButtonSecondaryReverse = Template.bind({});
ButtonSecondaryReverse.args = {
	buttonStyle: 'SecondaryReverse',
	buttonText: 'Secondary Button',
	link: 'https://www.google.com#primary',
};

// Story: Reverse with Tertiary styles

export const ButtonTertiaryReverse = Template.bind({});
ButtonTertiaryReverse.args = {
	buttonStyle: 'TertiaryReverse',
	buttonText: 'Tertiary Button',
	link: 'https://www.google.com#secondary',
};
