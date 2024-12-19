import React from 'react';
import Toggle from './Toggle';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Atoms/Toggle',
	component: Toggle,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Toggle {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

const options = [
	{
		value: '#tosca',
		label: 'Tosca',
		default: true,
	},
	{
		value: '#copilot-plus-tosca',
		label: 'Tosca + Copilot',
	},
	{
		value: '#copilot-plus-toscawwww',
		label: 'Tosca + Copilot + Whatever',
	},
];

// Story: Default
export const DefaultToggle = Template.bind({});
DefaultToggle.args = {
	options: options,
	onChange: (o) => {
		console.log(o);
	},
};
// Story: Default
export const ControlledToggle = Template.bind({});
ControlledToggle.args = {
	options: options,
	value: options[2],
	onChange: (o) => {
		console.log(o);
	},
};
