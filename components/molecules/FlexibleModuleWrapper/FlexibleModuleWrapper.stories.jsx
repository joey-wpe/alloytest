import React from 'react';
import FlexibleModuleWrapper from './FlexibleModuleWrapper';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Narwhal Boilerplate/Molecules/FlexibleModuleWrapper',
	component: FlexibleModuleWrapper,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <FlexibleModuleWrapper {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Story: xsmall size
export const XSmallSizePadding = Template.bind({});
XSmallSizePadding.args = {
	moduleName: 'basic-module',
	verticalSpacing: 'xsmall',
	anchor: 'anchor-tag',
	children: <div>test div to wrap</div>,
};

// Story: small size
export const SmallSizePaddingWithCSSClass1 = Template.bind({});
SmallSizePaddingWithCSSClass1.args = {
	moduleName: 'basic-module',
	verticalSpacing: 'small',
	anchor: 'anchor-tag',
	additionalClasses: 'css-class-1',
	children: <div>test div to wrap</div>,
};

// Story: medium size
export const MediumSizePaddingWithCSSClass2 = Template.bind({});
MediumSizePaddingWithCSSClass2.args = {
	moduleName: 'basic-module',
	verticalSpacing: 'medium',
	anchor: 'anchor-tag',
	additionalClasses: 'css-class-2',
	children: <div>test div to wrap</div>,
};

// Story: large size
export const LargeSizePadding = Template.bind({});
LargeSizePadding.args = {
	moduleName: 'basic-module',
	verticalSpacing: 'large',
	anchor: 'anchor-tag',
	children: <div>test div to wrap</div>,
};

// Story: xlarge size
export const XLargeSizePadding = Template.bind({});
XLargeSizePadding.args = {
	moduleName: 'pink-module',
	verticalSpacing: 'xlarge',
	anchor: 'anchor-tag',
	children: <div>test div to wrap</div>,
};
