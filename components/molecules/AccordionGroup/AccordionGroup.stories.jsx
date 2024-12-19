import React from 'react';
import AccordionGroup from './AccordionGroup';

// WYSWYG data
const data = {
	title:
		'This is a long FAQ title that will expand to two lines. This is a long FAQ title that will expand to two lines. ',
	body: `
		<p>
			<a href="#">Lorem ipsum dolor sit amet,</a> <b>ad esse malorum sanctus nec.</b> <i>Eos et munere interesset definitionem.</i>
		</p>
		<p>Nulla porttitor accumsan tincidunt. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus.</p>
		<ul>
		<li>$214.3B USD in revenue</li>
		<li>2.1M+ customers served daily across Europe</li>
		</ul>
		<ol>
		<li>$214.3B USD in revenue</li>
		<li>2.1M+ customers served daily across Europe</li>
		</ol>
	`,
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/AccordionGroup',
	component: AccordionGroup,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <AccordionGroup {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: No params set
// export const AllUnset = Template.bind({});
// AllUnset.args = {};

export const Accordion = Template.bind({});
Accordion.args = {
	accordionItems: [
		{
			title: data.title,
			body: data.body,
		},
		{
			title: data.title,
			body: data.body,
		},
		{
			title: data.title,
			body: data.body,
		},
		{
			title: data.title,
			body: data.body,
		},
		{
			title: data.title,
			body: data.body,
		},
	],
};
